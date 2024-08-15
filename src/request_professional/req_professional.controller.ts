import { Controller } from "@nestjs/common";
import { Req_ProfessionalService } from "./req_professional.service";
import { Post,Body } from "@nestjs/common";

@Controller('req_professional')
export class Req_ProfessionalController {

    @Post()
    CreateRquestProfessional(@Body() req_professional: any){
        
    }
}