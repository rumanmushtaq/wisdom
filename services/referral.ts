import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class ReferralService {
  async getUserReferrals(): Promise<any> {
    try {
        console.log("4")
       const {data} = await HTTP_CLIENT.get(`${apiEndpoints.REFERRAL.ALL}`);
      return data;
    } catch (error: any) {
      return error.message;
    }
  }
}

export default new ReferralService();
