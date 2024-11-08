import {IsNotEmpty} from 'class-validator'


export class createSocialHabilitySettingDto {

    @IsNotEmpty({message: 'No se seleccionó la edad'})
    age: string

    @IsNotEmpty({message: 'No se seleccionó un género'})
    genre: string

    @IsNotEmpty({message: 'No se seleccionó la complejidad'})
    complexity: string

    @IsNotEmpty({message: 'No se seleccionó la personalidad'})
    personality: string


    professionalid: number;

    patientId: number;
};

export class createSocialHabilityHistoryDto{

    @IsNotEmpty({message: 'El escenario no existe'})
    stage: string;

    @IsNotEmpty({message: 'Las respuestas no existe'})
    responses: Array<string>;

    @IsNotEmpty({message:'La explicación no existe'})
    explanation: string;

    @IsNotEmpty({message: 'La complejidad no existe'})
    complexy: string;

    professionalid: number;

    patientId: number;
}