import { IsNotEmpty, IsString } from 'class-validator';

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
  date: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  home_goals: string;

  @IsString()
  visitor_goals: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
