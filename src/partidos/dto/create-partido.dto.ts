import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreatePartidoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  category_name: string;

  @IsNotEmpty()
  @IsString()
  competence: string;

  @IsNotEmpty()
  @IsString()
  Local_shield: string;

  @IsNotEmpty()
  @IsString()
  visitor_shield: string;

  @IsNotEmpty()
  @IsString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  home_goals: number;

  @IsNotEmpty()
  @IsNumber()
  visitor_goals: number;
}
