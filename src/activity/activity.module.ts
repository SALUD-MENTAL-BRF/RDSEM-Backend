import { Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ActivityService } from "./activity.service";

 @Module({
    controllers: [ActivityController],
    providers: [PrismaService,ActivityService]
 })
 export class ActivityModule{};