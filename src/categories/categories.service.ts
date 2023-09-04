import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categorie.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        name: category.name,
      },
    });     


    if (categoryFound) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const newCategory = this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    const categories = await this.categoryRepository.find();
    return categories;
  }

  getCategories() {
    return this.categoryRepository.find();
  }

  async getCategory(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return categoryFound;
  }

  async deleteCategory(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return this.categoryRepository.delete({ id });
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!categoryFound) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    const updateCategory = Object.assign(categoryFound, category);
    return this.categoryRepository.save(updateCategory);
  }
}
