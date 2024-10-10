import { Module } from "@nestjs/common";
import { DisorderController } from "./disorder.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { DisorderService } from "./disorder.service";

@Module({
    controllers: [DisorderController],
    providers: [PrismaService, DisorderService]
})
export class DisorderModule {};
