import { Injectable } from '@nestjs/common';
import { course } from 'src/entity/course.entity';
import { AppError } from 'src/common/error/AppError';
import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';
import { getRepository, getConnection } from 'typeorm';
import { stu_course } from 'src/entity/stu_course.entity';

@Injectable()
export class CourseService {
    public async findAll(): Promise<course[]> {
        return await course.findAll();
    }

    public async FuzzyQuery(query: {pagenum: number, pagesize: number, query?: string})
     : Promise<{totalpage: number, pagenum: number, courses: course[]}> {
        const cour : course[] = await getRepository(course)
        .createQueryBuilder("course")
        .where("course.cid LIKE :param")
        .setParameters({
            param: '%' + query.query + '%'
        })
        .getMany();

        let list: course[] = [];
        let totalpage = cour.length;
        let pagenum = query.pagenum;
        let bias: number = (query.pagenum - 1) * query.pagesize;
        if (totalpage < bias || query.pagenum <= 0 || query.pagesize <= 0) 
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);

        for (let i:number = 0; i < query.pagesize; i++) {
            if (bias + i >= totalpage) break;
            list.push(cour[bias + i]);
        }
        return {totalpage, pagenum, courses: list};
    }

    public async CreateCourse(Course: course): Promise<course> {
        return await course.CreateCourse(Course);
    }

    public async FindByCid(cid: string): Promise<course> {
        return await course.FindByCid(cid);
    }

    public async ModifyCourse(Course: course, cid: string): Promise<{}> {
        await getConnection()
            .createQueryBuilder()
            .update(course)
            .set({cname: Course.cname, credit: Course.credit, dname: Course.dname, major: Course.major, teacher: Course.teacher})
            .where("cid = :cid", {cid: cid})
            .execute();
        return Promise.resolve;
    }

    public async DeleteCourse(cid: string): Promise<{}> {
        let u = await course.FindByCid(cid);
        course.remove(u);
        let v: stu_course[] = await stu_course.FindByCid(cid);
        for (let i = 0; i < v.length; i++) {
            stu_course.remove(v[i]);
        }
        return Promise.resolve;
    }
}
