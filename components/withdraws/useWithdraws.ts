"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import walletService from "@/services/withdraws";
import { WithdrawFormValues, withdrawSchema } from "@/schemas/withdraw";
import { addWithdrawToTop } from "@/store/slices/withdraws";
import { setUser } from "@/store/slices/auth";
import AuthService from "@/services/auth";

const useWithdraws = ({ settings }: any) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 0,
      addressId: "",
    },
  });

  const amount = watch("amount");
  const withdrawalFee = amount
    ? (amount * (Number(settings?.handlingFee ?? 9.5) / 100)).toFixed(2)
    : "0.00";
  const netAmount = amount
    ? (
        amount -
        amount * (Number(settings?.handlingFee ?? 9.5) / 100)
      ).toFixed(2)
    : "0.00";

  const refreshProfile = async () => {
    const { data } = await AuthService.getProfile();
    if (data?.success) {
      dispatch(setUser({ user: data.profile }));
    }
  };

  const handleWithdraw = async (data: WithdrawFormValues) => {
    try {
      const res = await walletService.createWithdraws(data);
      if (res?.success && res?.withdrawal) {
        // Instantly prepend new withdrawal to the history table
        dispatch(addWithdrawToTop(res.withdrawal));
        // Refresh balance shown in Available Balance
        await refreshProfile();
        reset();
      }
      console.log("handleWithdraw", res);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    netAmount,
    isSubmitting,
    withdrawalFee,
    handleSubmit,
    handleWithdraw,
    amount,
    control,
    errors,
    setValue,
  };
};

export default useWithdraws;
