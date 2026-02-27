"use client";

import { toast } from "sonner";
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
   

      toast.error(
       "New password and confirm password do not match.",
      );
      return;
    }

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });
       toast.success(
        "Your password has been updated successfully."
      );
    } catch (error: any) {
   

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );

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
