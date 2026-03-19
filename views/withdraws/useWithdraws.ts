"use client";

import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import walletService from "@/services/withdraws";
import { setWallets } from "@/store/slices/wallets";
import { setWithdraws } from "@/store/slices/withdraws";

const useWithdraws = () => {
  const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user, usersWallets, usersWithdraws, settings } = useSelector((state: RootState) =>({user: state?.auth?.user,
    usersWallets : state?.wallets?.usersWallets,
    usersWithdraws : state?.withdraws?.usersWithdraws,
    settings : state?.settings?.settings,
  }));

  const handleToGetAllWallets = async () => {
    const data = await walletService.getMyWithdraws();
    dispatch(setWithdraws(data.data));
  };

  const handleToGetWithdraws = async () => {
    const data = await walletService.getMyWithdraws();
    console.log(data);
  };
  useEffect(() => {
    handleToGetAllWallets();
  }, []);
  return { user, usersWallets, isSubmitting, setIsSubmitting, usersWithdraws, settings };
};

export default useWithdraws;
