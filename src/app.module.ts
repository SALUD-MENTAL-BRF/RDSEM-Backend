import { Module } from '@nestjs/common';
import { PreloadedData } from './prisma/data/preloaded';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [PreloadedData, PrismaService],
})
export class AppModule {}
