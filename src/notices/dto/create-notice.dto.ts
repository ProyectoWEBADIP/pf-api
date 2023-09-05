/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsUrl,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateNoticeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  // @IsUrl() activar
  image: string;

  @IsNotEmpty()
  @IsString()
  resume: string;

  @IsNotEmpty()
  @IsNumber()
  categorie_id: number;
  
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

}
