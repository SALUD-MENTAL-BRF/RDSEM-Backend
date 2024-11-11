import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createHospital } from './dto/createHospitalDTO';
import { UsersService } from 'src/users/users.service';
import { createMedicine } from './dto/createMedicineDTO';

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

  async findOneByUserId(userId: number) {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        imageUrl: true,
        updatedAt: true,
        createdAt: true,
        status: true,
        roleId: true,
        hospital: {
          select: {
            id: true,
            name: true,
            address: true,
            telephone: true,
            email: true,
            website: true,
            director: true,
            openingHours: true,
            type: true,
            specialties: {
              select: {
                specialty: true
              }
            },
            services: {
              select: {
                service: true
              }
            }
          },
        },
        rol: {
          select: {
            type: true
          }
        }
      },
    });
  }


  async createMedicine(medicine: createMedicine) {
    const medicineData = {
      name: medicine.name,
      description: medicine.description,
      quantity: medicine.quantity,
      hospital: {
        connect: { id: medicine.hospitalId },
      }
    };

    const findHospital = await this.prismaService.hospital.findFirst({
      where: {
        id: medicine.hospitalId,
      },
    })

    if (!findHospital) {
      throw new Error("No se encontró el hospital con el ID proporcionado.");
    }

    const findMedicine = await this.prismaService.medicines.findFirst({
      where: {
        name: medicine.name,
        hospital: {
          id: medicine.hospitalId,
        },
      } as any,
    });
    
    if (findMedicine) {
      throw new Error("El medicamento ya existe en la base de datos.");
    } else {
      const newMedicine = await this.prismaService.medicines.create({
        data: medicineData,
      });
      return newMedicine;
    }
  }

  async findAllMedicinesByHopsitalId(hospitalId: number) {

    const findMedicines = await this.prismaService.medicines.findMany({
      where: {
        hospitalId: hospitalId,
      } as any,
    });

    return findMedicines;

  }

  async findById(id: number) {
    const findMedicine = await this.prismaService.hospital.findUnique({
      where: {
        id: id,
      } as any,
    });

    return findMedicine;
  }

  async deleteMedicine(medicineId: number) {
    await this.prismaService.medicines.delete({
      where: {
        id: medicineId,
      } as any,
    });
  }

  async findMedicineById(medicineId: number) {
    const findMedicine = await this.prismaService.medicines.findUnique({
      where: {
        id: medicineId,
      } as any,
    });

    return findMedicine;
  }

  async findAllMedicines() {
    const findMedicines = await this.prismaService.medicines.findMany();

    return findMedicines;
  }
  
}  
