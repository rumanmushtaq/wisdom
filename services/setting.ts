import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class SettingService {
  async getSettings(): Promise<{ success: boolean; data: any | string }> {
    try {
      const { data } = await HTTP_CLIENT.get(apiEndpoints.Settings.GET_ALL);
      return data
    } catch (error: any) {
      return {
        success: false,
        data: error.message,
      };
    }
  }
}

export default new SettingService();
