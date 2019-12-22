import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn, ManyToOne, OneToOne } from "typeorm";
import{ student} from "./student.entity"
import{ course} from "./course.entity"
@Entity()
export class stu_course extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    sid: string;

    @PrimaryColumn({length: 20,nullable: false})
    cid: string;

    @Column({nullable: false})
    score: number;

    @ManyToOne(type=>student,Student=>Student.stuCourses)
    Student:student;

    @OneToOne(type=>course,Course=>Course.courses)
    Course:course;

    public static async FindBySid(qsid: string): Promise<stu_course[]> {
        const course_info: stu_course[] = await stu_course.find({sid: qsid});
        return Promise.resolve(course_info);
    }
}