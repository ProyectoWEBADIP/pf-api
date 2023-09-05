/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { Between, ILike, Like, Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice) private noticeRepository: Repository<Notice>,
  ) {}

  async getNoticesByTitlePartial(titlePartial: string) {

const notices = await this.noticeRepository.find({
      where: {
        title: ILike(`%${titlePartial}%`),
      },
    });
      if(notices.length){
        return notices;
      } else {
        throw new HttpException('No hay noticias', HttpStatus.NOT_FOUND)
      }
   
  }

  async createNotice(notice: CreateNoticeDto) {
    const notiFound = await this.noticeRepository.findOne({
      where: { title: notice.title },
    });

    if (notiFound) {
      throw new HttpException(
        'El nombre de la noticia ya se encuentra publicado.',
        HttpStatus.CONFLICT,
      );
    }

    const newNotice = this.noticeRepository.create(notice);
    return this.noticeRepository.save(newNotice);
  }
  async getNotices() {
    try {
      const notices = await this.noticeRepository.find({
        order: {
          id: 'DESC',
        },
      });

      return notices;
    } catch (error) {
      throw new HttpException(
        'Error fetching notices',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getNoticesByDateRange(fechaInicio: Date, fechaFin: Date) {
    try {
      const notices = await this.noticeRepository
        .createQueryBuilder('notice')
        .where('DATE(notice.date) BETWEEN :fechaInicio AND :fechaFin', {
          fechaInicio: fechaInicio.toISOString().split('T')[0], // Convierte a formato ISO sin hora
          fechaFin: fechaFin.toISOString().split('T')[0], // Convierte a formato ISO sin hora
        })
        .orderBy('notice.date', 'ASC')
        .getMany();

      return notices;
    } catch (error) {
      throw new HttpException(
        'Error fetching notices by date range',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getNotice(id: number) {
    const noticeFound = await this.noticeRepository.findOneById(id);
    if (!noticeFound) {
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
    }
    return noticeFound;
  }
  async deletNotice(id: number) {
    const noticeFound = await this.noticeRepository.find({
      where: { id },
    });

    if (!noticeFound) {
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
    }
    return this.noticeRepository.delete({ id });
  }
  async updateNotice(id: number, notice: UpdateNoticeDto) {
    const noticeFound = await this.noticeRepository.findOne({ where: { id } });
    if (!noticeFound) {
      throw new HttpException('Noticia no encontrada', HttpStatus.NOT_FOUND);
    }
    const updateNotice = Object.assign(noticeFound, notice);
    return this.noticeRepository.save(updateNotice);
  }
}
