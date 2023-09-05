/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsString, MaxLength, IsUrl } from 'class-validator';

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
}
