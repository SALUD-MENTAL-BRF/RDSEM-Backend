import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRecommendationDto } from "./dto/recomendation.dto";

@Injectable()
export class RecommendationService {
    constructor(private readonly prismaService : PrismaService){}

    async create(data: CreateRecommendationDto, patientId: number){
        return await this.prismaService.recommendation.create({data: {...data, patientId: patientId}})
    }


    async findAllForPatientAndProfessional(patientId: number, professionalId: number){
        return await this.prismaService.recommendation.findMany({
            where: {
                patientId: patientId
            },
            include: {
                patient: {
                    include: {
                        professional: {
                            where: {
                                id: professionalId
                            }
                        }
                    }
                }
            }
        })
    }

};