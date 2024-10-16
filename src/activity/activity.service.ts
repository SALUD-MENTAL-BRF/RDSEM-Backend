import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class ActivityService {
    constructor (private readonly prismaService : PrismaService){};


    async findAll(){
        return await this.prismaService.activities.findMany({
            include: {
                categoryActivities: true
            }
        });
    };
    
    async findAllLinkedByPatientId(patientId: number, professionalId: number) {

        return await this.prismaService.activityXPatient.findMany({
            where: {
                patientId: patientId,
                professionalId: professionalId,
            },
            include: {
                activity: true
            }
        })
    }
    

    async linked(patientId: number, activityIds: Array<number>) {
        return await this.prismaService.patient.update({
            where: {
                id: patientId,
            },
            data: {
                activity: {
                    connect: activityIds.map((id) => ({ id })),
                },
            },
        });
    }
    async unlinked(patientId: number, activityId: number) {
        return await this.prismaService.patient.update({
            where: {
                id: patientId,
            },
            data: {
                activity: {
                    disconnect: {
                        id: activityId,
                    },
                },
            },
        });
    }
    
};