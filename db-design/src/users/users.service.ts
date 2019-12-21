import { Injectable } from '@nestjs/common';
import { student } from '../entity/student.entity';
import { getConnection, getRepository, createQueryBuilder } from 'typeorm';
import { Resolver, resolve } from 'dns';
import { rejects } from 'assert';
import { StdioNull } from 'child_process';
import { stu_course } from 'src/entity/stu_course.entity';

@Injectable()
export class UsersService {
    public async findAll(): Promise<student[]> {
        return await student.findAll();
    }
    
    public async CreateStu(user: student): Promise<student> {
        return await student.CreateStu(user);
    }

    public async FindBySid(sid:string): Promise<student> {
         return await student.FindBySid(sid);
    }   
    
    public async ModifyStudent(user: student): Promise<{}> {
        await getConnection()
            .createQueryBuilder()
            .update(student)
            .set({sname: user.sname, age: user.age, sex: user.sex, dname:user.dname, major:user.major, class:user.class })
            .where("sid = :sid", { sid: user.sid})
            .execute();
        return Promise.resolve;
    }
    
    public async DeleteStu(sid: string): Promise<{}> {
        let u = await student.FindBySid(sid);
        student.remove(u);
        let v: stu_course[] = await stu_course.FindBySid(sid);
        for (let i = 0; i < v.length; i++) {
            stu_course.remove(v[i]);
        }
        return Promise.resolve;
    }
}
