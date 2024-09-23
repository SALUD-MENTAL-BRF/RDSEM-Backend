import { Req, Res, Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { Request,Response } from 'express';
import { RequestPatientService } from './request_patient.service';
import { CreateRequestPatientDto } from './dto/request_patient.dto';
@Controller('request-patient')
export class RequestPatientController {
  constructor(private readonly requestPatientService: RequestPatientService) {}

  @Post()
  @UsePipes(new ValidationPipe({whitelist: true}))
  create(@Body() data: CreateRequestPatientDto, @Req() request: Request, @Res() response: Response) {
    try {
        const request_patient = this.requestPatientService.create(data);
        
    } catch (error) {
        
    }
    
  }

  @Get()
  findAll() {
    return this.requestPatientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.requestPatientService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.requestPatientService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.requestPatientService.remove(id);
  }
}
