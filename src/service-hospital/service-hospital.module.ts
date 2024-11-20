import { Module } from '@nestjs/common';
import { ServiceHospitalController } from './service-hospital.controller';
import { ServiceHospitalService } from './service-hospital.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServiceHospitalController],
  providers: [ServiceHospitalService]
})
export class ServiceHospitalModule {}
