import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class PatientService {

    constructor(private readonly prisma: PrismaService){}


    async getAllPatientByProfessional(profesionalId:number){
        return await this.prisma.patient.findMany({
            include:{
                professional:{
                    where:{
                        id: profesionalId
                    }
                },
                user: true
            }
        });
    };


};