import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice) private noticeRepository: Repository<Notice>,
  ) {}

  async createNotice(notice: CreateNoticeDto) {
    const notiFoun = await this.noticeRepository.findOne({
      where: { title: notice.title },
    });

    if (notiFoun) {
      throw new HttpException('Notice already exist', HttpStatus.CONFLICT);
    }

    const newNotice = this.noticeRepository.create(notice);
    return this.noticeRepository.save(newNotice);
  }

  getNotices() {
    return this.noticeRepository.find();
  }

  async getNotice(id: number) {
    const noticeFound = await this.noticeRepository.find({
      where: { id },
    });

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
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
    }
    const updateNotice = Object.assign(noticeFound, notice);
    return this.noticeRepository.save(updateNotice);
  }

  async getNoticesByDate(
    startDate: Date,
    endDate: Date,
    order: 'ASC' | 'DESC',
  ): Promise<Notice[]> {
    console.log(startDate);
    console.log(endDate);
    const query = this.noticeRepository
      .createQueryBuilder('notices')
      .where('notices.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .orderBy('notices.date', order);

    return query.getMany();
  }
}
