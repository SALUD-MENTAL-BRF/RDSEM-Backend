import { Module } from '@nestjs/common';
import { RequestPatientService } from './request_patient.service';
import { RequestPatientController } from './request_patient.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RequestPatientController],
  providers: [RequestPatientService, PrismaService],
})
export class RequestPatientModule {}
