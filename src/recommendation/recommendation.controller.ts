import { Body, Controller, Param, Post, Req, Res,Get, Put } from "@nestjs/common";
import { RecommendationService } from "./recommendation.service";
import { Response, Request } from "express";
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

    @Put(':recomendationId')
    async updateRecomendation(@Req() _request: Request, @Res() response: Response,@Param('recomendationId') recomendationId: string, @Body() data: CreateRecommendationDto){
        try {
            response.status(200).json(await this.recommendationService.update(Number(recomendationId), data))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to update the recommendation'
            })
        }
    }

}