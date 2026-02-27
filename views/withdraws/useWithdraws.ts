"use client";

import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import walletService from "@/services/withdraws";
import { setWallets } from "@/store/slices/wallets";

const useWithdraws = () => {
  const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user, usersWallets } = useSelector((state: RootState) =>({user: state?.auth?.user,
    usersWallets : state?.wallets?.usersWallets
  }));

  const handleToGetAllWallets = async () => {
    const data = await walletService.getAllWallets();
    dispatch(setWallets(data));
  };
  useEffect(() => {
    handleToGetAllWallets();
  }, []);
  return { user, usersWallets, isSubmitting, setIsSubmitting };
};

export default useWithdraws;
