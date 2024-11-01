import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SocialHabilityService } from "./social.hability.service";
import { SocialHabilityController } from "./social.hability.controller";

@Module({
    controllers: [SocialHabilityController],
    providers: [PrismaService, SocialHabilityService]
})
export class SocialHabilityModule {};