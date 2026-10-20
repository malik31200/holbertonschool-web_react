import reducer, { markNotificationAsRead } from '../notifications/notificationsSlice';

describe('notificationSlice', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
            notifications: [],
        });
    });

    test('should mark a notification as read', () => {
        const state = {
            notifications: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'Welcome' },
            ],
        };

        const newState = reducer(
            state,
            markNotificationAsRead({ id: 1 })
        );

        expect(newState.notifications).toEqual([
            { id: 2, message: 'Welcome' },
        ]);
    });
});
