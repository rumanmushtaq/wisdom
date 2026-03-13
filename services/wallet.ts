

import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";


class WalletService {
  async createWallets(params: { name: string; address: string }): Promise<any> {
    try {
      const { data } = await HTTP_CLIENT.post(apiEndpoints.Wallets.ALL, params);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async getAllWallets(): Promise<any> {
    try {
      const { data } = await HTTP_CLIENT.get(apiEndpoints.Wallets.ALL);
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async deleteWallet(id: string): Promise<any> {
    try {
      const { data } = await HTTP_CLIENT.delete(`${apiEndpoints.Wallets.ALL}/${id}`);
      return data;
    } catch (error: any) {
      throw error;
    }
  }


}

export default new WalletService();
