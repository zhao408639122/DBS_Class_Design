import { Put, Param, Query, Controller, Body, Res, Post, HttpStatus, Get, Req, Delete } from '@nestjs/common';
import { student } from '../entity/student.entity';
import * as session from 'express-session';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Get()
    public async GetStudnets(@Res() res :Response, @Query() query:{query: string, pagenum: number, pagesize: number}) : Promise<{}>{
        const stu = await this.usersService.FuzzyQuery(query);
        return res
                .status(HttpStatus.OK)
                .send(stu);
    }

    @Get('/all')
    public async GetAllStudent(@Req() _req: Request, @Res() res: Response) {
        const AllStudent: student[] = await this.usersService.findAll();
        let StudentList: student[];
        
        return res
                .status(HttpStatus.OK)
                .send(AllStudent);
    }

    @Post()
    public async CreateStu(@Body() stu: student, @Res() res: Response, @Req() _req: Request): Promise<{}>{
        await this.usersService.CreateStu(stu);
        return res
                .status(HttpStatus.OK);
    }

    // @Get(':sidQuery')
    // public async FindBySid(@Query() query: {query: string, pagenum: number, pagesize: number}): Promise<student[]> {
    //     return await this.usersService.findAll();
    // }

    @Get(':id')
    public async FindBySid(@Param('sidinfo') sid: string): Promise<student> {
        return await this.usersService.FindBySid(sid);
    } 
    
    @Put(':id')
    public async ModifyStudent(@Body() stu: student, @Param() _sid: string, @Res() res: Response): Promise<{}> {
        await this.usersService.ModifyStudent(stu);
        return res
                .status(HttpStatus.OK);
    }

    @Delete(':id')
    public async DeleteStu(@Param() sid: string, @Res() res: Response): Promise<{}> {
        await this.usersService.DeleteStu(sid);
        return res
                .status(HttpStatus.OK);
    }

}
