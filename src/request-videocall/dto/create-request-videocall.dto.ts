import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class CreateRequestVideocallDto {
    @IsNotEmpty({ message: 'La razón de la solicitud es obligatoria' })
    @IsString({ message: 'La razón de la solicitud debe ser una cadena de texto' })
    motivo: string;

    @IsNotEmpty({ message: 'La fecha de la reunión es obligatoria' })
    fechaSolicitud: Date;

    @IsNotEmpty({ message: 'La hora de la reunión es obligatoria' })
    horaSolicitud: string; 
}
