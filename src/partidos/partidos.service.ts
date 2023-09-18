import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//partido
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { Partido } from './entities/partido.entity';
//user relations
import { User } from '../users/entities/user.entity';

@Injectable()
export class PartidosService {
  constructor(
    @InjectRepository(Partido)
    private partidoRepository: Repository<Partido>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createPartido(createDto: CreatePartidoDto) {
    try {
      const { user_id, ...partidoData } = createDto;

      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      const newPartido = new Partido(
        partidoData.title,
        partidoData.category_name,
        partidoData.competence,
        partidoData.Local_shield,
        partidoData.visitor_shield,
        partidoData.date,
        partidoData.location,
        partidoData.description,
        partidoData.home_goals,
        partidoData.visitor_goals,
        user,
      );
      await this.partidoRepository.save(newPartido);
      return newPartido;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    /* const partidoFound = await this.partidoRepository.findOne({
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
    return await this.partidoRepository.save(newPartido); */
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
      relations: ['user'],
    });

    if (!partidoFound) {
      return new HttpException('Partido no encontrado', HttpStatus.NOT_FOUND);
    }
    const { user_id, ...partidoData } = UpdateDto;

    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    partidoFound.title = partidoData.title;
    partidoFound.category_name = partidoData.category_name;
    partidoFound.competence = partidoData.competence;
    partidoFound.Local_shield = partidoData.Local_shield;
    partidoFound.visitor_shield = partidoData.visitor_shield;
    partidoFound.date = partidoData.date;
    partidoFound.location = partidoData.location;
    partidoFound.description = partidoData.description;
    partidoFound.home_goals = partidoData.home_goals;
    partidoFound.visitor_goals = partidoData.visitor_goals;
    partidoFound.user = user;

    return this.partidoRepository.save(partidoFound);
  }
}
