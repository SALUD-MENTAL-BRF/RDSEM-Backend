import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class LogicalProblemService {
    constructor(private readonly prismaService: PrismaService){}

    async addSetting (){
        
    }
};
