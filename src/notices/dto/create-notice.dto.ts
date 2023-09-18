/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsUrl,
  IsNumber,
  IsArray,
  ArrayMinSize,
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

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
