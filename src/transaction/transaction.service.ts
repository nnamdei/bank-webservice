import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionRepository } from './data/transaction.repository';
import { ListTransactionFilterDto } from './dto/filter-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getTransaction(transactionId: string) {
    if (!transactionId) {
      throw new BadRequestException('Invalid transaction id');
    }
    const trnData = await this.transactionRepository.findOne(transactionId);
    return { success: true, message: 'Transaction fetched', data: trnData };
  }

  async filterTransaction(
    filterDto: ListTransactionFilterDto,
    page: number,
    limit: number,
  ) {
    const trnData = await this.transactionRepository.findAll(
      filterDto,
      page,
      limit,
    );
    return { success: true, message: 'Transaction fetched', data: trnData };
  }
}
