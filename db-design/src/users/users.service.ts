import { Injectable } from '@nestjs/common';
import { student } from '../entity/student.entity';
import { getConnection, getRepository, createQueryBuilder } from 'typeorm';
import { Resolver, resolve } from 'dns';
import { rejects } from 'assert';
import { StdioNull } from 'child_process';
import { stu_course } from 'src/entity/stu_course.entity';
import { concat } from 'rxjs';
import { AppError } from 'src/common/error/AppError';
import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';

@Injectable()
export class UsersService {
    public async findAll(): Promise<student[]> {
        return await student.findAll();
    }
    
    public async FuzzyQuery(query : {query: string, pagenum: number, pagesize: number}) : Promise<{totalpage: number, pagenum: number, user: student[]}> {
        const stu: student[] = await getRepository(student)
        .createQueryBuilder("student")
        .where("student.sid LIKE :param")
        .setParameters({
            param: '%'+ query.query +'%'
//thestring是你读入的字符串
        })
        .getMany();
        let user: student[] = [];
        let totalpage = stu.length;
        let pagenum = query.pagenum;
        let bias: number = (query.pagenum - 1) * query.pagesize;
        if (totalpage < bias || query.pagenum <= 0 || query.pagesize <= 0) throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        
        for (let i:number = 0; i < query.pagesize; i++ ){
            if (bias + i >= totalpage) break;
            user.push(stu[bias + i]);
            // user[i] = stu[bias + i];
        }
        return {totalpage, pagenum, user};
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
