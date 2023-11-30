import { Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { Op } from 'sequelize';
import { ListTransactionFilterDto } from '../dto/filter-transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor() {}
  async findOne(transactionRef: string): Promise<Transaction | null> {
    return await Transaction.findOne({
      where: {
        transactionReference: transactionRef,
      },
    });
  }

  async create(TransactionDTO): Promise<Transaction> {
    return Transaction.create(TransactionDTO);
  }

  async findAll(
    filterDto: ListTransactionFilterDto,
    page: number,
    limit: number,
  ) {
    const whereCondition: any = {};

    if (filterDto.startDate && filterDto.endDate) {
      whereCondition.date = {
        [Op.between]: [filterDto.startDate, filterDto.endDate],
      };
    }

    if (filterDto.type) {
      whereCondition.type = filterDto.type;
    }

    if (
      filterDto.minAmount !== undefined &&
      filterDto.maxAmount !== undefined
    ) {
      whereCondition.amount = {
        [Op.between]: [filterDto.minAmount, filterDto.maxAmount],
      };
    }
    const offset = (page - 1) * limit;
    const records = await Transaction.findAndCountAll({
      where: whereCondition,
    });
    const data = await Transaction.findAndCountAll({
      where: whereCondition,
      offset: offset,
      limit: limit,
    });
    const response = {
      limit: limit,
      page: page,
      totalPages: Math.ceil(records.count / limit),
      count: data.count,
      totalCount: records.count,
      data,
    };
    return response;
  }
}
