import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class stu_course extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    sid: number;

    @PrimaryColumn({length: 20,nullable: false})
    cid: number;

    @Column({length:3,nullable: false})
    score: number;
}