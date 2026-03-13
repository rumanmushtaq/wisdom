import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

export interface Tier {
  _id: string;
  name: string;
  minMembers: number;
  maxMembers?: number;
  commissionRate: number;
  description?: string;
}

class TiersService {
  async getAllTiers(): Promise<{ success: boolean; data: Tier[] | string }> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Tiers.ALL);
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

export default new TiersService();
