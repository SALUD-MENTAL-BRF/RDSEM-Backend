import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createHospital } from './dto/createHospitalDTO';

@Injectable()
export class HospitalService {
  constructor(private readonly prismaService: PrismaService) {}

  async createHospitalService(hospital: createHospital) {
    try {
      const data: any = {
        name: hospital.name,
        address: hospital.address,
        telephone: hospital.telephone,
        email: hospital.email,
        website: hospital.website,
        director: hospital.director,
        openingHours: hospital.openingHours,
        type: hospital.type
      };

      // Si specialties existe y es un array no vacío, agrega las relaciones
      if (Array.isArray(hospital.specialties) && hospital.specialties.length > 0) {
        data.specialties = {
          create: hospital.specialties.map(specialtyId => ({
            specialty: {
              connect: { id: specialtyId },
            },
          })),
        };
      }

      // Si services existe y es un array no vacío, agrega las relaciones
      if (Array.isArray(hospital.services) && hospital.services.length > 0) {
        data.services = {
          create: hospital.services.map(serviceId => ({
            service: {
              connect: { id: serviceId },
            },
          })),
        };
      }

      const newHospital = await this.prismaService.hospital.create({
        data,
        include: {
          specialties: true,
          services: true,
        },
      });

      return newHospital;
    } catch (error) {
      throw new Error(`Error al crear el hospital: ${error.message}`);
    }
  }

  async getAllHospitals(){
    return await this.prismaService.hospital.findMany({
      include: {
        specialties: {
          include: {
            specialty: {
              select: {
                name: true
              }
            }
          }
        },
        services: {
          include: {
            service: {
              select: {
                name:true
              }
            }
          }
        }
      }
    });
  }
}
