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
          
        const findRoles = await this.prisma.role.findMany()

        if (findRoles.length > 1) return


        return await this.prisma.role.createMany({data: roles})
    }
}