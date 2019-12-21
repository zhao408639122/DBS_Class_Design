import{ BaseEntity, PrimaryGeneratedColumn, Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class stu_course extends BaseEntity {
    @PrimaryColumn({length: 20,nullable: false})
    sid: string;

    @PrimaryColumn({length: 20,nullable: false})
    cid: string;

    @Column({nullable: false})
    score: number;

    public static async FindBySid(qsid: string): Promise<stu_course[]> {
        const course_info: stu_course[] = await stu_course.find({sid: qsid});
        return Promise.resolve(course_info);
    }
}