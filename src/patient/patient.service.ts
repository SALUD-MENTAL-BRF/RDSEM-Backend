import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class PatientService {

    constructor(private readonly prisma: PrismaService){}

    async findOne(patientId: number){
        return await this.prisma.patient.findFirst({
            where:{
                id: patientId
            },
            include:{
                user: true,
                locality: {
                    include: {
                        province: true
                    }
                }
            }
        })
    }

    async findInfo(patientId: number, professionalId: number){
        return await this.prisma.infoPatient.findFirst({
            where: {
                patientId: patientId,
                professionalId: professionalId
            }
        })
    }

    async findOneByUserId(userId: number){
        return await this.prisma.patient.findFirst({
            where: {
                userId: userId
            },
            include:{
                locality: {
                    include:{
                        province: true
                    }
                }
            }
        })
    }

    async getAllPatientByProfessional(profesionalId:number){
        return await this.prisma.professional.findFirst({
            where: {
                id: profesionalId
            },
            include: {
                patient: true,
                user: true
            }
        });
    };


};