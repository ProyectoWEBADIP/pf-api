import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { SubCategory } from './entities/subCategory.entity';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { SubCategoriesService } from './subCategories.service';

@Controller('subCategories')
export class SubCategoriesController {
  constructor(private subCategoriesService: SubCategoriesService) {}

  @Get()
  getSubCategories(): Promise<SubCategory[]> {
    return this.subCategoriesService.getSubCategories();
  }

  @Get(':id')
  getSubCategory(@Param('id', ParseIntPipe) id: number) {
    return this.subCategoriesService.getSubCategory(id);
  }

  @Post()
  createSubCategory(
    @Body() newSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.subCategoriesService.createSubCategory(newSubCategoryDto);
  }

  @Delete(':id')
  deleteSubCategory(@Param('id', ParseIntPipe) id: number) {
    return this.subCategoriesService.deleteSubCategory(id);
  }

  @Patch(':id')
  updateSubCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() SubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoriesService.updateSubCategory(id, SubCategoryDto);
  }
}
