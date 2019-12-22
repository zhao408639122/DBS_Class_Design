import { Controller, Get, Query, Res, HttpStatus, Req, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { Request, Response } from 'express';
import { course } from 'src/entity/course.entity';

@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get()
    public async GetCourse(@Res() res: Response, @Query() query: {pagenum: number, pagesize: number, query?: string}) : Promise<{}> {
        const cour = await this.courseService.FuzzyQuery(query);
        return res
                .status(HttpStatus.OK)
                .send(cour);
    }
    
    @Post()
    public async CreateCourse(@Body() cour: course, @Res() res: Response, @Req() req: Request): Promise<{}> {
        await this.courseService.CreateCourse(cour);
        return res
                .status(HttpStatus.CREATED).send();
    }

    @Get(':id')
    public async FindByCid(@Param('id') cid: string): Promise<course> {
        return await this.courseService.FindByCid(cid);
    }

    @Put(':id')
    public async ModifyCourse(@Body() cour: course, @Param('id') cid: string, @Res() res: Response): Promise<{}> {
        await this.courseService.ModifyCourse(cour, cid);
        return res
                .status(HttpStatus.OK).send();
    }
    
    @Delete(':id')
    public async DeleteCourse(@Param('id') cid: string, @Res() res: Response): Promise<{}> {
        await this.courseService.DeleteCourse(cid);
        return res
                .status(HttpStatus.OK).send();
    }

    @Get('/student/:id')
    public async QueryBySid(@Param('id') sid: string): Promise<course[]> {
        return this.courseService.QueryBySid(sid);
    }
}
