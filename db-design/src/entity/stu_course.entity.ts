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

    public static async FindByCid(cid: string):  Promise<stu_course[]> {
        const course_info: stu_course[] = await stu_course.find({cid: cid});
        return Promise.resolve(course_info);
    }

    public static async AssignCourse(cid : string, sid : string): Promise<{}> {
        var u = {cid : cid, sid : sid, score :0};
        let v = new stu_course();
        Object.assign(v, u);
        return await stu_course.save(v);
    }
}