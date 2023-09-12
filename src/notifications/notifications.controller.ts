import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { UpdateNotificationDto } from './dto/update-notifications.dto';
import { CreateNotificationDto } from './dto/create-notifications.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}
  @Get()
  getNotifications(): Promise<Notification[]> {
    return this.notificationsService.getNotifications();
  }

  @Get(':id')
  getNotification(@Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.getNotification(id);
  }

  @Post()
  createNotification(
    @Body() createDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.notificationsService.createNotification(createDto);
  }

  @Delete(':id')
  deleteNotification(@Param('id', ParseIntPipe) id: number) {
    return this.notificationsService.deleteNotification(id);
  }

  @Patch(':id')
  updateNotification(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.updateNotification(id, updateDto);
  }
}
