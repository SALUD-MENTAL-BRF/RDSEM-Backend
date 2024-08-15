import { IsNotEmpty,isString,isNumber } from "class-validator";

export class createReq_Professional {

    @IsNotEmpty({message: 'El nombre es requerido'})
    firstname: string;

    lastname: string
    title: string
    specialization: string
    tuition: number
}