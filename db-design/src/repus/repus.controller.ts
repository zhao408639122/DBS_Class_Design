import { Controller, Get, Query, Res, HttpStatus, Req, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { RepusService } from './repus.service';
import { reward_punish } from 'src/entity/reward_punish.entity';

@Controller('repus')
export class RepusController {
    constructor(private repusService: RepusService) {}
    
    @Get() 
    public async GetRepus(@Res() res: Response, @Query() query: {pagenum: number, pagesize: number, query?: string}) : Promise<{}> {
        const repus = await this.repusService.FuzzyQuery(query);
        return res
                .status(HttpStatus.OK)
                .send(repus);
    }

    @Post()
    public async CreateRepus(@Body() repus: reward_punish, @Res() res: Response, @Req() req: Request) : Promise<{}> {
        await this.repusService.CreateRepus(repus);
        return res
                .status(HttpStatus.CREATED).send();
    }

    @Get(':id')
    public async FindByRid(@Param('id') rid: string) : Promise<reward_punish> {
        return await this.repusService.FindByRid(rid);
    }

    @Put(':id')
    public async ModifyRepus(@Body() repus: reward_punish, @Param('id') rid: string, @Res() res: Response) : Promise<{}> {
        await this.repusService.ModifyRepus(repus, rid);
        return res
                .status(HttpStatus.OK).send();
    }

    @Delete(':id')
    public async DeleteRepus(@Param('id') rid: string, @Res() res: Response) : Promise<{}> {
        await this.repusService.DeleteRepus(rid);
        return res
                .status(HttpStatus.OK).send();
    }
}
