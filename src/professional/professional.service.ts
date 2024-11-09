import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProfessionalDto,UpdateProfileProfessionalDto } from "./dto/professional.dto";

@Injectable({})
export class ProfessionalService {

    constructor(
        private readonly prismaService : PrismaService,

    ){};

    async create(data: CreateProfessionalDto) {

        const newUserData = {
            username: data.username,
            email: data.email,
            password: data.password,
            roleId: data.roleId
        }

        const existingUser = await this.prismaService.user.findUnique({
            where: { email: data.email },
        });
        
        if (existingUser) {
            throw new Error('El email ya está en uso. Por favor, elige otro.');
        }

        const newUser = await this.prismaService.user.create({
            data: newUserData
        })

        const hospital = await this.prismaService.hospital.findFirst({
            where: {
                id: data.hospitalId
            }
        })

        if (!hospital) {
            throw new NotFoundException("No se encontró el hospital con el ID proporcionado.");
        }

        const profesionalData = {
            title: data.title,
            firstname: data.firstname,
            lastname: data.lastname,
            specialization: data.specialization,
            tuition: data.tuition,
            birthdate: data.birthdate,
            user: {
                connect: { id: newUser.id }
            },
            hospital: {
                connect: { id: hospital.id }
            }
        }

        const newProfesional = await this.prismaService.professional.create({
            data: profesionalData
        })
    
        await this.createProfile(newProfesional.id);
        
        return newProfesional;
    }
    

    async findOneByUserId(professionalId:number){
        return await this.prismaService.professional.findUnique({
            where: { id: professionalId},
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        roleId: true,
                        rol: {
                            select: {
                                type: true
                            }
                        },
                        status: true
                    }
                }
            }
        })
    }

    async findAll(){
        return await this.prismaService.profileProfessional.findMany({
            include: {
                professional: {
                    include:{
                        user: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                                roleId: true,
                                rol: {
                                    select: {
                                        type: true
                                    }
                                },
                                status: true
                            }
                        }
                    }
                }

            },
        });
    }


    async createProfile(id: number) {
        return await this.prismaService.profileProfessional.create({
          data: {
            description: '', 
            availability: false, 
            preference_communication: 'Sin preferencias',
            professional: {
              connect: { id: id }
            }
          }
        });
      };
      
      async findOneProfile(profileId: number){
        return await this.prismaService.profileProfessional.findFirst({
            where: {id: profileId},
            include: {
                professional: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                email: true,
                                roleId: true,
                                rol: {
                                    select: {
                                        type: true
                                    }
                                },
                                status: true
                            }
                        },
                        patient: true
                    }
                }
            }
        })
      }

      async updateProfile(professionalId:number,data:UpdateProfileProfessionalDto){        
        return await this.prismaService.profileProfessional.update({
            where:{professionalId: professionalId},
            data: data
        })
      }

    async deleteProfessional(userId: number) {
        await this.prismaService.user.delete({
            where: { id: userId }
        })
    }

    async finAllByHospitalId(hospitalId: number) {
        return await this.prismaService.professional.findMany({
            where: {
                hospitalId: hospitalId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        roleId: true,
                        rol: {
                            select: {
                                type: true
                            }
                        },
                        status: true,
                        patient: {
                            select: {
                                id: true,
                                fullName: true,
                                date_birth: true,
                                genre: true,
                                telephone: true,
                                contactEmergencyName: true,
                                contactEmergencyRelation: true,
                                contactEmergencyTelephone: true,
                                streetNumber: true,
                                neighborhood: true,
                                user: {
                                    select: {
                                        id: true,
                                        username: true,
                                        email: true,
                                        roleId: true,
                                        rol: {
                                            select: {
                                                type: true
                                            }
                                        },
                                        status: true
                                    }
                                }
                            },
                        }
                    }
                }
            }
        })
    }

}