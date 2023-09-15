/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
