/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/roles.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import {
  UpdateRoleDesactiveUserDto,
  AdminActionDto,
} from './dto/update-role-desactive-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserFromAdminDto } from './dto/create-user-admin.dto';
// extiende todo lo que viene por request de express(como el body, los params y eso) y le injecto la propiedad user con las propiedades email y role.
interface RequestWhitUser extends Request {
  user: { email: string; role: string };
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
  //Auth es un decorador que recopila todos los decoradores y los aplica al mismo tiempo
  @Auth(Role.USER)
  userProfile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }

  @Patch('updateUser/:id')
  updateRUserFromAdmin(
    @Param('id') id: string,
    @Body() action: AdminActionDto,
  ) {
    const data = {
      id,
      action,
    };
    return this.authService.updateRoleOrDesactivateUser(data);
  }
@Post('createUserAdmin')
createUserFromAdmin(@Body() createUserFromAdmin: CreateUserFromAdminDto){
  return this.authService.createUserFromAdmin(createUserFromAdmin);
}

  @Post('register/google')
  registerUserGoogle(@Body() { credential }) {
    return this.authService.registerUserGoogle(credential);
  }
}
