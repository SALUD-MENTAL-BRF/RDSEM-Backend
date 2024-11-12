import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class ActivityService {
    constructor (private readonly prismaService : PrismaService){};


    async findAll(){
        return await this.prismaService.activities.findMany({
            include: {
                categoryActivities: true,
                activityXdisorder: true
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
                activity: {
                    include: {
                        categoryActivities: true
                    }
                }
            }
        })
    }
    

    async linked(patientId: number, professionalId: number, activityIds: Array<number>) {
        return await this.prismaService.activityXPatient.createMany({
            data: activityIds.map((activityId) => ({
                patientId: patientId,
                professionalId: professionalId,
                activityId: activityId
            }))
        });
    }
    


    async unlinked(patientXactivityId: number) {
        return await this.prismaService.activityXPatient.delete({
            where: {
                id: patientXactivityId
            }
        })
    }
    
};