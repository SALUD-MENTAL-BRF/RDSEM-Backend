import { Body, Controller, Param, Post, Req, Res,Get } from "@nestjs/common";
import { RecommendationService } from "./recommendation.service";
import { Response, Request, response } from "express";
import { CreateRecommendationDto } from "./dto/recomendation.dto";

@Controller('recommendation')
export class RecommendationController {
    constructor(private recommendationService: RecommendationService){}


    @Post(':patientId/:professionalId')
    async createRecommendation(@Req() _request: Request, @Res() response: Response, @Param('patientId') patientId: string,@Param('professionalId') professionalId: string, @Body() data: CreateRecommendationDto){
        try {
            response.status(200).json(await this.recommendationService.create(data, Number(patientId), Number(professionalId)))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to create recommendation'
            })
        }
    }

    @Get(':patientId/:professionalId')
    async findAllRecommendationByPatientAndProfessional(@Req() _request: Request, @Res() response: Response, @Param('patientId') patientId: string, @Param('professionalId') professionalId: string){
        try {
            response.status(200).json(await this.recommendationService.findAllForPatientAndProfessional(Number(patientId), Number(professionalId)))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to find all recommendations'
            })
            
        }
    }
}