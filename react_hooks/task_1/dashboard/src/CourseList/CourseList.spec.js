import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

test('renders 5 rows when it receives an array of courses', () => {
    const courses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 40 },
        { id: 3, name: 'React', credit: 60 },
    ];

    render(<CourseList courses={courses} />);

    expect(screen.getAllByRole('row')).toHaveLength(5);
});

test('renders 1 row when it receives an empty array', () => {
    render(<CourseList courses={[]} />);
    expect(screen.getAllByRole('row')).toHaveLength(1);
});
