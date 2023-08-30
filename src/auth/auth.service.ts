/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const userFound = await this.usersService.findOneByEmail(email);
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
    const payload = { email: userFound.email, role: userFound.role };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      email,
    };
  }
  async registerUser({ email, password, username }: RegisterDto) {
    return await this.usersService.createUser({
      email,
      password: await bcryptjs.hash(password, 10),
      username,
    });
  }
  async profile({email,role}: {email:string, role:string}){
    return await this.usersService.findOneByEmail(email)
  }
}
