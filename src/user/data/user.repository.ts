import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Op } from 'sequelize';
import { Wallet } from './wallet.entity';

@Injectable()
export class UserRepository {
  constructor() {}
  async findUser(email: string): Promise<User | null> {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneByPhone(phone: string): Promise<User | null> {
    return await User.findOne({
      where: {
        phone: phone,
      },
    });
  }

  async findOneWithOTP(email: string, otp: string): Promise<User | null> {
    return await User.findOne({
      where: {
        email: email,
        verifyToken: otp,
      },
    });
  }

  async findByEmailOrPhone(email: string, phone: string): Promise<User | null> {
    return await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone: phone }],
      },
    });
  }

  async findOnePhoneWithOTP(phone: string, otp: string): Promise<User | null> {
    return await User.findOne({
      where: {
        phone: phone,
        verifyToken: otp,
      },
    });
  }

  async findByPk(userId: string): Promise<User | null> {
    return User.findByPk(userId);
  }

  async findById(uid: string): Promise<User | null> {
    return User.findOne({
      where: {
        uid: uid,
      },
    });
  }

  async create(userDTO): Promise<User> {
    return User.create(userDTO);
  }

  // async createWallet(createWalletDTO): Promise<Wallet> {
  //   return Wallet.create(createWalletDTO);
  // };

  async createWallet(
    userId: number,
    accountNumber: string,
    uid: string,
  ): Promise<Wallet> {
    return Wallet.create({ userId, accountNumber, uid });
  }

  async findWalletByNumber(accountNumber: string): Promise<Wallet | null> {
    return Wallet.findOne({
      where: {
        accountNumber: accountNumber,
      },
    });
  }

  async findWalletByUser(userId: string): Promise<Wallet | null> {
    return Wallet.findOne({
      where: {
        uid: userId,
      },
    });
  }

  async update(
    email: string,
    updatedUser: Partial<User>,
  ): Promise<[number, User[]]> {
    return await User.update(updatedUser, {
      where: { email },
      returning: true,
    });
  }
}
