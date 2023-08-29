/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
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
  @UseGuards(AuthGuard)
  userProfile(
    //Recibo las request (como el body por ejemplo)
    @Request()
    req,
  ) {
    return req.user;
  }
}
