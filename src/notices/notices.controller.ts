/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { Notice } from './notice.entity';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Controller('notices')
export class NoticesController {
  constructor(private noticesServices: NoticesService) {}

  @Get('byDateRange')
  async getNoticesByDateRange(
    @Query('startDate', ParseIntPipe) startDate: number,
    @Query('endDate', ParseIntPipe) endDate: number,
  ) {
    try {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      const notices = await this.noticesServices.getNoticesByDateRange(
        startDateObj,
        endDateObj,
      );
      return { data: notices };
    } catch (error) {
      // Manejar errores aquí
    }
  }

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

  @Get('byDate?')
  getNoticesByDate(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('order') order: 'ASC' | 'DESC',
  ) {
    console.log(startDate);
    console.log(endDate);
    return this.noticesServices.getNoticesByDate(
      new Date(startDate),
      new Date(endDate),
      order,
    );
  }
}
