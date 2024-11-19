import { IsNotEmpty } from "class-validator";
export class createLogicalProblemSettingDto {

    @IsNotEmpty({message:'No se seleccionó ninguna complejidad.'})
    complexity: string;
};