import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class LocalityService {
    constructor(private readonly prismaService: PrismaService){}

    async findAllByProvinceId(provinceId: number){
        return this.prismaService.locality.findMany({
            where:{
                provinceId:provinceId
            }
        })
    }
};