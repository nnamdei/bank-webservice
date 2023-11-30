import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserRepository } from './data/user.repository';

@Module({
  imports: [TransactionModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
