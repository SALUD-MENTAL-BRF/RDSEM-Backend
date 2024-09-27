import { Body, Controller, Get, Post } from '@nestjs/common';
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

}
