import { IsNotEmpty, IsNumber, Length, Max, Min } from 'class-validator';

export class createTransferDTO {
  @IsNotEmpty()
  @Length(4)
  transactionPin: string;

  @IsNotEmpty()
  @Min(100)
  @Max(10000)
  amount: number;

  @IsNotEmpty()
  @Length(10)
  accountNumber: string;
}

export class fundAccountDTO {
  @IsNotEmpty()
  @Min(100)
  @Max(10000)
  amount: number;

  @IsNotEmpty()
  @Length(10)
  accountNumber: string;
}
