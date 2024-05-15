import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PreloadedData } from './prisma/data/preloaded';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  await app.listen(3000);

  
}

bootstrap().then();

