/* eslint-disable prettier/prettier */
import {IsNotEmpty } from 'class-validator';

export class UpdateSaldoDto {

  @IsNotEmpty()
  saldo: number;

}
