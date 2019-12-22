import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { AppError } from "../common/error/AppError";
import { AppErrorTypeEnum } from "../common/error/AppErrorTypeEnum";
import {stu_course} from "./stu_course.entity"

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

    @OneToMany(type=>stu_course,stuCourse=>stuCourse.Student)
    stuCourses: stu_course[];

    public static async CreateStu(user: student) : Promise<student> {
        let u: student;
        u = await student.findOne({sid: user.sid});
        if (u) {
            throw new AppError(AppErrorTypeEnum.USER_EXISTS);
        } else {
            u = new student();
            Object.assign(u, user);
            return await student.save(u);
        }
    }

    public static async FindBySid(sid: string): Promise<student> {
        var u: student = await student.findOne({sid: sid});
        if (!u) {
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        } else return u;
    }
    
    public static async findAll(): Promise<student[]> {
        const students: student[] = await student.find();
        if (students.length > 0) {
            return Promise.resolve(students);
        } else {
            throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        }
    }
    
}