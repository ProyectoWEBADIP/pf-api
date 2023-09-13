import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { Partido } from './entities/partido.entity';

@Injectable()
export class PartidosService {
  constructor(
    @InjectRepository(Partido)
    private partidoRepository: Repository<Partido>,
  ) {}

  async createPartido(createDto: CreatePartidoDto) {
    const partidoFound = await this.partidoRepository.findOne({
      where: {
        description: createDto.description,
      },
    });

    if (partidoFound) {
      throw new HttpException(
        'No puede tener la misma descripcion.',
        HttpStatus.CONFLICT,
      );
    }

    const newPartido = this.partidoRepository.create(createDto);
    return await this.partidoRepository.save(newPartido);
  }

  getPartidos() {
    return this.partidoRepository.find();
  }

  async getPartido(id: number) {
    const partidoFound = await this.partidoRepository.findOne({
      where: { id },
    });
    if (!partidoFound) {
      throw new HttpException('Partido no encontrado', HttpStatus.NOT_FOUND);
    }
    return partidoFound;
  }

  async deletePartido(id: number) {
    const partidoFound = await this.partidoRepository.findOne({
      where: { id },
    });

    if (!partidoFound) {
      throw new HttpException('Partido no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.partidoRepository.delete({ id });
  }

  async updatePartido(id: number, UpdateDto: UpdatePartidoDto) {
    const partidoFound = await this.partidoRepository.findOne({
      where: { id },
    });

    if (!partidoFound) {
      return new HttpException('Partido no encontrado', HttpStatus.NOT_FOUND);
    }
    const updatePartido = Object.assign(partidoFound, UpdateDto);
    return this.partidoRepository.save(updatePartido);
  }
}
