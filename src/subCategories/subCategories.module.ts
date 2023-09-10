import { Module } from '@nestjs/common';
import { SubCategoriesController } from './subCategories.controller';
import { SubCategoriesService } from './subCategories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory])],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
})
export class SubCategoriesModule {}
