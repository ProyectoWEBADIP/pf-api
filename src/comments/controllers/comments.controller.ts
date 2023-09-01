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
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private CommentsServices: CommentsService) {}

  @Get()
  getAll() {
    return this.CommentsServices.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.CommentsServices.getOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.CommentsServices.createOne(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.CommentsServices.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.CommentsServices.delete(+id);
  }
}
