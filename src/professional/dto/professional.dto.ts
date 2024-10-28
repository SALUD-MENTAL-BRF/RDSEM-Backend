import { IsNotEmpty, IsString, IsNumber, IsISO8601, isString, isNotEmpty } from 'class-validator';

export class CreateProfessionalDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  title: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  firstname: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  lastname: string;

  @IsNotEmpty({ message: 'La especialización es obligatoria' })
  @IsString({ message: 'La especialización debe ser una cadena de texto' })
  specialization: string;

  @IsNotEmpty({ message: 'La matrícula es obligatoria' })
  @IsNumber({}, { message: 'La matrícula debe ser un número' })
  tuition: number;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsISO8601({}, { message: 'La fecha de nacimiento debe estar en un formato ISO 8601 válido' })
  birthdate: string;


  @IsNotEmpty({ message: 'El hospital es obligatorio' })
  @IsNumber({}, { message: 'El hospital debe ser un número' })
  hospitalId: number;
}


export class UpdateProfileProfessionalDto {

  description?: string;

  availability?: boolean;

  preference_communication?: string;


}