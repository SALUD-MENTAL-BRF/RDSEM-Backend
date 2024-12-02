import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { RequestVideocallService } from './request-videocall.service';
import { CreateRequestVideocallDto } from './dto/create-request-videocall.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Controller('request-videocall')
export class RequestVideocallController {
  constructor(private readonly requestVideocallService: RequestVideocallService, private prisma: PrismaService, private usersService: UsersService) { }

  @Post(':userId/:professionalId')
  async create(
    @Body() createRequestVideocallDto: CreateRequestVideocallDto,
    @Param('userId') userId: string,
    @Param('professionalId') professionalId: string
  ) {
    console.log('UserId', userId);
    console.log('ProfessionalId', professionalId);
    try {
      const solicitud = await this.requestVideocallService.create(
        createRequestVideocallDto,
        +userId,
        +professionalId
      );
      return {
        success: true,
        data: solicitud,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Ocurrió un error al procesar la solicitud', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch('status/:solicitudId')
  async updateStatus(
    @Param('solicitudId') solicitudId: string,
    @Body('nuevoEstado') nuevoEstado: 'CANCELADA' | 'ACEPTADA',
  ) {
    try {
      const solicitudActualizada = await this.requestVideocallService.updateStatus(
        +solicitudId,
        nuevoEstado,
      );
      return {
        success: true,
        data: solicitudActualizada,
      };
    } catch (error) {
      console.error('Error al actualizar el estado de la solicitud:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findAll(@Param('id') id: string) {
    try {
      const solicitudes = await this.requestVideocallService.findAll(+id);
      return { success: true, data: solicitudes };
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
      throw new HttpException(
        'No se pudieron obtener las solicitudes',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('professional/:id')
  async findAllP(@Param('id') id: string) {
    try {
      const solicitudes = await this.requestVideocallService.findAllRequestP(+id);
      return { success: true, data: solicitudes };
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
      throw new HttpException(
        'No se pudieron obtener las solicitudes',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.requestVideocallService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestVideocallService.remove(+id);
  }

  @Get('token/:token')
  async getUserByToken(@Param('token') token: string) {
    const user = await this.usersService.findOneByToken(token);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const patient = await this.prisma.patient.findFirst({
      where: {
        userId: user.id,
      },
    });

    // const professional = await this.prisma.professional.findFirst({
    //   where: {
    //     userId: user.id,
    //   },
    // });

    return {
      ...user,
      patientId: patient ? patient.id : null,
      // professionalId: professional ? professional.id : null,
    };
  }

  @Get('professional/token/:token')
  async getUserByTokenProfessional(@Param('token') token: string) {
    const user = await this.usersService.findOneByToken(token);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const professional = await this.prisma.professional.findFirst({
      where: {
        userId: user.id,
      },
    });

    return {
      ...user,
      professionalId: professional ? professional.id : null,
    };
  }
}
