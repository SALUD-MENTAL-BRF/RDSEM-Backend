import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalControllers } from './professional.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [ProfessionalControllers],
  providers: [ProfessionalService, PrismaService]
})
export class ProfessionalModule {}