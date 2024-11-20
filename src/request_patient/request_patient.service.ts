import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestPatientDto } from './dto/request_patient.dto';

@Injectable()
export class RequestPatientService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, userId: number, professionalId:number) {
    return this.prisma.request_patient.create({
      data: {...data, userId: userId, professionalId: professionalId,  localityId: Number(data.localityId)
      } 
    });
  }

  async findAll(id:number) {    
    return this.prisma.request_patient.findMany({
      where: {
        professionalId: id
      }
    });
  }

  async findOne(id:number){
    return this.prisma.request_patient.findFirst({
      where: {
        id:id
      },
      include: {
        locality: {
          include:{
            province: true
          }
        }
      }
    })
  }

  async findOneByUser(id: number) {
    return this.prisma.request_patient.findFirst({
      where: { 
        userId: id
       },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.request_patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.request_patient.delete({
      where: { id:id }
    });
  }

  async acceptRequest (professionalId:number, requestId:number){
      const request = await this.findOne(requestId);

    let patient = await this.prisma.patient.findFirst({
      where: {
        userId: request.userId
      }
    });

    if (!patient){
       patient = await this.prisma.patient.create({
        data: {
          fullName: request.fullName,
          date_birth: request.date_birth,
          genre: request.genre,
          telephone: request.telephone,
          contactEmergencyName: request.contactEmergencyName,
          contactEmergencyRelation: request.contactEmergencyRelation,
          contactEmergencyTelephone: request.contactEmergencyTelephone,
          streetNumber: request.streetNumber,
          neighborhood: request.neighborhood,
          userId: request.userId,
          localityId: request.localityId
        }
      })
    }

    await this.prisma.infoPatient.create({
      data: {
        reasonConsultation: request.reasonConsultation,
        descriptionProblem: request.descriptionProblem,
        diagnosesPrevious: request.diagnosesPrevious,
        treatmentsPrevious: request.treatmentsPrevious,
        hospitalizationsPrevious: request.hospitalizationsPrevious,
        meciationCurrent: request.meciationCurrent,
        historyConsumption: request.historyConsumption,
        historyDiseases: request.historyDiseases,
        histoyFamily: request.histoyFamily,

        patientId: patient.id,
        professionalId: professionalId
      }
    })
    
    
      await this.prisma.user.update({
        where:{
          id: request.userId
        },
        data:{
          roleId: 4
        }
      })

      await this.remove(requestId)

      return await this.prisma.professional.update({
        where:{
          id: professionalId
        },
        data: {
          patient: {
            connect: {id: patient.id}
          }
        }
      });

  };
};
