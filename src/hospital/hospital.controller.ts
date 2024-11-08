import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { createHospital } from './dto/createHospitalDTO';
import { TypeHospital } from '@prisma/client';
import { Request, Response } from 'express';

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
      
      return hospitals.map(hospital => ({
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        telephone: hospital.telephone,
        email: hospital.email,
        website: hospital.website,
        director: hospital.director,
        openingHours: hospital.openingHours,
        type: hospital.type,
        createdAt: hospital.createdAt,
        updatedAt: hospital.updatedAt,
        specialties: hospital.specialties,
        services: hospital.services,
      }));
    } catch (err) {
      if(err instanceof Error) {
        return { success: false, message: err.message };
      } else {
        return { success: false, message: 'Error inesperado' };
      }
    }
  }
  
  @Get('/types')
  async getHospitalTypes() {
    const types = Object.values(TypeHospital);
    return types;
  }

  @Get('/:userId')
  async findHospitalByUserId(@Req() _request: Request, @Res() response: Response, @Param('userId') userId: string) {
    try {
      const user = await this.hospitalService.findOneByUserId(Number(userId));
      if (!user) {
        return response.status(404).json({ success: false, message: 'No se encontró el hospital' });
      }
      return response.json({ success: true, hospital: user });
    } catch (err) {
      return response.status(500).json({ success: false, message: err.message });
    }
  }

  @Delete('/:id') 
  async deleteHospital(@Param('id') id: string) {
    try {

      const NumberId = parseInt(id, 10);

      if(isNaN(NumberId)){
        return { success: false, message: 'ID inválido' };
      }

      const response = await this.hospitalService.deleteHospital(NumberId);
      return response
    } catch (err) {
      if(err instanceof Error) {
        console.error(`Error deleting speciality hospital: ${err.message}`);
      } else {
        console.error(`Unknown error deleting speciality hospital: ${err}`);
      }
    }
  }

}
