import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    
    @IsNotEmpty({message: 'Name is required'})
    name?: string;

    @IsString()
    username?: string;

    @IsEmail({}, {message: 'Invalid email'})
    email :string;

    @IsNotEmpty({message: 'Password is required'})
    password?: string;

    @IsNotEmpty({message: 'Role is required'})
    roleId?: number;

    @IsOptional()
    @IsString()
    googleId?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}