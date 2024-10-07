import { Body, Controller, Param, Post, Req, Res } from "@nestjs/common";
import { RecommendationService } from "./recommendation.service";
import { Response, Request } from "express";
import { CreateRecommendationDto } from "./dto/recomendation.dto";

@Controller('recommendation')
export class RecommendationController {
    constructor(private recommendationService: RecommendationService){}


    @Post(':patientId')
    async createRecommendation(@Req() _request: Request, @Res() response: Response, @Param('patientId') patientId: string, @Body() data: CreateRecommendationDto){
        try {
            response.status(200).json(await this.recommendationService.create(data))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to create recommendation'
            })
        }
    }
}