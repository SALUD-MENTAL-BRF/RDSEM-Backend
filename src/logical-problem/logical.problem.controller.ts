import { Controller, Param, Post, Get, Req, Res, UsePipes, ValidationPipe, Put, Body } from "@nestjs/common";
import { LogicalProblemService } from "./logical.problem.service";
import { Request,Response } from "express";
import { createLogicalProblemSettingDto } from "./dto/logical.problem.dto";

@Controller('logical-problem')
export class LogicalProblemController {

    constructor(private logicalProblemService: LogicalProblemService){};

    @Post('setting/:professionalId/:patientId')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async createSetting(@Req() _request: Request, @Res() response:Response,@Param('professionalId') professionalId:number, 
    @Param('patientId') patientId: number,@Body() setting: createLogicalProblemSettingDto){
        try {
            console.log();
            
            response.status(201).json(await this.logicalProblemService.addSetting(Number(professionalId), Number(patientId), setting));
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg:'Error to create setting'
            })
        }   
    };

    @Get('setting/:professionalId/:patientId')
    async findOneSetting(@Req() _request: Request, @Res() response:Response,@Param('professionalId') professionalId:number, 
    @Param('patientId') patientId:string){
        try {
            const setting = await this.logicalProblemService.findOneSettingByProfessionalAndPatient(Number(professionalId), Number(patientId));
            console.log(setting);
            
            if(!setting){
                return response.status(404).json({
                    msg:'Setting not found'
                });
            };

            response.status(200).json(setting);
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg:'Error to find the setting'
            });
        };
    };

    @Put('setting/:settingId')
    @UsePipes(new ValidationPipe({whitelist: true}))
    async updateSetting(@Req() _request: Request, @Res() response:Response,@Param('settingId') settingId: string,@Body() setting: createLogicalProblemSettingDto){
        try {
            const findSetting = await this.logicalProblemService.findOne(Number(settingId));

            if(!findSetting){
                return response.status(404).json({
                    msg:'Setting not found'
                });
            };

            response.status(200).json(await this.logicalProblemService.updateSetting(Number(settingId), setting))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to update the setting'
            })
        };
    };
};