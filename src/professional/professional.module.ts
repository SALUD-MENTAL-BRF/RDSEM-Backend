import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalControllers } from './professional.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module'; 
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [ProfessionalControllers],
  providers: [ProfessionalService, PrismaService],
  imports: [UsersModule, CloudinaryModule],  // Agrega CloudinaryModule aquí
})
export class ProfessionalModule {}
