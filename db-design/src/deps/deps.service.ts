import { Injectable } from '@nestjs/common';
import { department } from 'src/entity/department.entity';
import { getRepository, getConnection } from 'typeorm';
import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';
import { AppError } from 'src/common/error/AppError';

@Injectable()
export class DepsService {
    public async FuzzyQuery(query: {pagenum: number, pagesize: number, query?: string})
    : Promise<{totalpage: number, pagenum: number, deps: department[]}> {
        const deps : department[] = await getRepository(department)
        .createQueryBuilder("department")
        .where("department.dname LIKE :param")
        .setParameters({
            param: '%' + query.query + '%'
        })
        .getMany();

        let list : department[] = [];
        let totalpage = deps.length;
        let pagenum = query.pagenum;
        let bias: number = (query.pagenum - 1) * query.pagesize;
        if (totalpage < bias || query.pagenum <= 0 || query.pagesize <= 0)
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        for (let i: number = 0; i < query.pagesize; ++i) {
            if (bias + i >= totalpage) break;
            list.push(deps[bias + i]);
        }
        return {totalpage, pagenum, deps: list};
    }

    public async CreateDepartment(deps: department): Promise<department> {
        return await department.CreateDepartment(deps);
    }

    public async FindByDname(dname: string): Promise<department> {
        return await department.FindByDname(dname);
    }

    public async MoidfyDepartment(Department: department, dname: string): Promise<{}> {
        await getConnection()
            .createQueryBuilder()
            .update(department)
            .set({major: Department.major, building: Department.building})
            .where("dname = :dname", {dname: dname})
            .execute();
        return Promise.resolve;
    }

    public async DeleteDepartment(dname: string): Promise<{}> {
        let u = await department.FindByDname(dname);
        department.remove(u);
        return Promise.resolve;
    }
}
