import { Module } from '@nestjs/common';
import { PreloadedData } from './prisma/data/preloaded';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PreloadedData, PrismaService],
})
export class AppModule {}
