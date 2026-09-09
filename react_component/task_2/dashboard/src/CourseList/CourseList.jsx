import CourseListRow from './CourseListRow';
import './CourseList.css';

function CourseList({ courses = [] }) {
    return (
        <table id="CourseList">
            {courses.length === 0 ? (
                <tbody>
                    <CourseListRow
                        textFirstCell="No course available yet"
                    />
                </tbody>
            ) : (
                <>
                    <thead>
                        <CourseListRow
                            textFirstCell="Available courses"
                            isHeader={true}
                        />
                        <CourseListRow
                            textFirstCell="Course name"
                            textSecondCell="Credit"
                            isHeader={true}
                        />
                    </thead>

                    <tbody>
                        {courses.map((course) => (
                            <CourseListRow
                                key={course.id}
                                textFirstCell={course.name}
                                textSecondCell={course.credit}
                            />
                        ))}
                    </tbody>
                </>
            )}
        </table>
    );
}

export default CourseList;
