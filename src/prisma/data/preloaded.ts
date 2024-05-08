import { PrismaService } from "../prisma.service"
import { Injectable, OnModuleInit } from "@nestjs/common"

@Injectable()
export class PreloadedData implements OnModuleInit{
    
    constructor(private prisma : PrismaService){}

    async onModuleInit() {
        await this.addRole()    
    }

    async addRole(){    
        const roles = [
            {"type": "admin"},
            {"type": "professional"},
            {"type": "patient"}
        ]
        

        return await this.prisma.role.createMany({data: roles})
    }
}