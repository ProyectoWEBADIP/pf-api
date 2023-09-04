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
      throw new HttpException('Noticia no encontrada', HttpStatus.NOT_FOUND);
    }
    const updateNotice = Object.assign(noticeFound, notice);
    return this.noticeRepository.save(updateNotice);
  }

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

  async createNotice(createNoticeDto: CreateNoticeDto) {
    try {
      const { categorie_id, ...noticeData } = createNoticeDto;

      // Verifica si la categoría existe
      const categoryExists =
        await this.categoriesService.getCategory(categorie_id);
      if (!categoryExists) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      // Crea la noticia y asigna la categoría
      const newNotice = this.noticeRepository.create({
        ...noticeData,
        categorie: categoryExists, // Asigna la categoría existente
      });

      return this.noticeRepository.save(newNotice);
    } catch (error) {
      throw new HttpException(
        'Error creating notice',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getNoticesByCategory(categoryId: number): Promise<Notice[]> {
    return this.noticeRepository
      .createQueryBuilder('notice')
      .innerJoinAndSelect('notice.categorie', 'category')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
  }
}
