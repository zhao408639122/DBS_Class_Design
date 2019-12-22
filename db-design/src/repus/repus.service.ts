import { Injectable } from '@nestjs/common';
import { getRepository, getConnection } from 'typeorm';
import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';
import { AppError } from 'src/common/error/AppError';
import { reward_punish } from 'src/entity/reward_punish.entity';


@Injectable()
export class RepusService {
    public async FuzzyQuery(query: {pagenum: number, pagesize: number, query?: string})
    : Promise<{totalpage: number, pagenum: number, repus: reward_punish[]}> {
        const repus: reward_punish[] = await getRepository(reward_punish)
        .createQueryBuilder("reward_punish")
        .where("reward_punish.rid LIKE :param")
        .setParameters({
            param: '%' + query.query + '%'
        })
        .getMany();

        let list: reward_punish[] = [];
        let totalpage = repus.length;
        let pagenum = query.pagenum;
        let bias: number = (query.pagenum - 1) * query.pagesize;
        if (totalpage < bias || query.pagenum <= 0 || query.pagesize <= 0)
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        for (let i = 0; i < query.pagesize; ++i) {
            if (bias + i >= totalpage) break;
            list.push(repus[bias + i]);
        }
        return {totalpage, pagenum, repus: list};
    }

    public async CreateRepus(repus: reward_punish): Promise<reward_punish> {
        return await reward_punish.CreateRepus(repus);
    }

    public async FindByRid(rid: string): Promise<reward_punish> {
        return await reward_punish.FindByRid(rid);
    }

    public async ModifyRepus(repus: reward_punish, rid: string): Promise<{}> {
        await getConnection()
            .createQueryBuilder()
            .update(reward_punish)
            .set({type: repus.type})
            .where("rid = :rid", {rid: rid})
            .execute();
        return Promise.resolve;
    }
    
    public async DeleteRepus(rid: string): Promise<{}> {
        let u = await reward_punish.FindByRid(rid);
        reward_punish.remove(u);
        return Promise.resolve;
    }
}
