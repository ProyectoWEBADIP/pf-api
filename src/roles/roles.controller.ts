import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { Rol } from './entities/rol.entity';
import { UpdateRolDto } from './dto/update-rol.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  getRoles(): Promise<Rol[]> {
    return this.rolesService.getRoles();
  }

  @Get(':id')
  getRol(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.getRol(id);
  }

  @Post()
  createRol(@Body() newRolDto: CreateRolDto): Promise<Rol> {
    return this.rolesService.createRol(newRolDto);
  }

  @Delete(':id')
  deleteRol(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.deleteRol(id);
  }

  @Patch(':id')
  updateRol(
    @Param('id', ParseIntPipe) id: number,
    @Body() rolDto: UpdateRolDto,
  ) {
    return this.rolesService.updateRol(id, rolDto);
  }
}
