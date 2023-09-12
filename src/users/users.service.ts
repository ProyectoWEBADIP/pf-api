/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
//user
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//profile
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
//rol
import { Rol } from '../roles/entities/rol.entity';
import { CreateRolDto } from 'src/roles/dto/create-rol.dto';
//update role and desactive user
import {
  UpdateRoleDesactiveUserDto,
  UserUpdatedRowsDto,
} from 'src/auth/dto/update-role-desactive-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
  ) {}

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
  if(user){
    return user;
  } else {
    return 'Correo electrónico inexistente.'
  }
  }

  async findByEmailWhitPassword(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'role', 'username', 'email', 'password'],
    });
  }

  async findAllUsers() {
    return await this.userRepository.find({
      relations: ['profile', 'rol'],
    }); //AGREGUÉ RELATIONS, SI NO FUNCIONA, SACARLO.
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['profile', 'rol'],
    });
    if (user) {
      return user;
    } else {
      return new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(id: string, userFields: UpdateUserDto) {
    const userFound = await this.userRepository.findOneById(id);
    if (userFields.password) {
      userFields.password = await bcryptjs.hash(userFields.password, 10);
    }
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
  async updateUserFromAdmin(id: string, userFields: UserUpdatedRowsDto) {
    const userFound = await this.userRepository.findOneById(id);
    if (userFound) {
      await this.userRepository.update(id, userFields);
      return `Los datos del usuario fueron actualizados con éxito.`;
    } else {
      return new HttpException(
        'No se encontró al usuario.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async createProfile(id: string, profile: CreateProfileDto) {
    let userFound: User;
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
    userFound.active = true; //Lo pongo en active, quiere decir que ya tiene un perfil.

    return await this.userRepository.save(userFound);
  }

  /* async createRol(id: string, rol: CreateRolDto) {
    let userFound: User;
    try {
      userFound = await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      return new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    const newRol = this.rolRepository.create(rol);
    const savedRol = await this.rolRepository.save(newRol);
    userFound.rol = savedRol;
    userFound.active = true; //Lo pongo en active, quiere decir que ya tiene un perfil.

    return await this.userRepository.save(userFound);
  } */
}
