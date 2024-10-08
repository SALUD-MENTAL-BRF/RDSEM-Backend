import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./dto/recomendation.dto";

@Injectable()
export class RecommendationService {
    constructor(private readonly prismaService : PrismaService){}

    async create(data: CreateRecommendationDto, patientId: number, professionalId: number){
        return await this.prismaService.recommendation.create({data: {...data, patientId: patientId, professionalId: professionalId}})
    }


    async findAllForPatientAndProfessional(patientId: number, professionalId: number){
        return await this.prismaService.recommendation.findMany({
            where: {
                patientId: patientId,
                professionalId: professionalId
            }
        })
    }

    async update(recomendationId: number, data: CreateRecommendationDto){
        return await this.prismaService.recommendation.update({
            where: {
                id: recomendationId
            },
            data: data
        })
    }
};