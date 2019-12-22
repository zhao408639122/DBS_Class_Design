import { Controller, Get, Query, Res, HttpStatus, Req, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DepsService } from './deps.service';
import { Request, Response } from 'express';
import { department } from 'src/entity/department.entity';
@Controller('deps')
export class DepsController {
    constructor(private depsService: DepsService) {}

    @Get()
    public async GetDeps(@Res() res: Response, @Query() query: {pagenum: number, pagesize: number, query?: string}) : Promise<{}> {
        const deps = await this.depsService.FuzzyQuery(query);
        return res
                .status(HttpStatus.OK)
                .send(deps);
    }

    @Post()
    public async CreateDepartment(@Body() deps: department, @Res() res: Response, @Req() req : Request) : Promise<{}> {
        await this.depsService.CreateDepartment(deps);
        return res
                .status(HttpStatus.CREATED).send();
    }

    @Get(':id')
    public async FindByDname(@Param('id') dname: string) : Promise<department> {
        return await this.depsService.FindByDname(dname);
    }

    @Put(':id')
    public async MoidfyDepartment(@Body() deps: department, @Param('id') dname: string, @Res() res: Response) : Promise<{}> {
        await this.depsService.MoidfyDepartment(deps, dname);
        return res
                .status(HttpStatus.OK).send();
    }

    @Delete(':id')
    public async DeleteDepartment(@Param('id') dname: string, @Res() res: Response) : Promise<{}> {
        await this.depsService.DeleteDepartment(dname);
        return res
                .status(HttpStatus.OK).send();
    }
}
