import React from "react";

import { useForm, Controller } from "react-hook-form";
import walletService from "@/services/withdraws";
type WithdrawFormValues = {
  amount: number;
  addressId: string;
};

const useWithdraws = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawFormValues>({
    defaultValues: {
      amount: 0,
      addressId: "",
    },
  });

  const amount = watch("amount");

  const withdrawalFee = amount ? (amount * 0.01).toFixed(2) : "0.00";
  const netAmount = amount ? (amount - amount * 0.01).toFixed(2) : "0.00";

  const handleWithdraw = async (data: WithdrawFormValues) => {
    try {
      const res = await walletService.createWithdraws(data);
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
