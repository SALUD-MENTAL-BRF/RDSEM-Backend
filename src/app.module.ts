import { Module } from '@nestjs/common';
import { PreloadedData } from './prisma/data/preloaded';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { ProfessionalModule } from './professional/professional.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [UsersModule, AuthModule, NoteModule, ProfessionalModule,CloudinaryModule],
  controllers: [],
  providers: [PreloadedData, PrismaService],
})
export class AppModule {}
