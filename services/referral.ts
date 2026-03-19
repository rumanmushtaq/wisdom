import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class ReferralService {
  async getUserReferrals(): Promise<any> {
    try {
      const { data } = await HTTP_CLIENT.get(`${apiEndpoints.REFERRAL.MY}`);
      return data;
    } catch (error: any) {
      return error.message;
    }
  }

  async getReferralStats(): Promise<any> {
    try {
      const { data } = await HTTP_CLIENT.get(
        `${apiEndpoints.Dashboard.REFERRAL_STATS}`,
      );
      return data;
    } catch (error: any) {
      return error.message;
    }
  }
}

export default new ReferralService();
