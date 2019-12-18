import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class reward_punish extends BaseEntity {
    @PrimaryColumn({length: 10,nullable: false})
    rid: number;

    @Column({length: 2,nullable: false})
    type: string;
}