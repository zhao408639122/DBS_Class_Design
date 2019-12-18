import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class student extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    sid: string;

    @PrimaryColumn({length: 20,nullable: false})
    rid: string;

    @Column()
    time: Date;

    @Column({length: 100,collation: 'LATIN1_SWEDISH_CI'})
    thing: string;
}