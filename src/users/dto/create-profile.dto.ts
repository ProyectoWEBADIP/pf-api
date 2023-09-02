/* eslint-disable prettier/prettier */

import {  IsNotEmpty } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  birthDate: Date;
  @IsNotEmpty()
  image?: string;
  @IsNotEmpty()
  dni: string;
}
