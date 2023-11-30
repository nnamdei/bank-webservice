import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Length, Matches } from 'class-validator';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export class createUserDTO {
  @IsNotEmpty({ message: 'First name is required' })
  @Transform((params: TransformFnParams) => params.value.trim())
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @Transform((params: TransformFnParams) => params.value.trim())
  lastName: string;

  @IsNotEmpty({ message: 'Enter a valid email' })
  @IsEmail()
  @Transform((params) => params.value.toLowerCase())
  @Transform((params: TransformFnParams) => params.value.trim())
  email: string;

  @IsNotEmpty()
  @Length(8, 255)
  @Transform((params: TransformFnParams) => params.value.trim())
  @Matches(passwordRegex, {
    message: 'password must be alphanumeric with at least a special character',
  })
  password: string;

  @IsNotEmpty({ message: 'please, kindly provide a valid phone' })
  @Transform((params: TransformFnParams) => params.value.trim())
  @IsPhoneNumber()
  phone: string;
}
