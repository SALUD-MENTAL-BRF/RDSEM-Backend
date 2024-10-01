import { Module } from "@nestjs/common";
import { LocalityController } from "./locality.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { LocalityService } from "./locality.service";


@Module({
    controllers:[LocalityController],
    providers:[PrismaService,LocalityService]
})
export class localityModule{}