import { Module } from '@nestjs/common';
import { PreloadedData } from './prisma/data/preloaded';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { ProfessionalModule } from './professional/professional.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { RequestPatientModule } from './request_patient/request_patient.module';
import { RolesModule } from './roles/roles.module';
import { HospitalModule } from './hospital/hospital.module';
import { SpecialityHospitalModule } from './speciality-hospital/speciality-hospital.module';
import { ServiceHospitalController } from './service-hospital/service-hospital.controller';
import { ServiceHospitalService } from './service-hospital/service-hospital.service';

@Module({
  imports: [UsersModule, AuthModule, NoteModule, ProfessionalModule, RolesModule, RequestPatientModule, HospitalModule, SpecialityHospitalModule],
  controllers: [ServiceHospitalController],
  providers: [PreloadedData, PrismaService, CloudinaryService, ServiceHospitalService],
})
export class AppModule {}
