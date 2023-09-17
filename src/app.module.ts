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
import { PaymentModule } from './payment/payment.module';
import { initializeMercadoPago } from './config/mercadopago.config';
import { GeneralModule } from './general/general.module';
import { LigasModule } from './ligas/ligas.module';
import { CategoryModule } from './category/category.module';
import { PartidosModule } from './partidos/partidos.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal:true,
      }
    )
    ,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.PG_HOST}`,
      username: `${process.env.POSTGRES_USER}`,
      password: `${process.env.PG_PASSWORD}`,
      port: parseInt(process.env.PG_PORT),
      database: `${process.env.PG_DATABASE}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}', Comments],
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    UsersModule,
    AuthModule,
    CommentsModule,
    CategoriesModule,
    NoticesModule,
    RolesModule,
    SponsorsModule,
    PaymentModule,
    GeneralModule,
    LigasModule,
    CategoryModule,
    PartidosModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    initializeMercadoPago();
  }
}
