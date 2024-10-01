import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { LocalityService } from "./locality.service";
import { Request, Response } from "express";



@Controller('locality')
export class LocalityController{

    constructor(private localityService:LocalityService){}

    @Get(':provinceId')
    async findLocalityByProvinceId(@Req() _request: Request,@Res() response: Response, @Param('provinceId') provinceId: string){
        try {
            response.status(200).json(await this.localityService.findAllByProvinceId(Number(provinceId)))
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to find all the localities for province'
            })
        }
    }


}