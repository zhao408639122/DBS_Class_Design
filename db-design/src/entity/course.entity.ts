import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn, OneToMany, OneToOne, ManyToOne } from "typeorm";
import{ stu_course} from "./stu_course.entity"
import { AppError } from "src/common/error/AppError";
import { AppErrorTypeEnum } from "src/common/error/AppErrorTypeEnum";
@Entity()
export class course extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    cid: string;

    @Column({length: 10,nullable: false})
    cname: string;

    @Column({nullable: false})
    credit: number;

    @Column({length: 30,nullable: false})
    dname: string;

    @Column({length: 30})
    major: string;

    @Column({length: 30, nullable: false})
    teacher: string;

    @ManyToOne(type=>stu_course,courses=>courses.Course)
    courses: stu_course;

    public static async CreateCourse(Course: course) : Promise<course> {
        let u: course;
        u = await course.findOne({cid: Course.cid});
        if (u) { 
            throw new AppError(AppErrorTypeEnum.COURSE_EXISTS);
        } else {
            u = new course();
            Object.assign(u, Course);
            return await course.save(u);
        }
    }

    public static async FindByCid(cid: string): Promise<course> {
        var u: course = await course.findOne({cid: cid});
        if (!u) { 
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        } else return u;
    }
    //repus
    public static async findAll(): Promise<course[]> {
        const courses: course[] = await course.find();
        if (courses.length > 0) {
            return Promise.resolve(courses);
        } else {
            throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        }
    }

}