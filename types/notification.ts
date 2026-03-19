


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

export interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
}