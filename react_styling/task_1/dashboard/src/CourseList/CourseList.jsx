import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
    return (
        <div className='course-list-container'>
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
        </div>
    );
}

export default WithLogging(CourseList);
