import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

export interface DashboardStats {
  totalBalance: number;
  availableBalance: number;
  lockedBalance: number;
  taskEarnings: number;
  referralEarnings: number;
  totalWithdrawn: number;
  totalDeposited: number;
  directReferrals: number;
  totalTeamSize: number;
  totalTeamEarnings: number;
  tasksCompleted: number;
  tasksTotal: number;
  dailyTaskTarget: number;
}

class DashboardService {
  async getDashboardStats(): Promise<{ success: boolean; data: DashboardStats | string }> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Dashboard.STATS);
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

  async getMonthlyRevenue(): Promise<{ success: boolean; data: any | string }> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Dashboard.MONTHLYREVENUE);
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
}

export default new DashboardService();
