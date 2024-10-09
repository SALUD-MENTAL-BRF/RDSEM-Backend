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
        })
    };

    async linked(patientId: number, data: Array<number>){
        
    }

};