import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RequestPatientService } from './request_patient.service';

@Controller('request-patient')
export class RequestPatientController {
  constructor(private readonly requestPatientService: RequestPatientService) {}

  @Post()
  create(@Body() data: any) {
    return this.requestPatientService.create(data);
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
