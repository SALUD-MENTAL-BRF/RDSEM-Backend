import { PrismaService } from "../prisma.service"
import { Injectable, OnModuleInit } from "@nestjs/common"
import {categories} from './categories'
import { naurodevelopmentActivities } from "./activities"

@Injectable()
export class PreloadedData implements OnModuleInit{
    
    constructor(private prisma : PrismaService){}

    async onModuleInit() {
        await this.addRole()
        await this.addCategories()
        await this.addActivities()   
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


        await this.prisma.role.createMany({data: roles})
    }

    async addCategories(){
        const findCategoriesNaurodevelopment = await this.prisma.categoryNaurodevelopment.findMany()

        if(findCategoriesNaurodevelopment.length > 1) return
        
        await this.prisma.categoryNaurodevelopment.createMany({data:categories})
    }

    async addActivities(){
        const findActivitiesNaurodevelopment = await this.prisma.naurodevelopmentActivities.findMany()

        if (findActivitiesNaurodevelopment.length > 1) return 

        await this.prisma.naurodevelopmentActivities.createMany({data: naurodevelopmentActivities})
    }
}