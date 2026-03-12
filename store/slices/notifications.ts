import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: "WELCOME" | "TASK" | "DEPOSIT" | "WITHDRAWAL" | "REFERRAL" | "SYSTEM" | "SUCCESS" | "WARNING" | "INFO" | "ERROR";
  priority: "LOW" | "MEDIUM" | "HIGH";
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n._id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
      state.unreadCount = Math.max(0, state.unreadCount - 1);
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
      state.unreadCount = 0;
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n._id === action.payload);
      if (notification && !notification.isRead) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter((n) => n._id !== action.payload);
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setNotifications,
  setUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  addNotification,
  setLoading,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
