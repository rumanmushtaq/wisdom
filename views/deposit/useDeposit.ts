"use client";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import depositService from "@/services/deposit";
import { addDepositToTop, setDeposits } from "@/store/slices/deposit";
const useDeposit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { packages, deposits } = useSelector((state: RootState) => {
    return {
      packages: state.packages.packages,
      deposits: state.deposit.deposits,
    };
  });
  const { toast } = useToast();

  const handleDepositSubmit = async (data: any) => {
    const payload = {
      amount: data?.amount,
      transactionId: data?.transactionId,
      image: data?.paymentProof,
      type: "PURCHASE",
    };
    try {
      const result = await depositService.createTransaction(payload);
      console.log("result", result);
      dispatch(addDepositToTop(result?.data));
    } catch (error) {}

    toast({
      title: "Deposit Submitted!",
      description: "Your deposit is pending admin approval.",
    });
  };

  const pendingCount = deposits.filter((d) => d.status === "pending").length;
  const approvedTotal = deposits
    .filter((d) => d.status === "approved")
    .reduce((sum, d) => sum + d.amount, 0);

  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const handleTogetUserDeposit = async () => {
    try {
      const { data } = await depositService.getUserTransactions();
      dispatch(setDeposits(data));
    } catch (error) {}
  };

  useEffect(() => {
    handleTogetUserDeposit();
  }, []);
  return {
    packages,
    selectedPackage,
    setSelectedPackage,
    pendingCount,
    approvedTotal,
    deposits,
    handleDepositSubmit,
  };
};

export default useDeposit;
