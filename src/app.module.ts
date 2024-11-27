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
import { PatientModule } from './patient/patient.module';
import { ProvinceModule } from './provinces/provinces.module';
import { LocalityModule } from './locality/locality.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { ActivityModule } from './activity/activity.module';
import { DisorderModule } from './disorder/disorder.module';
import { CategoryActivitiesModule } from './category-activities/category.module';
import { SocialHabilityModule } from './social-hability/social.hability.module';
import { LogicalProblemModule } from './logical-problem/logical.problem.module';
import { ZegocloudModule } from './zegocloud/zegocloud.module';
import { RequestVideocallModule } from './request-videocall/request-videocall.module';

@Module({
  imports: [UsersModule, AuthModule, NoteModule, ProfessionalModule, RolesModule, RequestPatientModule, HospitalModule, SpecialityHospitalModule, PatientModule,
    ProvinceModule,LocalityModule, RecommendationModule,ActivityModule, DisorderModule, CategoryActivitiesModule,
    SocialHabilityModule, LogicalProblemModule, ZegocloudModule, RequestVideocallModule
  ],
  controllers: [ServiceHospitalController],
  providers: [PreloadedData, PrismaService, CloudinaryService, ServiceHospitalService],
})
export class AppModule {}
