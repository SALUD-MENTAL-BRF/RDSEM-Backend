import { Body, Controller, Get, Post } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { createHospital } from './dto/createHospitalDTO';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post('/')
  async createHospital(@Body() hospital: createHospital) {
    try {
      await this.hospitalService.createHospitalService(hospital);
      return { success: true };
    } catch (error) {
      return { error: 'No se pudo crear el hospital', message: error.message };
    }
  }

  @Get('/')
  async getAllHospitals() {
    try {
      const hospitals = await this.hospitalService.getAllHospitals();
      return { hospitals };
    } catch (err) {
      if(err instanceof Error) {
        return { success: false, message: err.message };
      } else {
        return { success: false, message: 'Error inesperado' };
      }
    }
  }
}
