/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  subCategory: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
