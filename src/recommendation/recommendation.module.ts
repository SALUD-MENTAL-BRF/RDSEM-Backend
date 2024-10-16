import { Module } from "@nestjs/common";
import { RecommendationController } from "./recommendation.controller";
import { RecommendationService } from "./recommendation.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [RecommendationController],
    providers: [RecommendationService, PrismaService]
})
export class RecommendationModule{}