import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class loginUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Transform((params: TransformFnParams) => params.value.trim())
  email: string;

  @IsNotEmpty()
  @Transform((params: TransformFnParams) => params.value.trim())
  password: string;
}
