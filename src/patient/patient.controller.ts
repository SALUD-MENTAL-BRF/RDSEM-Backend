import { Controller,Req,Res, Param,Get } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { Response,Request } from "express";

@Controller('patient')
export class PatientController{

    constructor (private patientService:PatientService){}


    @Get(':id')
    async findAllPatientByProfessional(@Res() response:Response, @Req() _request:Request, @Param('id') id: string){
        try {
            response.status(200).json( await this.patientService.getAllPatientByProfessional(Number(id)))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: "Error to find patients"
            })
        };
    };



};