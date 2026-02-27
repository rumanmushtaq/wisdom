"use client";
import { LoginFormValues } from "@/types/login";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import authService from "@/services/auth";
import { ForgetPasswordFormValues } from "@/types/forget-password";

const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgetPasswordFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordFormValues) => {
    try {

      const res = await authService.forgetPasswordApi(data);
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

export default useLogin;
