/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import {Request} from 'express'
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/roles.enum';
// extiende todo lo que viene por request de express(como el body, los params y eso) y le injecto la propiedad user con las propiedades email y role.
interface RequestWhitUser extends Request {
  user: {email:string, role:string}
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login({ email, password });
  }
  @Post('register')
  registerUser(@Body() { email, password, username }: RegisterDto) {
    return this.authService.registerUser({ email, password, username });
  }
  @Get('profile')
  @Roles(Role.ADMIN) 
  @UseGuards(AuthGuard,RolesGuard)
  userProfile(
    @Req()
    //se hace la interfaz para poder asignarle un tipo al req   
    req:RequestWhitUser,
  ) {
    return this.authService.profile(req.user);
  }
}



