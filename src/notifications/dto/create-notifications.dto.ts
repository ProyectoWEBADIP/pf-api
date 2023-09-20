/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  rol_id: number;
}
