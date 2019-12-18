import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from '../common/error/AppError';
import { AppErrorTypeEnum } from '../common/error/AppErrorTypeEnum'
import { from } from 'rxjs';
import { user_tb } from './user_tb.entity';
import { CreateUserDto } from './model/CreateUserDto';
import { Resolver } from 'dns';
@Injectable()
export class LoginService {
    public async findAll(): Promise<user_tb[]> {
        return await user_tb.findAll();
    }
    
    public async createUser(user: CreateUserDto): Promise<user_tb> {
        return await user_tb.createUser(user);
    }

    public async login(user: {user_id: string, password:string, authority: string}) : Promise<{user_id : string, password : string, authority : string}> {
        var res = await user_tb.authenticateUser(user);
        return res;
    }

    
}
