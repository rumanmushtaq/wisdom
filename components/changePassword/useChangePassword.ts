"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import authService from "@/services/auth";

interface FormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordDialogProps {
  onOpenChange: (open: boolean) => void;
}

const useChangePassword = ({ onOpenChange }: ChangePasswordDialogProps) => {
  const { toast } = useToast();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const newPassword = watch("newPassword");

  const onSubmit = async (data: FormValues) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    // ✅ Check password match
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });

      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to change password",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      onOpenChange(false);
    }
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    newPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
  };
};

export default useChangePassword;
