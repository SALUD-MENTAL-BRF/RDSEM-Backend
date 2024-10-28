import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProfessionalDto,UpdateProfileProfessionalDto } from "./dto/professional.dto";

@Injectable({})
export class ProfessionalService {

    constructor(
        private readonly prismaService : PrismaService,

    ){};

    async create(data: CreateProfessionalDto, userId: number) {
        const user = await this.prismaService.user.findFirst({
            where: { id: userId },
        });
    
        if (!user) {
            throw new NotFoundException("No se encontró el usuario.");
        }
    
        if (user.roleId === 2) {
            return { msg: "El usuario ya está registrado como un profesional." };
        }
    
        await this.prismaService.user.update({
            where: { id: userId },
            data: { roleId: 2 },
        });
    
        const professionalData = {
            title: data.title,
            firstname: data.firstname,
            lastname: data.lastname,
            specialization: data.specialization,
            tuition: data.tuition,
            birthdate: data.birthdate, // Asegúrate de que sea un objeto Date si es necesario
            user: {
                connect: { id: userId }, // Conectar con el usuario existente
            },
            hospital: {
                connect: { id: data.hospitalId }, // Conectar con el hospital desde el body
            },
        };
    
        const profesional = await this.prismaService.professional.create({
            data: professionalData,
        });
    
        await this.createProfile(profesional.id);
        
        return profesional;
    }
    

    async findOneByUserId(userId:number){
        return await this.prismaService.professional.findFirst({
            where:{
                userId:userId
            }
        })
    }

    async findAll(){
        return await this.prismaService.profileProfessional.findMany({
            include: {
                professional: {
                    include:{
                        user: true
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
                        user: true,
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
}