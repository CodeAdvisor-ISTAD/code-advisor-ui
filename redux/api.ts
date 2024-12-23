// store/notificationsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Notification } from '@/types/notifications';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (userId: string) => {
        const response = await fetch(`${API_BASE_URL}/notifications/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        return response.json() as Promise<Notification[]>;
    }
);

export const markAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async ({ id, status }: { id: string; status: boolean }) => {
        const response = await fetch(`${API_BASE_URL}/notifications/${id}/status?read=${status}`, {
            method: 'PUT',
        });
        if (!response.ok) {
            throw new Error('Failed to update notification status');
        }
        return { id, status };
    }
);

export const removeNotification = createAsyncThunk(
    'notifications/removeNotification',
    async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to remove notification');
        }
        return id;
    }
);

interface NotificationsState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationsState = {
    notifications: [],
    loading: false,
    error: null,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch notifications';
            })
            .addCase(markAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                state.loading = false;
                const { id, status } = action.payload;
                const notification = state.notifications.find((n) => n.id === id);
                if (notification) {
                    notification.read = status;
                }
            })
            .addCase(markAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update notification status';
            })
            .addCase(removeNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = state.notifications.filter((n) => n.id !== action.payload);
            })
            .addCase(removeNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to remove notification';
            });
    },
});

export default notificationsSlice.reducer;