import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RequestPatientService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.request_patient.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.request_patient.findMany();
  }

  async findOne(id: number) {
    return this.prisma.request_patient.findUnique({
      where: { id },
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
