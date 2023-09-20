import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePagosDto {
  @IsNotEmpty()
  @IsNumber()
  cuota: number;

  @IsNotEmpty()
  @IsBoolean()
  estado: boolean;

  @IsNotEmpty()
  @IsString()
  comprobante: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
