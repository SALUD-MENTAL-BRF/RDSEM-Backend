import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { createLogicalProblemSettingDto, createLogicalProblemHistoryDto } from "./dto/logical.problem.dto";

@Injectable()
export class LogicalProblemService {
    constructor(private readonly prismaService: PrismaService){}

    async addHistory(professionalId: number, patientId: number, history: createLogicalProblemHistoryDto){
        return await this.prismaService.logicalProblemHistory.create({
            data: {...history, professionalId: professionalId, patientId: patientId}
        })
    };

    async findHistory(professionalId: number, patientId: number){
        return await this.prismaService.logicalProblemHistory.findMany({
            where: {
                professionalId: professionalId,
                patientId: patientId
            }
        });
    };

    async addSetting (professionalId: number,patientId:number,setting:createLogicalProblemSettingDto){
        return await this.prismaService.logicalProblemSetting.create({
            data: {...setting, professionalId: professionalId, patientId: patientId}
        });
    };

    async findOneSettingByProfessionalAndPatient(professionalId: number,patientId:number){
        return await this.prismaService.logicalProblemSetting.findFirst({
            where: {
                professionalId: professionalId,
                patientId: patientId
            }
        });
    };

    async updateSetting(settingId: number,setting:createLogicalProblemSettingDto){
        return await this.prismaService.logicalProblemSetting.update({
            where: {
                id: settingId
            },
            data: setting
        })
    };

    async findOne(settingId: number){
        return await this.prismaService.logicalProblemSetting.findFirst({
            where: {
                id: settingId
            }
        });
    }
};
