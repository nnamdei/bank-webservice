import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import * as dotenv from 'dotenv';
import { UserRepository } from 'src/user/data/user.repository';
import { createUserDTO } from 'src/user/dto/user.dto';
import { makeOtp } from 'src/common/helpers/random-number.helper';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/data/user.entity';
import { Wallet } from 'src/user/data/wallet.entity';
import { Status } from 'src/user/enum/status.enum';
import { createTransactionDTO } from 'src/user/dto/pin.dto';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly secretKey = process.env.JWT_SECRET;

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: 86400 });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid login credentials');
    }

    const isMatch: boolean = await argon.verify(user.password, password);

    if (!isMatch) {
      throw new BadRequestException('Invalid login credentials');
    }

    if (!user.emailVerified) {
      throw new BadRequestException('User email not verified yet.');
    }

    if (isMatch) {
      const payload = { userId: user.uid };
      const token = this.generateToken(payload);
      user.lastlogin = new Date();
      await user.save();

      return {
        message: 'User logged in successfully!',
        accessToken: token,
        data: user,
      };
    }
    return null;
  }

  async createUser(user: createUserDTO) {
    const existUser = await this.userRepository.findUser(
      user.email.toLowerCase(),
    );

    if (existUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await argon.hash(user.password, {
      timeCost: parseInt(process.env.HASH_SALT),
    });
    const otp = makeOtp(4);
    const genNumber = `${'00024'}${makeOtp(5)}`;
    const token = uuidv4().replace(/[- ]/g, '');

    const newUser = await this.userRepository.create({
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      emailVerified: false,
      status: Status.PENDING,
      verifyToken: otp,
      uid: token,
      tokenExpiration: new Date(),
    });

    await this.userRepository.createWallet(newUser.id, genNumber, token);

    const data = {
      success: true,
      message: 'User created successfully',
      data: otp,
    };

    return data;
  }

  private async findUserByEmail(email: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async verifyEmail(email: string, emailToken: number) {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Invalid user');
    }

    const dateTime = new Date();
    const difInMillisecond =
      dateTime.getTime() - user.tokenExpiration.getTime();
    const timeDiff = Math.round(difInMillisecond / 1000 / 60);
    if (timeDiff < 5) {
      // if (user.verifyToken !== emailToken.toString()) {
      //   throw new BadRequestException('Incorrect email or OTP...');
      // }

      user.emailVerified = true;
      user.verifyToken = null;
      user.status = Status.ACTIVE;
      user.tokenExpiration = null;
      await user.save();
      const payload = { userId: user.uid };
      const token = this.generateToken(payload);

      return {
        success: true,
        message: 'Email verified successfully!',
        accessToken: token,
      };
    } else {
      user.verifyToken = null;
      await user.save();
      throw new BadRequestException(
        'verification code has expired, try resending!',
      );
    }
  }

  async genVerifyToken(email: string) {
    const user = await this.findUserByEmail(email.toLowerCase());

    if (!user) {
      throw new NotFoundException('Invalid user');
    }

    const otp = makeOtp(4);

    user.emailVerified = false;
    user.verifyToken = otp;
    user.tokenExpiration = new Date();
    await user.save();

    const data = {
      success: true,
      message: 'Verification otp created',
      data: otp,
    };

    return data;
  }

  async createTransactionPin(requestBody: createTransactionDTO, user) {
    const existingUser = await this.getUserDetails(user.userId);

    if (!existingUser) {
      throw new BadRequestException('Invalid token');
    }

    existingUser.transactionPin = await argon.hash(
      requestBody.transactionPin.toString(),
      {
        timeCost: parseInt(process.env.HASH_SALT),
      },
    );
    existingUser.isPinSet = true;
    await existingUser.save();

    return {
      success: true,
      message: 'Transaction PIN updated.',
    };
  }

  private async getUserDetails(userId: string): Promise<User | null> {
    return User.findOne({
      where: { uid: userId },
      include: [
        {
          model: Wallet,
          attributes: ['balance', 'ledgerBalance'],
        },
      ],
    });
  }

  async changePassword(email: string, password: string) {
    const user = await this.findUserByEmail(email);

    user.password = await argon.hash(password, {
      timeCost: parseInt(process.env.HASH_SALT),
    });
    user.emailVerified = true;
    await user.save();
    return { message: 'Password changed successfully.' };
  }

  async sendPinResetOtp(email: string) {
    const token = makeOtp(4);
    const user = await this.findUserByEmail(email);

    user.verifyToken = token;
    user.tokenExpiration = new Date();
    await user.save();
    return { message: 'Pin reset otp sent', data: token };
  }

  async verifyResetPin(email: string, otp: string) {
    const user = await this.userRepository.findOneWithOTP(email, otp);

    if (!user) {
      throw new BadRequestException('Invalid OTP');
    }

    const dateTime = new Date();
    const difInMillisecond =
      dateTime.getTime() - user.tokenExpiration.getTime();
    const timeDiff = Math.round(difInMillisecond / 1000 / 60);
    if (timeDiff < 5) {
      await user.update({
        verifyToken: null,
        tokenExpiration: null,
      });
      return { message: 'OTP verified successfully.' };
    } else {
      await user.update({
        verifyToken: null,
      });
      throw new BadRequestException(
        'verification code has expired, try resending!',
      );
    }
  }
}
