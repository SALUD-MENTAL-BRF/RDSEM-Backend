import { Controller,Req,Res, Param,Get } from "@nestjs/common";
import { PatientService } from "./patient.service";
import { Response,Request } from "express";

@Controller('patient')
export class PatientController{

    constructor (private patientService:PatientService){}


    @Get(':patientId')
    async findOnePatient(@Req() _request: Request, @Res() response: Response, @Param('patientId') patientId: string){
        try {
            response.status(200).json(await this.patientService.findOne(Number(patientId)))
        } catch (error) {
            console.log(error);
            response.status(200).json({ 
                msg: "Error to find the patient"
            });
        }
    }

    @Get('info/:patientId/:professionalId')
    async findInfoPatient(@Req() _request: Request, @Res() response: Response,@Param('patientId') patientId: string,@Param('professionalId') professionalId: string){
        try {
            response.status(200).json(await this.patientService.findInfo(Number(patientId), Number(professionalId)))
        } catch (error) {
            console.log(error);
            response.status(200).json({
                msg: "Error to find the information of the patient"
            })
        }
    }
    
    @Get('user/:userId')
    async findPatientByUser(@Req() _request: Request, @Res() response: Response, @Param('userId') userId: string){
        try {
            response.status(200).json(await this.patientService.findOneByUserId(Number(userId)))
        } catch (error) {
            console.log(error);
            response.status(200).json({ 
                msg: "Error to find the patient"
            });
        }
    }


    @Get('professional/:professionalId')
    async findAllPatientByProfessional(@Req() _request:Request,@Res() response:Response,  @Param('professionalId') professionalId: string){
        try {
            response.status(200).json( await this.patientService.getAllPatientByProfessional(Number(professionalId)))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: "Error to find patients"
            })
        };
    };


};