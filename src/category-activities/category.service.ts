import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class CategoryActivitiesService {
    constructor(private readonly prismaService:PrismaService){};


    async findByDisorder(disorderId: number){
        return await this.prismaService.disorderXCategory.findMany({
            where: {
                disorderId: disorderId
            },
            include: {
                category:true
            }
        })
    };

}