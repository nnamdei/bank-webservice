import { IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from 'src/user/enum/transaction-type.enum';

export class ListTransactionFilterDto {
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  minAmount?: number;

  @IsOptional()
  maxAmount?: number;
}
