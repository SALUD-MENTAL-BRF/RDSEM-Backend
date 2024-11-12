import { PrismaService } from "../prisma.service"
import { Injectable, OnModuleInit } from "@nestjs/common"
import {categories} from './categories'
import { Activities } from "./activities"
import { provinces } from "./provinces"
import { localities } from "./localities"
import { disorder } from "./disorder"
import { activityXdisorder } from "./activitiesXdisorder"
import { disorderXcategory } from "./disorderXcategory"

@Injectable()
export class PreloadedData implements OnModuleInit{
    
    constructor(private prisma : PrismaService){};

    async onModuleInit() {
        await this.addDisorder();
        await this.addRole();
        await this.addCategories();
        await this.addActivities();
        await this.addProvinces();
        await this.addLocalities();
        await this.addActivitiesXdisorder();
        await this.addDisorderXcategory();
    };

    async addRole(){    
        const roles = [
            {"type": "admin"},
            {"type": "professional"},
            {"type": "patient"},
            {"type": "guest"}
        ];
          
        const findRoles = await this.prisma.role.findMany();

        if (findRoles.length > 1) return;


        await this.prisma.role.createMany({data: roles});
    };

    async addDisorder(){
        const findDisorder = await this.prisma.disorder.findMany();

        if(findDisorder.length > 1) return;

        await this.prisma.disorder.createMany({data: disorder});
    }

    
    async addCategories(){
        const findCategoriesNaurodevelopment = await this.prisma.categoryActivities.findMany();

        if(findCategoriesNaurodevelopment.length > 1) return;
        
        await this.prisma.categoryActivities.createMany({data:categories});
    };

    async addActivities(){
        const findActivitiesNaurodevelopment = await this.prisma.activities.findMany();

        if (findActivitiesNaurodevelopment.length > 1) return; 

        await this.prisma.activities.createMany({data: Activities});
    };

    async addProvinces(){
        const findProvinces = await this.prisma.province.findMany();

        if (findProvinces.length > 1) return;

        await this.prisma.province.createMany({data: provinces});
    };

    async addLocalities(){
        const findLocalities = await this.prisma.locality.findMany();

        if (findLocalities.length > 1) return;

        await this.prisma.locality.createMany({data: localities});
    };


    async addActivitiesXdisorder(){
        const findRelation = await this.prisma.activityXDisorder.findMany();

        if(findRelation.length > 1) return;

        activityXdisorder.forEach(async(element) => {
            await this.prisma.activityXDisorder.createMany({
                data: element.activityIds.map((activityId) => ({
                    disorderId: element.disorderId,
                    activityId: activityId
                }))
            });
        });
    };

    async addDisorderXcategory(){
        const findRelation = await this.prisma.disorderXCategory.findMany(); 

        if(findRelation.length > 1) return;

        disorderXcategory.forEach(async(element) => {
            await this.prisma.disorderXCategory.createMany({
                data: element.categoryIds.map((categoryId) => ({
                    disorderId: element.disorderId,
                    categoryId: categoryId
                }))
            });
        });
    }
};