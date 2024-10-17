import { Controller,Post, Body, Req,Res, Param, ValidationPipe, Get, Put } from "@nestjs/common";
import { Request,Response } from "express";
import { ProfessionalService } from "./professional.service";
import { UsePipes } from "@nestjs/common";
import { CreateProfessionalDto, UpdateProfileProfessionalDto } from "./dto/professional.dto";

@Controller('professional')
export class ProfessionalControllers {

    constructor(
        private professionalService: ProfessionalService,
    ){}


    @Post(':userId')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async createProfessional(@Param('userId') userId: string ,@Req() _request: Request, @Res() response : Response, @Body() data: CreateProfessionalDto) {
        try {
            const professional = await this.professionalService.create(data, Number(userId));

            response.status(200).json(professional);
        } catch (error) {
            response.status(500).json({msg: 'Error to add the professional'});
            console.log(error);
        };
    };

    @Get()
    async getAllProfessional(@Req() _request: Request, @Res() response: Response){
        try {
            response.status(200).json(await this.professionalService.findAll());
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get all professionals"})
        }
    };
    
    @Get(':userId')
    async findProfessionalByUserId(@Req() _request: Request, @Res() response: Response, @Param('userId') userId: string){
        try {            
            response.status(200).json(await this.professionalService.findOneByUserId(Number(userId)))
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to find the professional"})
            
        }
    }

    @Get('patient/:patientId')
    async findProfessionalsByPatient(@Req() _request: Request, @Res() response: Response, @Param('patientId') patientId: string){
        try {
            response.status(200).json(await this.professionalService.findBypatient(Number(patientId)))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg:"Error to find all professionals by patient"
            })
        }
    };

    @Get('profile/:profileId')
    async findOneProfile(@Req() _request: Request, @Res() response: Response, @Param('profileId') profileId: string){
        try {
            response.status(200).json(await this.professionalService.findOneProfile(Number(profileId)));
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get one professional"})
        }
    };

    @Put(':professionalId')
    async updateProfile(@Req() _request: Request, @Res() response: Response,@Param('professionalId') professionalId: string, @Body() data: UpdateProfileProfessionalDto){
        try {
            response.status(200).json(await this.professionalService.updateProfile(Number(professionalId), data))
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to update profile"})
        }
    }
}