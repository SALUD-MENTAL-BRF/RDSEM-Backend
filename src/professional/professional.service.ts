import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProfessionalDto,UpdateProfileProfessionalDto } from "./dto/professional.dto";

@Injectable({})
export class ProfessionalService {

    constructor(
        private readonly prismaService : PrismaService,

    ){};

    async create(data:CreateProfessionalDto, id: string){
        
        const userId = Number(id)

        const user = await this.prismaService.user.findFirst({where: {
            id: userId
        }})

        if(!user){
            throw new NotFoundException("No se encontro el usuario.")
        }

        if(user.roleId == 2) {
            return {msg: "El usuario ya esta registrado como un profesional."}
        }
        
        await this.prismaService.user.update({
            where: {id: userId},
            data: {
                roleId: 2
            }
        })


        const profesional = await this.prismaService.professional.create({data: {...data, userId: userId}})

        await this.createProfile(profesional.id)
        
        return profesional

        
    };

    async findOneByUserId(id:number){
        return await this.prismaService.professional.findFirst({
            where:{
                userId:id
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
      
      async findOneProfile(id: number){
        return await this.prismaService.profileProfessional.findFirst({
            where: {id: id},
            include: {
                professional: {
                    include: {
                        user: true
                    }
                }
            }
        })
      }

      async updateProfile(id:number,data:UpdateProfileProfessionalDto){        
        return await this.prismaService.profileProfessional.update({
            where:{professionalId: id},
            data: data
        })
      }
}