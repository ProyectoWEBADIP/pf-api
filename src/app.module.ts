/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { NoticesModule } from './notices/notices.module';
import { RolesModule } from './roles/roles.module';
import { CommentsModule } from './comments/comments.module';
import { Comments } from './comments/entities/comments.entity';
import { SponsorsModule } from './sponsors/sponsors.module';
import { PaymentController } from './payments_mp/PaymentController';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-wandering-moon-99222123.us-east-2.aws.neon.tech',
      username: 'fl0user',
      password: 'DzqKnH9WjL7h',
      port: 5432,
      database: 'adipdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}', Comments],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Esto indica que no deseas rechazar certificados no autorizados.
      },
    }),
    UsersModule,
    AuthModule,
    CommentsModule,
    CategoriesModule,
    NoticesModule,
    RolesModule,
    SponsorsModule,
  ],
  controllers: [AppController, PaymentController],
  providers: [AppService],
})
export class AppModule {}
