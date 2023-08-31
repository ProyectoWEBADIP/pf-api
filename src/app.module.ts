/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { NoticesModule } from './notices/notices.module';
import { CommentsModule } from './comments/comments.module';
import { CommentsController } from './comments/controllers/comments.controller';
import { CommentsService } from './comments/services/comments.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-wandering-moon-99222123.us-east-2.aws.neon.tech',
      username: 'fl0user',
      password: 'DzqKnH9WjL7h',
      port: 5432,
      database: 'adipdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // Esto indica que no deseas rechazar certificados no autorizados.
      },
    }),
    UsersModule,
    AuthModule,
    CommentsModule,
    NoticesModule,
  ],
  controllers: [AppController, CommentsController],
  providers: [AppService, CommentsService],
})
export class AppModule {}
