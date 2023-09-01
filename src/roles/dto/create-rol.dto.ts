/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRolDto {
  @IsNotEmpty()
  rol: string;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  active: boolean;
}
