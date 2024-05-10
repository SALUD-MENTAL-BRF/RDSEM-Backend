import { IsEmpty, MaxLength,IsString } from "class-validator"

export class userCreateDto {
    
    @IsEmpty()
    email :string
}