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
    ConfigModule.forRoot()
    ,
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
