import { Controller,Post, Body, Req,Res, Param, ValidationPipe, Get, Put, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Request,Response } from "express";
import { ProfessionalService } from "./professional.service";
import { UsePipes } from "@nestjs/common";
import { CreateProfessionalDto, UpdateProfileProfessionalDto } from "./dto/professional.dto";
import { UsersService } from "src/users/users.service";

@Controller('professional')
export class ProfessionalControllers {

    constructor(
        private professionalService: ProfessionalService,
        private userService:UsersService
    ){}

    @Get()
    async getAllProfessional(@Req() _request: Request, @Res() response: Response){
        try {
            response.status(200).json(await this.professionalService.findAll());
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get all professionals"})
        }
    };

    @Post(':id')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async createProfessional(@Param('id') id: string ,@Req() _request: Request, @Res() response : Response, @Body() data: CreateProfessionalDto) {
        try {
            const professional = await this.professionalService.create(data, id);

            response.status(200).json(professional);
        } catch (error) {
            response.status(500).json({msg: 'Error to add the professional'});
            console.log(error);
        };
    };

    @Get(':id')
    async findOneProfessionalByUserId(@Req() _request: Request, @Res() response: Response, @Param('id') id: string){
        try {
            response.status(200).json(await this.professionalService.findOneByUserId(Number(id)))
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to find the professional"})
            
        }
    }

    @Get('profile/:id')
    async findOneProfile(@Req() _request: Request, @Res() response: Response, @Param('id') id: string){
        try {
            response.status(200).json(await this.professionalService.findOneProfile(Number(id)));
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get one professional"})
        }
    };

    @Put(':id')
    async updateProfile(@Req() _request: Request, @Res() response: Response,@Param('id') id: string, @Body() data: UpdateProfileProfessionalDto){
        try {
            response.status(200).json(await this.professionalService.updateProfile(Number(id), data))
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to update profile"})
        }
    }
}