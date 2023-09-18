import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, Notification])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
