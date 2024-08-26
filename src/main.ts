import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cloudinary from 'cloudinary'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };


  app.enableCors(corsOptions);
  //*carga de datos predefinidos
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  //*es necesario para validar las peticiones de entrada http
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().then();
