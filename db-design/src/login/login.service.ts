import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from '../common/error/AppError';
import { AppErrorTypeEnum } from '../common/error/AppErrorTypeEnum'
import { from } from 'rxjs';
import { user_tb } from './user_tb.entity';
import { CreateUserDto } from './model/CreateUserDto';
@Injectable()
export class LoginService {
    public async findAll(): Promise<user_tb[]> {
        return await user_tb.findAll();
    }
    public async createUser(user: CreateUserDto): Promise<user_tb> {
        return await user_tb.createUser(user);
    }
    
}
