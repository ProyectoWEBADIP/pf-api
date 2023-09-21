import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Rol } from 'src/roles/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Rol])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
