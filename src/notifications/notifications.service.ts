import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//notification
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notifications.dto';
import { UpdateNotificationDto } from './dto/update-notifications.dto';
//rol relations
import { Rol } from '../roles/entities/rol.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
  ) {}

  async createNotification(createDto: CreateNotificationDto) {
    const notificationFound = await this.notificationRepository.findOne({
      where: {
        title: createDto.title,
      },
    });

    if (notificationFound) {
      throw new HttpException('La notificación ya existe', HttpStatus.CONFLICT);
    }

    const newNotification = this.notificationRepository.create(createDto);
    return await this.notificationRepository.save(newNotification);
  }

  getNotifications() {
    return this.notificationRepository.find();
  }

  async getNotification(id: number) {
    const notificationFound = await this.notificationRepository.findOne({
      where: { id },
    });
    if (!notificationFound) {
      throw new HttpException(
        'Notificación no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return notificationFound;
  }

  async deleteNotification(id: number) {
    const notificationFound = await this.notificationRepository.findOne({
      where: { id },
    });

    if (!notificationFound) {
      throw new HttpException(
        'Notificación no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.notificationRepository.delete({ id });
  }

  async updateNotification(id: number, updateDto: UpdateNotificationDto) {
    const notificationFound = await this.notificationRepository.findOne({
      where: { id },
    });

    if (!notificationFound) {
      return new HttpException(
        'Notificación no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    const updateNotification = Object.assign(notificationFound, updateDto);
    return this.notificationRepository.save(updateNotification);
  }
}
