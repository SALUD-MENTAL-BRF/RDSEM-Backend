import { Module } from '@nestjs/common';
import { PreloadedData } from './prisma/data/preloaded';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatBotModule } from './chatbot/chatbot.module';

@Module({
  imports: [UsersModule, AuthModule, ChatBotModule],
  controllers: [],
  providers: [PreloadedData, PrismaService],
})
export class AppModule {}
