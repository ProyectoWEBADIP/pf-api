/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  image?: string;
  dni?: string;
}
