"use client";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import depositService from "@/services/deposit";
import { addDepositToTop, setDeposits } from "@/store/slices/deposit";



const useDeposit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { packages } = useSelector((state: RootState) => state.packages);
  const { deposits } = useSelector((state: RootState) => state.deposit);
  const { user } = useSelector((state: RootState) => state.auth);


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


     toast.success(
       "Your deposit is pending admin approval."
      );
  };

  const pendingCount = deposits?.filter((d) => d?.status === "pending")?.length;
  const approvedTotal = deposits
    ?.filter((d) => d?.status === "approved")
    ?.reduce((sum, d) => sum + d?.amount, 0);

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
    user,
    
  };
};

export default useDeposit;
