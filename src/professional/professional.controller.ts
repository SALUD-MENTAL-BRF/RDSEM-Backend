import { Controller,Post, Body, Req,Res, Param, ValidationPipe } from "@nestjs/common";
import { Request,Response } from "express";
import { ProfessionalService } from "./professional.service";
import { CreateProfessionalDto } from "./dto/createProfessional.dto";
import { UsePipes } from "@nestjs/common";

@Controller('professional')
export class ProfessionalControllers {

    constructor(private professionalService: ProfessionalService){}

    @Post(':id')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async createProfessional(@Param('id') id: string ,@Req() _request: Request, @Res() response : Response, @Body() data: any) {
        try {
            const professional = await this.professionalService.AddProfessional(data, id)

            response.status(200).json(professional)
        } catch (error) {
            response.status(500).json({msg: 'Error to add the professional'})
            console.log(error)
        }
    }

}