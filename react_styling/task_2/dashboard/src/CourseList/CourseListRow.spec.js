import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('renders one columnheader with colspan 2 when isHeader is true and textSecondCell is null', () => {
    render(
        <table>
            <tbody>
                <CourseListRow
                    isHeader={true}
                    textFirstCell="Course"
                    textSecondCell={null}
                />
            </tbody>
        </table>
    );

    const header = screen.getByRole('columnheader');

    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('colspan', '2');
});

test('renders two th cells when isHeader is true and textSecondCell is not null', () => {
    render(
        <table>
        <tbody>
            <CourseListRow
            isHeader={true}
            textFirstCell="Course"
            textSecondCell="Credits"
            />
        </tbody>
        </table>
    );

    const headers = screen.getAllByRole('columnheader');

    expect(headers).toHaveLength(2);
});

test('renders two td cells within a tr when isHeader is false', () => {
    render(
        <table>
        <tbody>
            <CourseListRow
            isHeader={false}
            textFirstCell="Course"
            textSecondCell="Credits"
            />
        </tbody>
        </table>
    );

    const row = screen.getByRole('row');
    const cells = row.querySelectorAll('td');

    expect(row).toBeInTheDocument();
    expect(cells).toHaveLength(2);
})