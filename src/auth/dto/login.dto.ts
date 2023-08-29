/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @MinLength(8)
  @IsString()
  password: string;

}