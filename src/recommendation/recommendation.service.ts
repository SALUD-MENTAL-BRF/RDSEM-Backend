import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./dto/recomendation.dto";

@Injectable()
export class RecommendationService {
    constructor(private readonly prismaService : PrismaService){}

    async create(data: CreateRecommendationDto){
        return await this.prismaService.recommendation.create({data: data})
    }
};