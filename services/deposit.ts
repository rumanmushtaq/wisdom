import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class DepositService {
  async createTransaction(params: any): Promise<any> {
    try {
      const res = await HTTP_CLIENT.post(apiEndpoints.Deposit.ALL, params);
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

  async getUserTransactions(): Promise<any> {
    try {
 
          const { data } = await HTTP_CLIENT.get(
              `${apiEndpoints.Deposit.ALL}/user`,
            );
      return data
    } catch (error: any) {
      return error.message;
    }
  }

  async uploadImage(file: File, type: string = "purchase"): Promise<string> {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);

    // debug
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const { data } = await HTTP_CLIENT.post(
        `${apiEndpoints.Image.UPLOAD}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.url;
    } catch (error) {
      console.error("Upload failed", error);
      throw new Error("Upload failed");
    }
  }
}
export default new DepositService();
