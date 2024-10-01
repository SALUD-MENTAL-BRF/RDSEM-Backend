import { IsInt, IsNotEmpty, IsString, IsOptional, IsDateString, IsPhoneNumber } from 'class-validator';

export class CreateRequestPatientDto {
  @IsNotEmpty({ message: 'El nombre completo es obligatorio.' })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto.' })
  fullName: string;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria.' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe estar en formato válido (YYYY-MM-DD).' })
  date_birth: string;

  @IsNotEmpty({ message: 'El género es obligatorio.' })
  @IsString({ message: 'El género debe ser una cadena de texto.' })
  genre: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  address: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  telephone: string;

  @IsNotEmpty({ message: 'El nombre de contacto de emergencia es obligatorio.' })
  @IsString({ message: 'El nombre de contacto de emergencia debe ser una cadena de texto.' })
  contactEmergencyName: string;

  @IsNotEmpty({ message: 'La relación con el contacto de emergencia es obligatoria.' })
  @IsString({ message: 'La relación con el contacto de emergencia debe ser una cadena de texto.' })
  contactEmergencyRelation: string;

  @IsNotEmpty({ message: 'El teléfono del contacto de emergencia es obligatorio.' })
  contactEmergencyTelephone: string;

  @IsNotEmpty({ message: 'El motivo de consulta es obligatorio.' })
  @IsString({ message: 'El motivo de consulta debe ser una cadena de texto.' })
  reasonConsultation: string;

  @IsNotEmpty({ message: 'La descripción del problema es obligatoria.' })
  @IsString({ message: 'La descripción del problema debe ser una cadena de texto.' })
  descriptionProblem: string;

  @IsOptional()
  @IsString({ message: 'Los diagnósticos previos deben ser una cadena de texto.' })
  diagnosesPrevious?: string;

  @IsOptional()
  @IsString({ message: 'Los tratamientos previos deben ser una cadena de texto.' })
  treatmentsPrevious?: string;

  @IsOptional()
  @IsString({ message: 'Las hospitalizaciones previas deben ser una cadena de texto.' })
  hospitalizationsPrevious?: string;

  @IsOptional()
  @IsString({ message: 'La medicación actual debe ser una cadena de texto.' })
  meciationCurrent?: string;

  @IsOptional()
  @IsString({ message: 'El historial de consumo debe ser una cadena de texto.' })
  historyConsumption?: string;

  @IsOptional()
  @IsString({ message: 'El historial de enfermedades debe ser una cadena de texto.' })
  historyDiseases?: string;

  @IsOptional()
  @IsString({ message: 'La historia familiar debe ser una cadena de texto.' })
  histoyFamily?: string;

  // userId?: number

  // professionalId?:number
}
