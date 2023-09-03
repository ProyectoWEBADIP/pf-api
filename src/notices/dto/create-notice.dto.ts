/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class CreateNoticeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  content: string;

  @IsNotEmpty()
  // @IsUrl() activar
  image: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(125)
  resume: string;

  @IsNotEmpty()
  @IsNumber()
  categorie_id: number;
}
