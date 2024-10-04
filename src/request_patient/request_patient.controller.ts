import { Req, Res, Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { Request,Response } from 'express';
import { RequestPatientService } from './request_patient.service';
import { CreateRequestPatientDto } from './dto/request_patient.dto';
@Controller('request-patient')
export class RequestPatientController {
  constructor(private readonly requestPatientService: RequestPatientService) {}

  @Post(':userId/:professionalId')
  @UsePipes(new ValidationPipe({whitelist: true}))
  async create(@Body() data: CreateRequestPatientDto, @Req() _request: Request, @Res() response: Response, @Param('userId') userId: string, @Param('professionalId') professionalId: string) {
    try {
        console.log(data);
        
        const request_patient = await this.requestPatientService.create(data, Number(userId),Number(professionalId));

        response.status(200).json(request_patient)
    } catch (error) {
        console.log(error);
        response.status(500).json({message:"Error to create request"})
    }
    
  }
  
  @Post('professional/:requestId/:professionalId')
  async acceptRequest(@Req() _request: Request, @Res() response: Response, @Param('requestId') requestId: string, @Param('professionalId') professionalId: string) {
      try {
        response.status(200).json(await this.requestPatientService.acceptRequest(Number(professionalId), Number(requestId)))
      } catch (error) {
        console.log(error);
        response.status(500).json({
          msg: "Error to accept the request."
        })
      }
  }

  @Get('professional/:professionalId')
  async findAllByProfessional(@Req() _request: Request, @Res() response: Response, @Param('professionalId') professionalId: string) {
    try {
      const request_patient = await this.requestPatientService.findAll(Number(professionalId));

      response.status(200).json(request_patient)
  } catch (error) {
      console.log(error);
      response.status(500).json({message:"Error to get request"})
  }
  }

  @Get(':requestId')
  async findOne(@Req() _request: Request, @Res() response: Response, @Param('requestId') requestId: string) {
    try {
        response.status(200).json(await this.requestPatientService.findOne(Number(requestId)))
    } catch (error) {
        console.log(error);
        response.status(200).json({msg: "Error to find request."})
    }
  }


  @Get(':userId/:professionalId')
  async findOneByUserAndProfessional(@Req() _request: Request, @Res() response: Response, @Param('userId') userId: string, @Param('professionalId') professionalId: string) { 
    try {
      const request_patient = await this.requestPatientService.findOneByUserAndProfessional(Number(userId), Number(professionalId));

      response.status(200).json(request_patient)
  } catch (error) {
      console.log(error);
      response.status(500).json({message:"Error to get request"})
  }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return await this.requestPatientService.update(id, data);
  }

  @Delete(':id')
  async remove(@Req() _request: Request, @Res() response: Response,@Param('id') id: string) {
    try {
        response.status(200).json(await this.requestPatientService.remove(Number(id)))
    } catch (error) {
      response.status(500).json({msg: "Error to delete request"})
    }
  }
}
