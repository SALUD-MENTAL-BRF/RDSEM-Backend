import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRequestVideocallDto } from './dto/create-request-videocall.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestVideocallService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateRequestVideocallDto, userId: number, professionalId: number) {
   
    const patient = await this.prisma.patient.findFirst({
      where: {
        userId: userId, // Buscar al paciente por su userId
      },
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    const fechaSolicitud = new Date(data.fechaSolicitud);
    if (isNaN(fechaSolicitud.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.solicitud.create({
      data: {
        motivo: data.motivo,
        fechaSolicitud: fechaSolicitud,
        horaSolicitud: data.horaSolicitud.toString(), 
        estadoSolicitud: 'PENDIENTE',
        professional: {
          connect: { id: professionalId },
        },
        patient: {
          connect: { id: patient.id },
        },
      },
    });

  }

  async findAll(userId: number) {
    const patient = this.prisma.patient.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    const solicitudes = await this.prisma.solicitud.findMany({
      where: {
        patientId: userId,
      },
    });
    // console.log('Solicitudes encontradas:', solicitudes); // Log para depuración
    return solicitudes;
  }

  async findAllRequestP(professionalId: number) {
    
    const solicitudes = await this.prisma.solicitud.findMany({
      where: {
        professionalId: professionalId,
      }
    });
    // console.log('Solicitudes encontradas:', solicitudes); // Log para depuración
    console.log('Id del profesional',professionalId)
    return solicitudes;
  }
  

  findOne(id: number) {
    return this.prisma.solicitud.findFirst({
      where: {
        patientId: id
      }
    });
  }

  remove(id: number) {
    return this.prisma.solicitud.delete({
      where: {
        id: id
      }
    });
  }

  async updateStatus(solicitudId: number, nuevoEstado: 'CANCELADA' | 'ACEPTADA') {

    const estadosValidos = ['CANCELADA', 'ACEPTADA'];
    if (!estadosValidos.includes(nuevoEstado)) {
      throw new HttpException('Estado inválido', HttpStatus.BAD_REQUEST);
    }
  
    // Buscar la solicitud para asegurarte de que existe
    const solicitud = await this.prisma.solicitud.findUnique({
      where: { id: solicitudId },
    });
  
    if (!solicitud) {
      throw new HttpException('Solicitud no encontrada', HttpStatus.NOT_FOUND);
    }
  
    // Actualizar el estado de la solicitud
    const solicitudActualizada = await this.prisma.solicitud.update({
      where: { id: solicitudId },
      data: { estadoSolicitud: nuevoEstado },
    });
  
    return solicitudActualizada;
  }
}