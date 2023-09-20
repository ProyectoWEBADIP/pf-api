/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateRoleDesactiveUserDto } from './dto/update-role-desactive-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const userFound = await this.usersService.findByEmailWhitPassword(email);
    if (!userFound) {
      throw new HttpException(
        'Usuario o contraseña invalidos.',
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }
    const validPassword = await bcryptjs.compare(password, userFound.password);
    if (!validPassword) {
      throw new HttpException(
        'Usuario o contraseña invalidos.',
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }
    const payload = {
      id: userFound.id,
      email: userFound.email,
      role: userFound.role,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      email,
      id: userFound.id,
    };
  }

  async registerUser({ email, password, username }: RegisterDto) {
    const userFound = await this.usersService.findOneByEmail(email);
    if (typeof userFound ==='string') {
      const registeredUser = await this.usersService.createUser({
        email,
        password: await bcryptjs.hash(password, 10),
        username,
      });
      return {
        message: 'Usuario registrado con éxito.',
        registered: true
      };
    } else {
      throw new HttpException('Correo electrónico ya existente.', HttpStatus.BAD_REQUEST)
    }
  }

  async registerUserGoogle(credential: string) {
    //TODO ESTO PARA DECODIFICAR EL JWT
    const base64Payload: string = credential.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const updatedJwtPayload = JSON.parse(payloadBuffer.toString());
    //TODO ESTO PARA DECODIFICAR EL JWT
    const email: string = updatedJwtPayload.email;

    const userFound = await this.usersService.findOneByEmail(email);
    const password: string = email;

    if (typeof userFound === 'string') {
      const username: string = updatedJwtPayload.name;
      await this.registerUser({ email, username, password });
      const access_token = await this.login({ email, password });
      const { id } = access_token;
      const response = {
        message: 'Te has registrado exitosamente con Google.',
        access_token,
        id,
      };

      return response;
    } else {
      const access_token = await this.login({ email, password });
      const { id } = access_token;
      const response = {
        message: 'Iniciando sesión con tu cuenta de Google...',
        access_token,
        id,
      };

      return response;

    }
  }
  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
    
  }
  async createUserFromAdmin({email,username}:{email:string;username:string}){
    const userFound = await this.usersService.findOneByEmail(email);
    if (!userFound) {
      const registeredUser = await this.usersService.createUser({
        email,
        password: await bcryptjs.hash(email, 10),
        username,
      });
      return 'Usuario registrado con éxito.(ADMIN)';
    } else {
      return 'Correo electrónico ya existente.(ADMIN)';
    }

  }
  
  async updateRoleOrDesactivateUser({
    id,
    action,
  }: UpdateRoleDesactiveUserDto) {
    const userFound = await this.usersService.findOneById(id);
    if (userFound) {
      return await this.usersService.updateUserFromAdmin(id, action.userFields);
    } else {
      return new HttpException(
        'No se encontró al usuario.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
