import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//rol
import { Rol } from './entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
//notification relations
import { Notification } from '../notifications/entities/notification.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createRol(createDto: CreateRolDto) {
    try {
      const { notification_id, ...rolData } = createDto;

      const notification = await this.notificationRepository.findOne({
        where: { id: notification_id },
      });
      if (!notification) {
        throw new HttpException(
          'Notificacion no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      const newRol = new Rol(
        rolData.title,
        rolData.description,
        rolData.active,
        notification,
      );
      await this.rolRepository.save(newRol);
      return newRol;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    /* const rolFound = await this.rolRepository.findOne({
      where: {
        title: createDto.title,
      },
    });

    if (rolFound) {
      throw new HttpException('Rol ya existe', HttpStatus.CONFLICT);
    }

    const newRol = this.rolRepository.create(createDto);
    return await this.rolRepository.save(newRol); */
  }

  getRoles() {
    return this.rolRepository.find();
  }

  async getRol(id: number) {
    const rolFound = await this.rolRepository.findOne({
      where: { id },
    });
    if (!rolFound) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }
    return rolFound;
  }

  async deleteRol(id: number) {
    const rolFound = await this.rolRepository.findOne({
      where: { id },
    });

    if (!rolFound) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }

    return this.rolRepository.delete({ id });
  }

  async updateRol(id: number, RolDto: UpdateRolDto) {
    const rolFound = await this.rolRepository.findOne({
      where: { id },
      relations: ['notification'],
    });

    if (!rolFound) {
      return new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }
    const { notification_id, ...rolData } = RolDto;

    const notification = await this.notificationRepository.findOne({
      where: { id: notification_id },
    });

    if (!notification) {
      throw new HttpException(
        'notificacion no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    rolFound.title = rolData.title;
    rolFound.description = rolData.description;
    rolFound.active = rolData.active;
    rolFound.notification = notification;

    return this.rolRepository.save(rolFound);
  }
}
