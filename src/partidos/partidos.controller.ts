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
import { Partido } from './entities/partido.entity';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { PartidosService } from './partidos.service';

@Controller('partidos')
export class PartidosController {
  constructor(private partidosService: PartidosService) {}

  @Get()
  getPartidos(): Promise<Partido[]> {
    return this.partidosService.getPartidos();
  }

  @Get(':id')
  getPartido(@Param('id', ParseIntPipe) id: number) {
    return this.partidosService.getPartido(id);
  }

  @Post()
  createPartido(@Body() createDto: CreatePartidoDto): Promise<Partido> {
    return this.partidosService.createPartido(createDto);
  }

  @Delete(':id')
  deletePartido(@Param('id', ParseIntPipe) id: number) {
    return this.partidosService.deletePartido(id);
  }

  @Patch(':id')
  updatePartido(
    @Param('id', ParseIntPipe) id: number,
    @Body() partidoDto: UpdatePartidoDto,
  ) {
    return this.partidosService.updatePartido(id, partidoDto);
  }
}
