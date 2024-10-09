import { Controller, Get,Res,Req, Post } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { Request,Response } from "express";
import { Param } from "@nestjs/common";

@Controller('activity')
export class ActivityController {
    constructor(private activityService: ActivityService){}

    @Get()
    async findAllActivities(@Req() _request:Request, @Res() response: Response){
        try {
            response.status(200).json(await this.activityService.findAll())
        } catch (error) {   
            console.log(error);
            response.status(500).json({
                msg: 'Error to find all the activities'
            })
        }
    }


    @Post(':patientId')
    async linkedActivity(@Req() _request:Request, @Res() response: Response, @Param('patientId') patientId: string){
        try {
            
        } catch (error) {
            
        }
    }
};