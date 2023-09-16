import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  getCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategory(id);
  }

  @Post()
  createCategory(@Body() createDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }

  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateDto);
  }
}
