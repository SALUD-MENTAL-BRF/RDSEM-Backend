import { IsEmail, IsNotEmpty } from "class-validator"

export class userCreateDto {
    
    @IsNotEmpty({message: 'Name is required'})
    username: string;

    @IsEmail({}, {message: 'Invalid email'})
    email :string;

    @IsNotEmpty({message: 'Password is required'})
    password: string;

    @IsNotEmpty({message: 'Role is required'})
    role: string;
}   