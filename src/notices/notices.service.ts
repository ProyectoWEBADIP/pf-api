/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { Repository, ILike, SelectQueryBuilder } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice) private noticeRepository: Repository<Notice>,
    private categoriesService: CategoriesService,
  ) {}

  // async createNotice(notice: CreateNoticeDto) {
  //   const notiFoun = await this.noticeRepository.findOne({
  //     where: { title: notice.title },
  //   });

  //   if (notiFoun) {
  //     throw new HttpException('Notice already exist', HttpStatus.CONFLICT);
  //   }

  //   const newNotice = this.noticeRepository.create(notice);
  //   return this.noticeRepository.save(newNotice);
  // }

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

  async getNoticeById(id: number) {
    const noticeFound = await this.noticeRepository.find({
      where: { id },
      relations: ['categories'],
    });

    if (!noticeFound) {
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
    }
    return noticeFound;
  }
  // async deletNotice(id: number) {
  //   const noticeFound = await this.noticeRepository.find({
  //     where: { id },
  //   });

  //   if (!noticeFound) {
  //     throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
  //   }
  //   return this.noticeRepository.delete({ id });
  // }
  async updateNoticeStatus(id: number, updateNoticeStatusDto: UpdateNoticeDto) {
    const noticeFound = await this.noticeRepository.findOne({ where: { id } });
    if (!noticeFound) {
      throw new HttpException('Notice not found', HttpStatus.NOT_FOUND);
    }

    noticeFound.active = updateNoticeStatusDto.active;

    await this.noticeRepository.save(noticeFound);

    return noticeFound;
  }
  async updateNotice(id: number, notice: UpdateNoticeDto) {
    const noticeFound = await this.noticeRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!noticeFound) {
      throw new HttpException('Noticia no encontrada', HttpStatus.NOT_FOUND);
    }
    const { categoryIds, ...noticeData } = notice;
    const categories =
      await this.categoriesService.getCategoriesByIds(categoryIds);
    if (categories.length === 0) {
      throw new HttpException(
        'One or more categories not found',
        HttpStatus.NOT_FOUND,
      );
    }
    noticeFound.categories = categories;
    noticeFound.title = noticeData.title;
    noticeFound.content = noticeData.content;
    noticeFound.image = noticeData.image;
    noticeFound.resume = noticeData.resume;
    noticeFound.active = noticeData.active;

    if (notice.categoryIds) {
      const categories = await this.categoriesService.getCategoriesByIds(
        notice.categoryIds,
      );
    }

    noticeFound.categories = categories;

    return await this.noticeRepository.save(noticeFound);
  }

  async getNoticesByTitlePartial(titlePartial: string) {
    const notices = await this.noticeRepository.find({
      where: {
        title: ILike(`%${titlePartial}%`),
      },
    });
    if (notices.length) {
      return notices;
    } else {
      throw new HttpException('No hay noticias', HttpStatus.NOT_FOUND);
    }
  }

  async createNotice(createNoticeDto: CreateNoticeDto) {
    try {
      const { categoryIds, ...noticeData } = createNoticeDto;

      const categories =
        await this.categoriesService.getCategoriesByIds(categoryIds);
      if (categories.length !== categoryIds.length) {
        throw new HttpException(
          'One or more categories not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const newNotice = new Notice(
        noticeData.title,
        noticeData.content,
        noticeData.image,
        noticeData.resume,
        categories,
      );

      await this.noticeRepository.save(newNotice);

      return newNotice;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNoticesByCategory(categoryId: number): Promise<Notice[]> {
    try {
      const notices = await this.noticeRepository.find({
        where: {
          categories: {
            id: categoryId,
          },
        },
      });

      return notices;
    } catch (error) {
      throw new HttpException(
        'Error fetching notices by category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
