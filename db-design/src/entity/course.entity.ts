import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class course extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    cid: number;

    @Column({length: 10,nullable: false})
    cname: string;

    @Column({length:2,nullable: false})
    credit: number;
}