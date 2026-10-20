import reducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
    const initialState = {
        user: {
            email: '',
            password: '',
        },
        isLoggedIn: false,
    };

    test('returns the correct initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    test('updates the states when login is dispatched', () => {
        const credentials = {
            email: 'malik@gmail.com',
            password: 'Motdepasse123',
        };

        const state = reducer(initialState, login(credentials));

        expect(state.user.email).toBe(credentials.email);
        expect(state.user.password).toBe(credentials.password);
        expect(state.isLoggedIn).toBe(true);
    });

    test('resets the state when logout is dispatched', () => {
        const loggedInState = {
            user: { email: 'test@example.com',
            password: 'password123',
            },
            isLoggedIn: true,
        };
        
        const state = reducer(loggedInState, logout());
        
        expect(state.user.email).toBe('');
        expect(state.user.password).toBe('');
        expect(state.isLoggedIn).toBe(false);
    });
})