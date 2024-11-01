import { PrismaService } from "src/prisma/prisma.service";
import { createSocialHabilitySettingDto } from "./dto/social.hability.dto";

export class SocialHabilityService {
    constructor(private readonly prismaService: PrismaService){}

    async addedSetting(setting: createSocialHabilitySettingDto, professionalId: number, patientId:number){
        return await this.prismaService.socialHabilitySetting.create({data: {...setting, professionalId, patientId}})
    };

    async updateSetting(setting: createSocialHabilitySettingDto,settingId: number){
        return await this.prismaService.socialHabilitySetting.update({
            where: {
                id:settingId
            },
            data: setting
        })
    };

    async findOne(professionalId: number, patientId: number){
        return await this.prismaService.socialHabilitySetting.findFirst({
            where: {
                professionalId: professionalId,
                patientId: patientId
            }
        });
    };
};