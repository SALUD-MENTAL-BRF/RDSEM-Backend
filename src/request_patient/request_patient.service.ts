import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestPatientDto } from './dto/request_patient.dto';

@Injectable()
export class RequestPatientService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, id: number, professionalId:number) {
    return this.prisma.request_patient.create({
      data: {...data, userId: id, professionalId: professionalId} 
    });
  }

  async findAll() {
    return this.prisma.request_patient.findMany();
  }

  async findOne(id: number, professionalId: number) {
    return this.prisma.request_patient.findFirst({
      where: { 
        userId: id,
        professionalId: professionalId
       },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.request_patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.request_patient.delete({
      where: { id },
    });
  }
}
