import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class TasksService {
  async getMyTasks(): Promise<any> {
    try {
      const res = await HTTP_CLIENT.get(apiEndpoints.Tasks.MY_TASKS);
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
  async getStartTask(taskId:string): Promise<any> {
    try {
      const res = await HTTP_CLIENT.put(`${apiEndpoints.Tasks.START}/${taskId}`);
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
  async addCredits(): Promise<any> {
    try {
      const res = await HTTP_CLIENT.get(`${apiEndpoints.Users.ADD_CREDITS}`);
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

export default new TasksService();
