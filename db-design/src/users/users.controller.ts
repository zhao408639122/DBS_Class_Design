import { Put, Param, Query, Controller, Body, Res, Post, HttpStatus, Get, Req, Delete } from '@nestjs/common';
import { student } from '../entity/student.entity';
import * as session from 'express-session';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Get()
    public async GetStudnets(@Res() res :Response, @Query() query:{pagenum: number, pagesize: number, query?: string}) : Promise<{}>{
        let stu: any;
        if (query === undefined){
            stu = await this.usersService.FuzzyQuery({query: "", pagenum: query.pagenum, pagesize: query.pagesize})
        } else {
            stu = await this.usersService.FuzzyQuery(query);
        }
        return res
                .status(HttpStatus.OK)
                .send(stu);
    }

    @Get('/all')
    public async GetAllStudent(@Res() res: Response, @Query() query: {pagenum: number, pagesize: number}): Promise<{}>{
        const AllStudent = await this.usersService.FuzzyQuery({query: "", pagenum: query.pagenum, pagesize: query.pagesize});
        return res
                .status(HttpStatus.OK)
                .send({});
    }

    @Post()
    public async CreateStu(@Body() stu: student, @Res() res: Response, @Req() _req: Request): Promise<{}>{
        await this.usersService.CreateStu(stu);
        return res
                .status(HttpStatus.CREATED).send();
    }

    // @Get(':sidQuery')
    // public async FindBySid(@Query() query: {query: string, pagenum: number, pagesize: number}): Promise<student[]> {
    //     return await this.usersService.findAll();
    // }

    @Get(':id')
    public async FindBySid(@Param('id') sid: string): Promise<student> {
        return await this.usersService.FindBySid(sid);
    } 
    
    @Put(':id')
    public async ModifyStudent(@Body() stu: student, @Param('id') sid: string, @Res() res: Response): Promise<{}> {
        await this.usersService.ModifyStudent(stu, sid);
        return res
                .status(HttpStatus.OK).send();
    }

    @Delete(':id')
    public async DeleteStu(@Param('id') sid: string, @Res() res: Response): Promise<{}> {
        await this.usersService.DeleteStu(sid);
        return res
                .status(HttpStatus.OK).send();
    }

}
