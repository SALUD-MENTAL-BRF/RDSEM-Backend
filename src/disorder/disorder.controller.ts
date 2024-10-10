import { Controller, Get, Req, Res } from "@nestjs/common";
import { DisorderService } from "./disorder.service";
import { Request, Response } from "express";

@Controller('disorder')
export class DisorderController {
    constructor(private disorderService: DisorderService){};

    @Get('')
    async findAllDisorder(@Req() _request:Request, @Res() response: Response){
        try {
            response.status(200).json(await this.disorderService.findAll());
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to find the disorders'
            })
        };
    };

};