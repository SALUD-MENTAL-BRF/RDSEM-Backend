import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalControllers } from './professional.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module'; 

@Module({
  controllers: [ProfessionalControllers],
  providers: [ProfessionalService, PrismaService],
  imports: [UsersModule], 
})
export class ProfessionalModule {}
