import { Module } from '@nestjs/common';
import { PreloadedData } from './prisma/data/preloaded';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { ProfessionalModule } from './professional/professional.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';


@Module({
  imports: [UsersModule, AuthModule, NoteModule, ProfessionalModule],
  controllers: [],
  providers: [PreloadedData, PrismaService, CloudinaryService],
})
export class AppModule {}
