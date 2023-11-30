import { IsEmail, IsNotEmpty } from 'class-validator';

export class verifyEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  token: number;
}

export class emailDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
