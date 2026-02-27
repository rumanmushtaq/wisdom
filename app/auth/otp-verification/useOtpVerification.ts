"use client";
import { OtpForm } from "@/types/otp-verification";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import authService from "@/services/auth";

const useOtpVerification = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<OtpForm>({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const onSubmit = async (data: OtpForm) => {
    try {
      const res = await authService.otpVerificationApi(data);
      // if (!res.ok) {
      //   setError("root", {
      //     type: "server",
      //     message: result.error || "Login failed",
      //   });
      //   return;
      // }

      // window.location.href = "/dashboard";
    } catch {
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
  };
};

export default useOtpVerification;
