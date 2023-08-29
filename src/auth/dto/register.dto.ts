/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string;
  @MinLength(8)
  @IsString()
  password: string;
  @IsString()
  @MinLength(5)
  username: string;
}
