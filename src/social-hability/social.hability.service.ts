import { PrismaService } from "src/prisma/prisma.service";
import { createSocialHabilitySettingDto } from "./dto/social.hability.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class SocialHabilityService {
    constructor(private readonly prismaService: PrismaService){}

    async addedSetting(setting: createSocialHabilitySettingDto, professionalId: number, patientId:number){
        return await this.prismaService.socialHabilitySetting.create({data: {...setting, professionalId, patientId}})
    };

    async updateSetting(settingId: number,setting: createSocialHabilitySettingDto){
        return await this.prismaService.socialHabilitySetting.update({
            where: {
                id:settingId
            },
            data: setting
        })
    };

    async findOneByProfessionalAndPatient(professionalId: number, patientId: number){
        return await this.prismaService.socialHabilitySetting.findFirst({
            where: {
                professionalId: professionalId,
                patientId: patientId
            }
        });
    };
};