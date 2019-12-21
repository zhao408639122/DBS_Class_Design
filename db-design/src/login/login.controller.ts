import { Controller, Body, Res, Session, Post, HttpStatus, Get, Req } from '@nestjs/common';
import { user_tb } from './user_tb.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { format } from 'path';
import { Request, Response} from 'express';
import { LoginService } from './login.service';
import { get } from 'http';
import * as session from 'express-session';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './model/CreateUserDto';
@Controller('login')
export class LoginController {
    constructor(private readonly LoginService: LoginService) {}

    @Get()//Get list of All users
    @ApiResponse({ status: 200, description: 'User Found' })
    @ApiResponse({ status: 404, description: 'No User Found' })
    public async getAllUsers(@Req() req: Request, @Res() res:Response){
        const users: user_tb[] = await this.LoginService.findAll();
        return res
                .status(HttpStatus.OK)
                .send(users);

    }

    @Post('/register')// Create user  
    public async create(@Body() createUser: CreateUserDto, @Res() res:Response, @Req() req:Request) {
        await this.LoginService.createUser(createUser);
        return res.status(HttpStatus.CREATED).send();
    }

    @Post('/login')
    public async login(@Req() req: Request, @Res() res: Response, @Body() user: {user_id : string, password: string}) {
        var u: {user_id : string, password : string, authority: string} = await this.LoginService.login(user);
        req.session.user_id = user.user_id;
        req.session.authority = u.authority;
        return res
            .status(HttpStatus.OK)
            .send(u);
    }
}
