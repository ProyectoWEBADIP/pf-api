import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './notice.entity';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Controller('notices')
export class NoticesController {
  constructor(private noticesServices: NoticesService) {}

  @Get()
  getNotices(): Promise<Notice[]> {
    return this.noticesServices.getNotices();
  }

  @Get(':id')
  getNotice(@Param('id', ParseIntPipe) id: number): Promise<Notice[]> {
    return this.noticesServices.getNotice(id);
  }

  @Post()
  createNotice(@Body() newNotice: CreateNoticeDto): Promise<Notice> {
    return this.noticesServices.createNotice(newNotice);
  }

  @Delete(':id')
  deleteNotice(@Param('id', ParseIntPipe) id: number) {
    return this.noticesServices.deletNotice(id);
  }

  @Patch(':id')
  updateNotice(
    @Param('id', ParseIntPipe) id: number,
    @Body() notice: UpdateNoticeDto,
  ) {
    return this.noticesServices.updateNotice(id, notice);
  }
}
