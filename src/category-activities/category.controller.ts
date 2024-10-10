import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { CategoryActivitiesService } from "./category.service";
import { Response,Request } from "express";

@Controller('category')
export class CategoryActivitiesController {
    constructor(private categoryActivitiesService: CategoryActivitiesService){};

    @Get(':disorderId')
    async findAllCategoryByDisorder(@Req() _request:Request, @Res() response: Response, @Param('disorderId') disorderId: string){
        try {
            response.status(200).json(await this.categoryActivitiesService.findByDisorder(Number(disorderId)));
        } catch (error) {
            console.log(error);
            response.status(500).json({
                msg: 'Error to find all categories by disorder'
            })
        }
    };

}