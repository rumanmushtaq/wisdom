"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import walletService from "@/services/withdraws";
import { WithdrawFormValues, withdrawSchema } from "@/schemas/withdraw";

const useWithdraws = ({settings}: any) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 0,
      addressId: "",
    },
  });

  const amount = watch("amount");
  const withdrawalFee = amount ? (amount * (Number(settings?.handlingFee ?? 9.5)/100)).toFixed(2) : "0.00";
  const netAmount = amount ? (amount - (amount * (Number(settings?.handlingFee ?? 9.5)/100))).toFixed(2) : "0.00";

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
