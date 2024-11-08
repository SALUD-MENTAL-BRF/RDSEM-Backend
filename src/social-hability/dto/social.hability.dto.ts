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