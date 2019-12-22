import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
import { AppErrorTypeEnum } from "src/common/error/AppErrorTypeEnum";
import { AppError } from "src/common/error/AppError";
@Entity()
export class reward_punish extends BaseEntity {
    @PrimaryColumn({length: 10,nullable: false})
    rid: string;

    @Column({length: 2,nullable: false})
    type: string;

    public static async CreateRepus(repus: reward_punish) : Promise<reward_punish> {
        let u: reward_punish;
        u = await reward_punish.findOne({rid: repus.rid});
        if (u) {
            throw new AppError(AppErrorTypeEnum.USER_EXISTS);
        } else {
            u = new reward_punish();
            Object.assign(u, repus);
            return await reward_punish.save(u);
        }
    }

    public static async FindByRid(rid: string): Promise<reward_punish> {
        var u: reward_punish = await reward_punish.findOne({rid: rid});
        if (!u) {
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        } else return u;
    }
}