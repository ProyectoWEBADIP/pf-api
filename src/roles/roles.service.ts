import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async createRol(rolDto: CreateRolDto) {
    const rolFound = await this.rolRepository.findOne({
      where: {
        genero: rolDto.genero,
      },
    });

    if (rolFound) {
      throw new HttpException('Rol already exists', HttpStatus.CONFLICT);
    }

    const newRol = this.rolRepository.create(rolDto);
    return await this.rolRepository.save(newRol);
  }

  getRoles() {
    return this.rolRepository.find();
  }

  async getRol(id: number) {
    const rolFound = await this.rolRepository.findOne({
      where: { id },
    });
    if (!rolFound) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }
    return rolFound;
  }

  async deleteRol(id: number) {
    const rolFound = await this.rolRepository.findOne({
      where: { id },
    });

    if (!rolFound) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }

    return this.rolRepository.delete({ id });
  }

  async updateRol(id: number, RolDto: UpdateRolDto) {
    const rolFound = await this.rolRepository.findOne({
      where: { id },
    });

    if (!rolFound) {
      return new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }
    const updateRol = Object.assign(rolFound, RolDto);
    return this.rolRepository.save(updateRol);
  }
}
