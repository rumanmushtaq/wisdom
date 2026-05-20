import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";
import { DashboardStats } from "@/types/dashboard";

class DashboardService {
  async getDashboardStats(): Promise<{
    success: boolean;
    data: DashboardStats | string;
  }> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Dashboard.USER_STATS);
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
