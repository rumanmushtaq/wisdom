import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class WithdrawService {

  async createWithdraws(payload: any): Promise<any> {
    try {
      const { data } = await HTTP_CLIENT.post(apiEndpoints.Withdraws.CREATE, payload);
      return data;
    } catch (error: any) {
      return error.message;
    }
  }

  async getMyWithdraws(): Promise<any> {
    try {
      const { data } = await HTTP_CLIENT.get(apiEndpoints.Withdraws.MY);
      return data;
    } catch (error: any) {
      return error.message;
    }
  }


}

export default new WithdrawService();
