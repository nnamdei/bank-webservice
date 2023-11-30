import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './data/transaction.repository';

@Module({
  imports: [],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService, TransactionRepository],
  controllers: [TransactionController],
})
export class TransactionModule {}
