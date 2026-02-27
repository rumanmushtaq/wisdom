import { ChangePasswordFormValues } from "@/types/change-password";
import { ForgetPasswordFormValues } from "@/types/forget-password";
import { LoginFormValues } from "@/types/login";
import { OtpForm } from "@/types/otp-verification";
import { ProfileUpdateFormValues } from "@/types/profile-update";
import { SignUpFormValues } from "@/types/signup";
import apiEndpoints from "@/utils/apiConfig";
import { HTTP_CLIENT } from "@/utils/axiosClient";

class AuthService {
  async loginApi(params: LoginFormValues): Promise<any> {
    const payload = {
      email: params.email,
      password: params.password,
    };
    try {
      const res = await HTTP_CLIENT.post(apiEndpoints.Auth.LOGIN, payload);
      return res.data;
    } catch (error: any) {
      return error.message;
    }
  }
  async signupApi(params: SignUpFormValues): Promise<any> {
    const payload = {
      username: params.username,
      email: params.email,
      password: params.password,
      referralCode: params.referralCode,
      acceptTerms: params.acceptTerms,
    };
    try {
      const res = await HTTP_CLIENT.post(apiEndpoints.Auth.REGISTER, payload);
      return res.data;
    } catch (error: any) {
      return error.message;
    }
  }

  async forgetPasswordApi(params: ForgetPasswordFormValues): Promise<any> {
    const payload = {
      email: params.email,
    };
    try {
      const res = await HTTP_CLIENT.post(
        apiEndpoints.Auth.FORGET_PASSWORD,
        payload,
      );
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
  async otpVerificationApi(params: OtpForm): Promise<any> {
    const payload = {
      email: params.otp,
    };
    try {
      const res = await HTTP_CLIENT.post(
        apiEndpoints.Auth.OTP_VERIFICATION,
        payload,
      );
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

  async changePassword(params: ChangePasswordFormValues): Promise<any> {
    const payload = {
      currentPassword: params.currentPassword,
      newPassword: params.newPassword,
    };

    try {
      const res = await HTTP_CLIENT.post(
        apiEndpoints.Auth.CHANGE_PASSWORD,
        payload,
      );
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
  async updateProfile(params: ProfileUpdateFormValues): Promise<any> {
    try {
      const res = await HTTP_CLIENT.put(apiEndpoints.Users.PROFILE, params);
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

export default new AuthService();
