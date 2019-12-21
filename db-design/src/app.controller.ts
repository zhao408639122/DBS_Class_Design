import { Controller, Get, Post, Body, Res, Req, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  LoginService: any;
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('log')
  public async login(@Req() req: Request, @Res() res: Response, @Body() user: {user_id : string, password: string, authority: string}) {
      return res
          .status(HttpStatus.OK)
          .send(user);
  }

}