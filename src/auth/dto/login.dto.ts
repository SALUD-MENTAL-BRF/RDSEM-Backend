import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: "Por favor, introduce un correo electrónico válido" })
  email: string;

  @IsString({ message: "La contraseña debe ser una cadena de texto" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @IsNotEmpty({ message: "La contraseña no puede estar vacía" })
  @Transform(({ value }) => value.trim())
  password: string;
}
