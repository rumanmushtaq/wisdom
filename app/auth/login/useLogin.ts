"use client";
import { LoginFormValues } from "@/types/login";
import { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "@/services/auth";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "@/store/slices/auth";
import { toast } from "sonner";

const useLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await authService.loginApi(data);

      console.log("res", res)

  
      if (res?.success) {
        // ✅ Save to cookies
        document.cookie = `access_token=${res?.access_token}; path=/; max-age=3600`; // 1 hour
        document.cookie = `refresh_token=${
          res?.refresh_token
        }; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

        dispatch(
          loginSuccess({
            accessToken: res?.access_token,
            refreshToken: res?.refresh_token,
          }),
        );
        dispatch(setUser({ user: res?.user }));
        toast.success(res.message);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log("errors", err);
      setError("root", {
        type: "server",
        message: "An error occurred. Please try again.",
      });
    }
  };

  return {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    onSubmit,
    showPassword,
    setShowPassword,
  };
};

export default useLogin;
