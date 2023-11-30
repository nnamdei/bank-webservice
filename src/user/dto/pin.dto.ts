import { IsNotEmpty, Length } from 'class-validator';

export class createTransactionDTO {
  @IsNotEmpty()
  @Length(4)
  transactionPin: string;
}
