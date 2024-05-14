import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //*carga de datos predefinidos
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  //*es necesario para validar las peticiones de entrada http
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);

  
}

bootstrap().then();

