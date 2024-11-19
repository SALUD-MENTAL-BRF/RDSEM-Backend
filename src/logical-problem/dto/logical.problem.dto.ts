import { IsNotEmpty } from "class-validator";
export class createLogicalProblemSettingDto {
    
    id?: number

    @IsNotEmpty({message:'No se seleccionó ninguna complejidad.'})
    complexity: string;

    @IsNotEmpty({message:'No se seleccionó ninguna complejidad tema.'})
    theme: string;

    @IsNotEmpty({message:'No se seleccionó ningun tipo de problema.'})
    problem_type: string;
};