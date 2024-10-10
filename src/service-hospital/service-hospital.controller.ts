import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ServiceHospitalService } from './service-hospital.service';
import { createServiceHospital } from './dto/createServiceHospital';

@Controller('serviceHospital')
export class ServiceHospitalController {
  constructor(private readonly serviceHospitalService: ServiceHospitalService){}

  @Post('/')
  async createServiceHospital(@Body() serviceHospital: createServiceHospital) {
    try {

      await this.serviceHospitalService.createServiceHospital(serviceHospital);
      return { success: true }
    } catch (err) {
      if(err instanceof Error) {
        console.error(`Error creating service hospital: ${err.message}`);
      } else {
        console.error(`Unknown error creating service hospital: ${err}`);
      }
    }
  }

  @Get('/')
  async getAllServiceHospitals() {
    try {
      return await this.serviceHospitalService.getAllServiceHospitals();
    } catch (err) {
      if(err instanceof Error) {
        console.error(`Error getting all service hospitals: ${err.message}`);
      } else {
        console.error(`Unknown error getting all service hospitals: ${err}`);
      }
    }
  }

  @Delete('/:id')
  async deleteServiceHospital(@Param('id') id: string) {
    try {
      const NumberId = parseInt(id) 
      if(isNaN(NumberId)){
        throw new BadRequestException('ID inválido');
      }

      const response = await this.serviceHospitalService.deleteServiceHospital(NumberId);
      return response
    } catch (err) {
      if(err instanceof Error) {
        console.error(`Error deleting service hospital: ${err.message}`);
      } else {
        console.error(`Unknown error deleting service hospital: ${err}`);
      }
    }
  }

}
