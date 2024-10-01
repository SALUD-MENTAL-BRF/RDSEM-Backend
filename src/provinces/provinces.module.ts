import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProvinceController } from "./provinces.controller";
import { ProvinceService } from "./provinces.service";


@Module({
    controllers:[ProvinceController],
    providers:[PrismaService,ProvinceService]
})
export class ProvinceModule{}