import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpecialityHospital } from './dto/createSpecialityHospital';

@Injectable()
export class SpecialityHospitalService {
  constructor(private readonly prismaService: PrismaService){}

  async createSpecialityHospital(specialityHospital: CreateSpecialityHospital){
    return await this.prismaService.specialty.create({data: specialityHospital})
  }

  async getAllSpecialitiesHospital() {
    return await this.prismaService.specialty.findMany()
  }

  async deleteSpecialtyHospital(id: number) {
    try {
      await this.prismaService.specialty.delete({
        where: {id}
      })

      return { success: true }
    } catch(err) {
      return { success: false, error: err.message }
    }
  }

}
