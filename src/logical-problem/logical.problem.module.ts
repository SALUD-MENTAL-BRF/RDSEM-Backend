import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LogicalProblemService } from "./logical.problem.service";
import { LogicalProblemController } from "./logical.problem.controller";

@Module({
    controllers: [LogicalProblemController],
    providers: [PrismaService, LogicalProblemService]
})
export class LogicalProblemModule {};