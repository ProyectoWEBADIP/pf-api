/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateSponsorDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
