"use client";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import depositService from "@/services/deposit";
import { addDepositToTop, setDeposits } from "@/store/slices/deposit";
import { useRouter } from "next/navigation";
import usePackage from "@/hooks/use-package";



const useDeposit = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { packages } = useSelector((state: RootState) => state.packages);
  const { deposits } = useSelector((state: RootState) => state.deposit);

  
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
    const [loader, setLoader] = useState<{
    packages: boolean;
  }>({
    packages: false,
  });
  const { handleToGetAllPackages } = usePackage({ setLoader });

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
    } catch (error) { }


    toast.success(
      "Your deposit is pending admin approval."
    );
  };

  const pendingCount = deposits?.filter((d) => d?.status === "pending")?.length;
  const approvedTotal = deposits
    ?.filter((d) => d?.status === "approved")
    ?.reduce((sum, d) => sum + d?.amount, 0);


  const handleTogetUserDeposit = async () => {
    try {
      const { data } = await depositService.getUserTransactions();
      dispatch(setDeposits(data));
    } catch (error) { }
  };

  useEffect(() => {
    handleToGetAllPackages()
    handleTogetUserDeposit();
  }, []);

  const handleToChosePlan = (packageId: string) => {

    if (!user) {
      router.push("/auth/signup");
      return;
    } else {
      setSelectedPackage(packageId)
      router.push(`/deposit?id=${packageId}`);
    }
  };

  return {
    packages,
    selectedPackage,
    pendingCount,
    approvedTotal,
    deposits,
    handleDepositSubmit,
    user,
    handleToChosePlan,
    loader,

  };
};

export default useDeposit;
