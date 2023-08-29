/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  //FUNCION REGISTER
  async createUser({ email, password, username }: CreateUserDto) {
    const findUser = await this.userRepository.findOne({
      where: [
        {
          username: username,
        },
        { email: email },
      ],
    });
    if (findUser?.username === username) {
      return new HttpException(
        'El nombre de usuario ya existe.',
        HttpStatus.CONFLICT,
      );
    } else if (findUser?.email === email) {
      return new HttpException('El email ya existe.', HttpStatus.CONFLICT);
    }
    const newUser = await this.userRepository.create({
      email,
      password,
      username,
    });
    return await this.userRepository.save(newUser);
  }
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
  async findAllUsers() {
    return await this.userRepository.find();
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
  async createProfile(id: string, profile: CreateProfileDto) {
    let userFound;
    try {
      userFound = await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      return new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    const newProfile = this.profileRepository.create(profile);

    const savedProfile = await this.profileRepository.save(newProfile);
    userFound.profile = savedProfile;

    return await this.userRepository.save(userFound);
  }
  async removeUser(id: string) {
    return `This action removes a #${id} user`;
  }
}
