/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  active: boolean;
}
