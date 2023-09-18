import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//category
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
//rol relations
import { Rol } from '../roles/entities/rol.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
  ) {}

  async createCategory(CreateCategoryDto: CreateCategoryDto) {
    try {
      const { rol_id, ...categoryData } = CreateCategoryDto;

      const rol = await this.rolRepository.findOne({
        where: { id: rol_id },
      });
      if (!rol) {
        throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
      }

      const newCategory = new Category(
        categoryData.liga,
        categoryData.description,
        categoryData.age_start,
        categoryData.age_end,
        categoryData.active,
        rol,
      );
      await this.categoryRepository.save(newCategory);
      return newCategory;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

  async updateCategory(id: number, CategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { id },
      relations: ['rol'],
    });

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    const { rol_id, ...categoryData } = CategoryDto;

    const rol = await this.rolRepository.findOne({
      where: { id: rol_id },
    });

    if (!rol) {
      throw new HttpException('Rol not found', HttpStatus.NOT_FOUND);
    }

    categoryFound.liga = categoryData.liga;
    categoryFound.description = categoryData.description;
    categoryFound.age_start = categoryData.age_start;
    categoryFound.age_end = categoryData.age_end;
    categoryFound.active = categoryData.active;
    categoryFound.rol = rol;

    return this.categoryRepository.save(categoryFound);
  }
}
