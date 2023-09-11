/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSponsorDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  location: number;
}
