import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

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

export interface NotificationsResponse {
  data: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  unreadCount: number;
}

class NotificationsService {
  async getAllNotifications(): Promise<{ success: boolean; data: NotificationsResponse | string }> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Notifications.GET_ALL);
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async getUnreadCount(): Promise<{ success: boolean; data: { unreadCount: number } | string }> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Notifications.GET_UNREAD_COUNT);
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async getNotificationById(id: string): Promise<{ success: boolean; data: Notification | string }> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Notifications.GET_BY_ID(id));
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async markAsRead(id: string): Promise<{ success: boolean; data: Notification | string }> {
    try {
      const res = await HTTP_CLIENT.put(apiEndpoints.Notifications.UPDATE(id));
      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async deleteNotification(id: string): Promise<{ success: boolean; data: string }> {
    try {
      await HTTP_CLIENT.delete(apiEndpoints.Notifications.DELETE(id));
      return {
        success: true,
        data: "Notification deleted successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }

  async markAllAsRead(): Promise<{ success: boolean; data: string }> {
    try {
      await HTTP_CLIENT.put(apiEndpoints.Notifications.MARK_ALL_READ);
      return {
        success: true,
        data: "All notifications marked as read",
      };
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
}

export default new NotificationsService();
