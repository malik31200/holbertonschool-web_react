namespace Subjects {
    export class Subject {
        teacher: Teacher | undefined;

        setTeacher(teacher: Teacher): void {
            this.teacher = teacher;
        }
    }
}
