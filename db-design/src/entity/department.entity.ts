import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class department extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    dname: string;

    @Column({length: 20,nullable: false})
    major: string;

    @Column({length: 20,nullable: false})
    building: string;
}