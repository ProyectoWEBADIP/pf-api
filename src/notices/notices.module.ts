import { Module } from '@nestjs/common';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './notice.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notice, User]), CategoriesModule],
  controllers: [NoticesController],
  providers: [NoticesService],
  exports: [NoticesService],
})
export class NoticesModule {}
