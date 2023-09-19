import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Pago } from './entities/pago.entity';
import { PagoService } from './pago.service';
import { CreatePagosDto } from './dto/create-pago.dto';
import { UpdatePagosDto } from './dto/update-pago.dto';

@Controller('pagos')
export class PagoController {
  constructor(private pagoService: PagoService) {}

  @Get()
  getPagos(): Promise<Pago[]> {
    return this.pagoService.getPagos();
  }

  @Get(':id')
  getPago(@Param('id', ParseIntPipe) id: number) {
    return this.pagoService.getPago(id);
  }

  @Post()
  createPago(@Body() createDto: CreatePagosDto): Promise<Pago> {
    return this.pagoService.createPago(createDto);
  }

  @Delete(':id')
  deletePago(@Param('id', ParseIntPipe) id: number) {
    return this.pagoService.deletePago(id);
  }

  @Patch(':id')
  updatePago(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePagosDto,
  ) {
    return this.pagoService.updatePago(id, updateDto);
  }
}
