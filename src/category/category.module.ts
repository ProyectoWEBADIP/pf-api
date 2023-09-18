import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//category
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';
//rol
import { Rol } from 'src/roles/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Rol])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
