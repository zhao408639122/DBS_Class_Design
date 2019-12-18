import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class stu_course extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    sid: string;

    @PrimaryColumn({length: 20,nullable: false})
    cid: string;

    @Column({nullable: false})
    score: number;
}