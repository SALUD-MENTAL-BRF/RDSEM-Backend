import { Module } from '@nestjs/common';
import { SpecialityHospitalController } from './speciality-hospital.controller';
import { SpecialityHospitalService } from './speciality-hospital.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SpecialityHospitalController],
  providers: [SpecialityHospitalService]
})
export class SpecialityHospitalModule {}
