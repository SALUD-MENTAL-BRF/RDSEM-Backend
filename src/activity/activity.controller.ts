import { Controller, Get,Res,Req, Post, Body, Delete } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { Request,Response } from "express";
import { Param } from "@nestjs/common";
import { lindedActivityDto } from "./dto/likedActivity.dto";

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

    @Get(':patientId/:professionalId')
    async findAllActivitiesLinked(@Req() _request:Request, @Res() response: Response, @Param('patientId') patientId:string, @Param('professionalId') professionalId:string){
        try {
            response.status(200).json(await this.activityService.findAllLinkedByPatientId(Number(patientId), Number(professionalId)))
        } catch (error) {
            response.status(500).json({
                msg: 'Error to find all activities by patientId'
            })
        }
    }

    @Post(':patientId')
    async linkActivity(@Req() _request:Request, @Res() response: Response, @Param('patientId') patientId: string, @Body() data: lindedActivityDto){
        try {
            response.status(200).json(await this.activityService.linked(Number(patientId), data.activityIds))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to linked activity'
            })
        }
    }

    @Delete(':patientId/:activityId')
    async unlinkActivity(@Req() _request:Request, @Res() response: Response, @Param('patientId') patientId: string, @Param('activityId') activityId: string){
        try {
            response.status(200).json(await this.activityService.unlinked(Number(patientId), Number(activityId)))
        } catch (error) {
            response.status(500).json({
                msg: 'Error to unlink the activity'
            })
        }
    }
};