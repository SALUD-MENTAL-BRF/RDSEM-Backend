import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createServiceHospital } from './dto/createServiceHospital';

@Injectable()
export class ServiceHospitalService {
  constructor(private readonly prismaService: PrismaService) {}

  async createServiceHospital(serviceHospital: createServiceHospital){
    return this.prismaService.service.create({data: serviceHospital});
  }

  async getAllServiceHospitals() {
    return this.prismaService.service.findMany();
  }

  async deleteServiceHospital(id: number) {
    try{
      await this.prismaService.service.delete({
        where: { id },
      })
      
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

}