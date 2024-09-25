import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRequestPatientDto } from './dto/request_patient.dto';

@Injectable()
export class RequestPatientService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, id: number, professionalId:number) {
    return this.prisma.request_patient.create({
      data: {...data, userId: id, professionalId: professionalId} 
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
      }
    })
  }

  async findOneByUserAndProfessional(id: number, professionalId: number) {
    return this.prisma.request_patient.findFirst({
      where: { 
        userId: id,
        professionalId: professionalId
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


      const patient = await this.prisma.patient.create({data: {
          address: request.address,
          contactEmergencyName: request.contactEmergencyName,
          contactEmergencyRelation: request.contactEmergencyRelation,
          contactEmergencyTelephone: request.contactEmergencyTelephone,
          date_birth: request.date_birth,
          descriptionProblem: request.descriptionProblem,
          diagnosesPrevious: request.diagnosesPrevious,
          fullName: request.fullName,
          genre: request.genre,
          historyConsumption: request.historyConsumption,
          historyDiseases: request.historyDiseases,
          histoyFamily: request.histoyFamily,
          hospitalizationsPrevious: request.hospitalizationsPrevious,
          meciationCurrent: request.meciationCurrent,
          reasonConsultation: request.reasonConsultation,
          telephone: request.telephone,
          treatmentsPrevious: request.treatmentsPrevious,
          userId: request.userId
      }});

  
      
      await this.prisma.user.update({
        where:{
          id: request.userId
        },
        data:{
          roleId: 3
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
