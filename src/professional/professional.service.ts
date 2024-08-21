import { Injectable, Post, Body } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable({})
export class ProfessionalService {

    constructor(private readonly prismaService : PrismaService){};

    async AddProfessional(data:any, id: string){
    
        return this.prismaService.professional.create({data: data})
    };



}