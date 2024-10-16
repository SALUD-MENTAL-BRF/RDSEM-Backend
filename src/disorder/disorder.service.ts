import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DisorderService {
    constructor(private readonly prismaService: PrismaService){}


    async findAll(){
        return await this.prismaService.disorder.findMany()
    }

};