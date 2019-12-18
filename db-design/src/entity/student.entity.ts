import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class student extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    sid: string;

    @Column({length: 10,nullable: false})
    sname: string;

    @Column({nullable: false})
    age: number;

    @Column({length: 2,nullable: false})
    sex: string;

    @Column({length: 20,nullable: false})
    dname: string;

    @Column({length: 20,nullable: false})
    major: string;

    @Column({length: 10,nullable: false})
    class: string;
}