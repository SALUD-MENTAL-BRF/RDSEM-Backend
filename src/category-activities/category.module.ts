import { Module } from "@nestjs/common";
import { CategoryActivitiesController } from "./category.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoryActivitiesService } from "./category.service";

@Module({
    controllers: [CategoryActivitiesController],
    providers: [PrismaService,CategoryActivitiesService]
})
export class CategoryActivitiesModule {};
