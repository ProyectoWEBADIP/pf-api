/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import './config/mercadopago.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //PARA QUE FUNCIONE EL CLASS VALIDATOR
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // Configuración de encabezados CORS
  app.enableCors({
    origin: 'https://front-deploy-adipweb.onrender.com', // Cambia esto por el origen correcto
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(3001 || parseInt(process.env.PG_PORT));
}
bootstrap();
