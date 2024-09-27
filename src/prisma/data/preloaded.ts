import { PrismaService } from "../prisma.service"
import { Injectable, OnModuleInit } from "@nestjs/common"
import {categories} from './categories'

@Injectable()
export class PreloadedData implements OnModuleInit{
    
    constructor(private prisma : PrismaService){}

    async onModuleInit() {
        await this.addRole()
        await this.addCategories()    
    }

    async addRole(){    
        const roles = [
            {"type": "admin"},
            {"type": "professional"},
            {"type": "patient"},
            {"type": "guest"}
        ]
          
        const findRoles = await this.prisma.role.findMany()

        if (findRoles.length > 1) return


        return await this.prisma.role.createMany({data: roles})
    }

    async addCategories(){
        const findCategoriesNaurodevelopment = await this.prisma.categoryNaurodevelopment.findMany()

        if(findCategoriesNaurodevelopment.length > 1) return
        
        await this.prisma.categoryNaurodevelopment.createMany({data:categories})
    }
}