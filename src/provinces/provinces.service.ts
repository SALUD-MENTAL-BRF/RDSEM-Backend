import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProvinceService    {
    constructor(private readonly prismaService: PrismaService){}

    async findAll(){
        return await this.prismaService.province.findMany()
    };

};