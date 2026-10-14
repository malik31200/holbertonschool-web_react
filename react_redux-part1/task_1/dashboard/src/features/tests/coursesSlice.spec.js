import reducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';

describe('coursesSlice', () => {
    test('should  return the initial test', () => {
        expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
            courses: [],
        });
    });

    test('should fetch courses correctly', () => {
        const courses = [
            { id: 1, name: 'E56', credit: 60 },
            { id: 2, name: 'Webpack', credit: 20 },
            { id: 3, name: 'React', credit: 50 },
        ];

        const newState = reducer(
            { courses: [] },
            {
                type: fetchCourses.fulfilled.type,
                payload: courses,
            }
        );

        expect(newState.courses).toEqual(courses);
    });

    test('should reset courses when the user is logout', () => {
        const state = {
            courses: [
                { id: 1, name: 'E56', credit: 60 },
                { id: 2, name: 'Webpack', credit: 20 },
            ],
        };

        const newState = reducer(state, logout());

        expect(newState).toEqual({
            courses: [],
        });
    });
});
