import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

const initialState = {
    notifications: [],
    displayDrawer: true,
};

const API_BASE_URL = 'http://localhost:5173';

const ENDPOINTS = {
    notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const response = await axios.get(ENDPOINTS.notifications);

        const data = response.data.notifications;

        return data.map((notification) => {
            if (notification.id === 3) {
                return {
                    ...notification,
                    html: {
                        __html:
                            getLatestNotification(),
                    },
                };
            }

            return notification;
        });
    }
);

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        markNotificationAsRead: (state, action) => {
            const id = action.payload;

            console.log(id);

            state.notifications = state.notifications.filter(
                (notification) => notification.id !== id
            );
        },

        showDrawer: (state) => {
            state.displayDrawer = true;
        },

        hideDrawer: (state) => {
            state.displayDrawer = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.notifications = action.payload;
        });
    },
});

export const { markNotificationAsRead, showDrawer, hideDrawer } =
    notificationsSlice.actions;

export default notificationsSlice.reducer;
