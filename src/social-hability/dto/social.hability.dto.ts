import {IsNotEmpty} from 'class-validator'


export class createSocialHabilitySettingDto {

    @IsNotEmpty({message: 'No se seleccionó la edad'})
    age: string

    @IsNotEmpty({message: 'No se seleccionó un género'})
    genre: string

    @IsNotEmpty({message: 'No se seleccionó la complejidad'})
    complexity: string

    professionalid: number;

    patientId: number;
};