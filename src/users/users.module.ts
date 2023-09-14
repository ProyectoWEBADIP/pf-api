/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
//entities
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Rol } from '../roles/entities/rol.entity';
import { Notice } from 'src/notices/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Rol, Notice])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
