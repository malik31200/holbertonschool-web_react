import reducer, {
    markNotificationAsRead,
    showDrawer,
    hideDrawer,
    fetchNotifications,
} from '../notifications/notificationsSlice';

describe('notificationSlice', () => {
    test('should  return the initial state', () => {
        expect(reducer(undefined, { type: 'UNKNOWN_ACTION' }))  .toEqual({
            notifications: [],
            displayDrawer: true,
        });
    });

    test('should  mark a notification as read', () => {
        const state = {
            notifications: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'Welcome' },
            ],
            displayDrawer: true,
        };

        const newState = reducer(
            state,
            markNotificationAsRead({ id: 1 })
        );

        expect(newState.notifications).toEqual([
            { id: 2, message: 'Welcome' },
        ]);
    });

    test('should show the drawer', () => {
        const state = {
            notifications: [],
            displayDrawer: false,
        };

        const newState = reducer(state, showDrawer());

        expect(newState.displayDrawer).toBe(true);
        });

    test('should hide the drawer', () => {
        const state = {
            notifications: [],
            displayDrawer: true,
        };

        const newState = reducer(state, hideDrawer());

        expect(newState.displayDrawer).toBe(false);
    });
});
