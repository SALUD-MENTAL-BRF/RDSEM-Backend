import { ProvinceService } from "./provinces.service";
import { Controller,Get, Res, Req } from "@nestjs/common";
import { Request,Response } from "express";

@Controller('province')
export class ProvinceController{
    constructor(private provinceService: ProvinceService){};

    @Get('')
    async findAllProvinces(@Req() _request:Request,@Res() response: Response){
        try {
            response.status(200).json(await this.provinceService.findAll());
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to find all the provinces'
            });
        };
    };

};