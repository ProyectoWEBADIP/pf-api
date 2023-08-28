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

  async findOneById(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateUser(id: number, userFields: UpdateUserDto) {
    // const userFound = await this.userRepository.findOne({ where: { id } });
    // if (userFound) {
    //   await this.userRepository.update({ id }, userFields);
    //   if (userFields.password && !userFields.username) {
    //     return `You've updated your password.`;
    //   } else if (!userFields.password && userFields.username) {
    //     return `You've updated your username.`;
    //   } else {
    //     return `You've updated your username and your password.`;
    //   }
    // } else {
    //   return new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
  }

  async removeUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
