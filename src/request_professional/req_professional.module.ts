import { Module } from "@nestjs/common";
import { Req_ProfessionalController } from "./req_professional.controller";
import { Req_ProfessionalService } from "./req_professional.service";
@Module({
    controllers:[Req_ProfessionalController],
    providers: [Req_ProfessionalService]
})
export class Req_ProfessionalModule{}