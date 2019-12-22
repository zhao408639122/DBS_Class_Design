import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
import { AppError } from "src/common/error/AppError";
import { AppErrorTypeEnum } from "src/common/error/AppErrorTypeEnum";
@Entity()
export class department extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    dname: string;

    @Column({length: 20,nullable: false})
    major: string;

    @Column({length: 20,nullable: false})
    building: string;

    public static async CreateDepartment(Department: department) : Promise<department> {
        let u : department;
        u = await department.findOne({dname: Department.dname});
        if (u) {
            throw new AppError(AppErrorTypeEnum.USER_EXISTS);
        } else {
            u = new department();
            Object.assign(u, Department);
            return await department.save(u);
        }
    }

    public static async FindByDname(dname: string): Promise<department> {
        var u : department = await department.findOne({dname: dname});
        if (!u) {
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        } else return u;
    }
}