import { Module } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule, UsersModule, CloudinaryModule],
  controllers: [HospitalController],
  providers: [HospitalService, PrismaService, UsersService]
})
export class HospitalModule {}
