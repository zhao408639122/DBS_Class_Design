import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import * as crypto from 'crypto';
import{ ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import{ asap } from "rxjs/internal/scheduler/asap";
import{ Repository } from 'typeorm';
import{ AppError } from '../common/error/AppError';
import{ AppErrorTypeEnum } from '../common/error/AppErrorTypeEnum';
import{ CreateUserDto } from '../login/model/CreateUserDto';
@Entity()
export class user_tb extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 30})
    user_id: string;

    @Column({length: 30})
    authority: string;

    @Column({
        length: 250,
        select: false,
        name: 'password'
    })
    password_hash: string;

    set password(password: string) {
        const passHash = crypto.createHmac('sha256', password).digest('hex');
        this.password_hash = passHash;
    }
    
    public static async findAll(): Promise<user_tb[]> {
        const users: user_tb[] = await user_tb.find();
        if (users.length > 0) {
            return Promise.resolve(users);
        } else {
            throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        }
    }

    public static async createUser(user: CreateUserDto) : Promise<user_tb> {
        let u: user_tb;
        u = await user_tb.findOne({user_id: user.user_id});
        if (u) {
            throw new AppError(AppErrorTypeEnum.USER_EXISTS);
        } else {
            u = new user_tb();
            Object.assign(u, user);
            return await user_tb.save(u);
        }
    }
    public static async authenticateUser(user: {user_id: string, password: string}) :Promise<user_tb> {
        let u: user_tb;
        try{
            u = await user_tb.findOne({
                select: ['authority', 'user_id', 'password_hash'],
                where:  {user_id: user.user_id}
            });
        } catch (err) {
            throw new AppError(AppErrorTypeEnum.WRONG_PASSWORD);
        }
        const passHash = crypto.createHmac('sha256', user.password).digest('hex');
        if (u.password_hash == passHash) {
            delete u.password_hash;
            return u;
        }
    }

}