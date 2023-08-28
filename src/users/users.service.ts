/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAllUsers() {
    return `This action returns all users`;
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (user) {
      return user;
    } else {
      return new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(id: string, userFields: UpdateUserDto) {
    const userFound = await this.userRepository.findOneById(id);
    if (userFound) {
      await this.userRepository.update(id, userFields);
      return `Tus datos fueron actualizados con éxito.`;
    } else {
      return new HttpException(
        'No se encontró al usuario.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeUser(id: string) {
    return `This action removes a #${id} user`;
  }
}
