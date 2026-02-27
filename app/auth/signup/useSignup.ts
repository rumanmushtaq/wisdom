"use client";
import { SignUpFormValues } from "@/types/signup";
import { useForm } from "react-hook-form";
import authService from "@/services/auth";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "@/store/slices/auth";

const useSignup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref") ?? undefined;
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: referralCode ?? undefined,
      acceptTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormValues) => {
    if (!data?.acceptTerms) {
      setError("acceptTerms", {
        type: "manual",
        message: "You must accept the Terms & Conditions",
      });
      return;
    }

    if (data?.password !== data?.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const res = await authService.signupApi(data);


      console.log("res", res)

      if (res?.data?.success) {
        document.cookie = `access_token=${res?.data?.access_token}; path=/; max-age=3600`; // 1 hour
        document.cookie = `refresh_token=${
          res?.data?.refresh_token
        }; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

        dispatch(
          loginSuccess({
            accessToken: res?.data?.access_token,
            refreshToken: res?.data?.refresh_token,
          }),
        );
        dispatch(setUser({ user: res?.data?.user }));
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      console.log("err", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || error.response.data.message,
      });
    }
  };
  return {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    onSubmit,
    password,
    showPassword,
    setShowPassword,
  };
};

export default useSignup;
