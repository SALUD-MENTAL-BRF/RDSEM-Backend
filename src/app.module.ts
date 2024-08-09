import { Module } from '@nestjs/common';
import { PreloadedData } from './prisma/data/preloaded';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { Req_ProfessionalModule } from './request_professional/req_professional.module';

@Module({
  imports: [UsersModule, AuthModule, NoteModule,Req_ProfessionalModule],
  controllers: [],
  providers: [PreloadedData, PrismaService],
})
export class AppModule {}
