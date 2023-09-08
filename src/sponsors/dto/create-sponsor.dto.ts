/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

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
  @Min(0, { message: 'La ubicación debe ser al menos 0' })
  @Max(20, { message: 'La ubicación debe ser máximo 20' })
  location: number;
}
