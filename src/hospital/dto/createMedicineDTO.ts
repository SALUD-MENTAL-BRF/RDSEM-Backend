import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class createMedicine {

  @IsNotEmpty({ message: 'El nombre de la medicina es obligatorio' })
  @IsString({ message: 'El nombre de la medicina debe ser una cadena de caracteres' })
  name: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de caracteres' })
  description: string;

  @IsNotEmpty({ message: 'El tipo es obligatorio' }) 
  @IsString({ message: 'el tipo debe ser una cadena de caracteres' })
  type: string;

  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  quantity: number;

}