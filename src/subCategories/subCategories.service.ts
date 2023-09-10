import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}
  async createSubCategory(createDto: CreateSubCategoryDto) {
    const subCategoryFound = await this.subCategoryRepository.findOne({
      where: {
        subCategory: createDto.subCategory,
      },
    });

    if (subCategoryFound) {
      throw new HttpException('La SubCategoría ya existe', HttpStatus.CONFLICT);
    }

    const newSubCategory = this.subCategoryRepository.create(createDto);
    return await this.subCategoryRepository.save(newSubCategory);
  }

  getSubCategories() {
    return this.subCategoryRepository.find();
  }

  async getSubCategory(id: number) {
    const subCategoryFound = await this.subCategoryRepository.findOne({
      where: { id },
    });
    if (!subCategoryFound) {
      throw new HttpException(
        'Subcategoría no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return subCategoryFound;
  }

  async deleteSubCategory(id: number) {
    const subCategoryFound = await this.subCategoryRepository.findOne({
      where: { id },
    });

    if (!subCategoryFound) {
      throw new HttpException(
        'Subcategoría no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.subCategoryRepository.delete({ id });
  }

  async updateSubCategory(id: number, updateDto: UpdateSubCategoryDto) {
    const subCategoryFound = await this.subCategoryRepository.findOne({
      where: { id },
    });

    if (!subCategoryFound) {
      return new HttpException(
        'Subcategoría no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    const updateSubCategory = Object.assign(subCategoryFound, updateDto);
    return this.subCategoryRepository.save(updateSubCategory);
  }
}
