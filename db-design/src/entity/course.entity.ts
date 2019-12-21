import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class course extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    cid: string;

    @Column({length: 10,nullable: false})
    cname: string;

    @Column({nullable: false})
    credit: number;

    @Column({length: 30,nullable: false})
    department: string;

    @Column({length: 30, nullable: false})
    teacher: string;
}