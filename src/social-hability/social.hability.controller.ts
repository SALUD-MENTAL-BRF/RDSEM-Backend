import { Body, Controller, Get, Param, Post, Put, Req,Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { createSocialHabilitySettingDto } from "./dto/social.hability.dto";
import { SocialHabilityService } from "./social.hability.service";
import { Request,Response } from "express";

@Controller('social-hability')
export class SocialHabilityController {

    constructor(private socialHabilityService: SocialHabilityService){}

    @Post('setting/:professionalId/:patientId')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async createSetting(@Req() _request: Request, @Res() response: Response, @Body() data: createSocialHabilitySettingDto, @Param('professionalId') professionalId: string, @Param('patientId') patientId: string){
        try {
            response.status(201).json(await this.socialHabilityService.addedSetting(data, Number(professionalId), Number(patientId)));
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to create the setting'
            });
        };
    };

    @Put('setting/:settingId')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async updateSetting(@Req() _request: Request, @Res() response: Response, @Body() data: createSocialHabilitySettingDto, @Param('settingId') settingId: string){
        try {
            const setting = await this.socialHabilityService.findOneSetting(Number(settingId));

            if (!setting){
                return response.status(404).json({
                    msg: 'Setting not found'
                });
            };

            response.status(200).json(await this.socialHabilityService.updateSetting( Number(settingId),data));
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to create the setting'
            });
        };
    };

    @Get('setting/:professionalId/:patientId')
    async findSetting(@Req() _request: Request, @Res() response: Response, @Param('professionalId') professionalId: string, @Param('patientId') patientId: string){
        try {   
            const setting = await this.socialHabilityService.findOneByProfessionalAndPatient(Number(professionalId), Number(patientId));

            if (!setting){
                return response.status(404).json({
                    msg: 'Setting not found'
                });
            };

            response.status(200).json(setting);
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to find the setting'
            });
        };
    };
};



