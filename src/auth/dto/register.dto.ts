import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString({ message: 'El nombre de usuario debe ser una cadena de caracteres' })
  @MinLength(1, { message: 'El nombre de usuario no puede estar vacío' })
  username: string;

  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @Transform(({ value }) => value.trim())
  password: string;
}
