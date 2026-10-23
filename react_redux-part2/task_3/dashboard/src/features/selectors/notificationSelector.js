import { createSelector } from '@reduxjs/toolkit';

const selectNotifications = (state) => state.notifications.notifications;

export const getFilteredNotifications = createSelector(
    [
        selectNotifications,
        (state, filter) => filter,
    ],
    (notifications, filter) => {
        const unreadNotifications = notifications.filter(
            (notification) => notification.isRead !== true
        );

        if (filter === 'all') {
            return unreadNotifications;
        }

        return unreadNotifications.filter(
            (notification) => notification.type === filter
        );
    }
);
