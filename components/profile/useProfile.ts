"use client";
import { AppDispatch, RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import authService from "@/services/auth";
import { setUser } from "@/store/slices/auth";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const [loader, setLoader] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      username: user?.username || user?.firstName?.toLowerCase() || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setLoader(true);
    try {
      const res = await authService.updateProfile(data);
      console.log("res", res);

      if (res?.success) {
        dispatch(setUser({ user: res?.data }));
   
         toast.success(
    "Your profile information has been saved successfully."
    );
      }
    } catch (error: any) {
      toast.error(
    error?.response?.data?.message 
    );
    } finally {
      setLoader(false);
    }
  };

  return {
    loader,
    control,
    handleSubmit,
    errors,
    onSubmit,
    showPasswordDialog,
    setShowPasswordDialog,
  };
};

export default useProfile;
