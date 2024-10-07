import { IsNotEmpty } from "class-validator";

export class CreateRecommendationDto{

    @IsNotEmpty({message:"El título es obligatorio."})
    title: string;

    @IsNotEmpty({message: "La descripción es obligarorio."})
    description: string;

    patientId: number;

}