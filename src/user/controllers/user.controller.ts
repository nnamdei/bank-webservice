import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { User } from '../data/user.entity';
import { createTransferDTO, fundAccountDTO } from '../dto/transfer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @ApiBearerAuth()
  async getUser(@RequestUser() user: User) {
    return await this.userService.getUserProfile(user);
  }

  @Post('transfer-fund')
  @ApiBearerAuth()
  async transfer(
    @RequestUser() user: User,
    @Body() transferDto: createTransferDTO,
  ) {
    return await this.userService.transferFund(user, transferDto);
  }

  @Post('topup-account')
  @ApiBearerAuth()
  async fundAccount(
    @RequestUser() user: User,
    @Body() topupDto: fundAccountDTO,
  ) {
    return await this.userService.fundWallet(user, topupDto);
  }
}
