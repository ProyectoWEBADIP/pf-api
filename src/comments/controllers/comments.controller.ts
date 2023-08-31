/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  @Get()
  getAll() {
    return 'Lista de comentarios';
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return 'Un comentario';
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return id;
  }
}
