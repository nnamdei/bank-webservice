import { Body, Controller, Post, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from '../services/auth.service';
import { createUserDTO } from 'src/user/dto/user.dto';
import { loginUserDTO } from 'src/user/dto/login.dto';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { User } from 'src/user/data/user.entity';
import { createTransactionDTO } from 'src/user/dto/pin.dto';
import { emailDTO, verifyEmailDTO } from '../dto/verify-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async createUser(@Body() userData: createUserDTO) {
    const data = await this.authService.createUser(userData);
    return data;
  }

  @Public()
  @Post('login')
  async login(@Body() requestBody: loginUserDTO) {
    return await this.authService.login(
      requestBody.email,
      requestBody.password,
    );
  }

  @Public()
  @Put('verify-email')
  async updateEmail(@Body() requestBody: verifyEmailDTO) {
    return await this.authService.verifyEmail(
      requestBody.email,
      requestBody.token,
    );
  }

  @Public()
  @Post('resend-otp')
  async resendOtp(@Body() requestBody: emailDTO) {
    return await this.authService.genVerifyToken(requestBody.email);
  }

  @Post('create-transaction-pin')
  @ApiBearerAuth()
  async createTransactionPin(
    @Body() requestBody: createTransactionDTO,
    @RequestUser() user: User,
  ) {
    return await this.authService.createTransactionPin(requestBody, user);
  }
}
