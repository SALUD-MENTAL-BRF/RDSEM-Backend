import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createHospital } from './dto/createHospitalDTO';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class HospitalService {
  constructor(private readonly prismaService: PrismaService, private readonly userService: UsersService) {}

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
        type: hospital.type,
        userId: hospital.userId,
      };
      
      const user = await this.userService.findOne(data.userId);
  
      if (user.rol.type!== 'Hospital') {
        throw new Error('El usuario no tiene el rol de Hospital');
      }


      if (Array.isArray(hospital.specialties) && hospital.specialties.length > 0) {
        data.specialties = {
          create: hospital.specialties.map(specialtyId => ({
            specialty: {
              connect: { id: specialtyId },
            },
          })),
        };
      }

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

  async deleteHospital(id: number) {
    try {
      await this.prismaService.hospital.delete({
        where: { id },
      });
      return { success: true }
    } catch (error) {
      throw new Error(`Error al eliminar el hospital: ${error.message}`);
    }
  }
}
