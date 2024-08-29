import { Controller,Post, Body, Req,Res, Param, ValidationPipe, Get, Put, UseInterceptors, UploadedFile } from "@nestjs/common";
import { Request,Response } from "express";
import { ProfessionalService } from "./professional.service";
import { UsePipes } from "@nestjs/common";
import { CreateProfessionalDto, UpdateProfileProfessionalDto } from "./dto/professional.dto";
import { UsersService } from "src/users/users.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('professional')
export class ProfessionalControllers {

    constructor(
        private professionalService: ProfessionalService,
        private userService:UsersService
    ){}

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



    @Get()
    async getAllProfessional(@Req() _request: Request, @Res() response: Response){
        try {
            response.status(200).json(await this.professionalService.findAll());
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get all professionals"})
        }
    };


    @Get(':id')
    async findOneProfile(@Req() _request: Request, @Res() response: Response, @Param('id') id: string){
        try {
            response.status(200).json(await this.professionalService.findOneProfile(Number(id)));
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to get one professional"})
        }
    };

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async updateProfile(@Req() _request: Request, @Res() response: Response,@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() data: UpdateProfileProfessionalDto){
        try {
            if(file){
                await this.userService.updateImage(Number(id), file)
            }
            
            if(data){
                
            }
            
            response.status(200).json({})
        } catch (error) {
            console.log(error);
            response.status(500).json({msg: "Error to update profile"})
        }
    }
}