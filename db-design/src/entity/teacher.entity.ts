import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class teacher extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    tid: number;

    @Column({length: 20,nullable: false})
    tname: string;

    // @Column({nullable: false})
    // age: number;

    // @Column({length: 2,nullable: false})
    // sex: string;

    @Column({length: 20,nullable: false})
    dname: string;
}