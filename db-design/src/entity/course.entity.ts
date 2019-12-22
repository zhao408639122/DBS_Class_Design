import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn, OneToMany, OneToOne } from "typeorm";
import{ stu_course} from "./stu_course.entity"
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

    @OneToOne(type=>stu_course,courses=>courses.Course)
    courses: stu_course;
}