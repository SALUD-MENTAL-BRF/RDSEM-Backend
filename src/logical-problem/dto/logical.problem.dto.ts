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

export class createLogicalProblemHistoryDto {

    @IsNotEmpty({message: 'El problema no existe'})
    problem: string;

    @IsNotEmpty({message: 'Las respuestas no existe'})
    responses: Array<string>;

    @IsNotEmpty({message:'La explicación no existe'})
    explanation: string;

    @IsNotEmpty({message: 'La complejidad no existe'})
    complexity: string;

    @IsNotEmpty({message: 'La respuesta no existe'})
    answer: number

    @IsNotEmpty({message: 'La respuesta correcta no existe'})
    correctResponse: string;

    professionalId: number;

    patientId: number;
};