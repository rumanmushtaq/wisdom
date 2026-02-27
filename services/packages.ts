import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class PackageService {
  async getAllPackages(params: any): Promise<any> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Packages.ALL, params);
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

export default new PackageService();
