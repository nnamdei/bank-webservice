import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TransactionService } from '../transaction.service';
import { ListTransactionFilterDto } from '../dto/filter-transaction.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':transactionId')
  @ApiBearerAuth()
  async fetchTransaction(@Param('transactionId') transactionId: string) {
    const data = await this.transactionService.getTransaction(transactionId);
    return data;
  }

  @Get()
  @ApiBearerAuth()
  async filterTransaction(
    @Query() listFilterDto: ListTransactionFilterDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const data = await this.transactionService.filterTransaction(
      listFilterDto,
      page,
      limit,
    );
    return data;
  }
}
