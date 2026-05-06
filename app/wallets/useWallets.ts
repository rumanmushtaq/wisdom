"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  setWallets,
  addWalletToTop,
  removeWallet,
  Wallet,
} from "@/store/slices/wallets";
import WalletService from "@/services/wallet";
import { useToast } from "@/hooks/use-toast";

const useWallets = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector((state: RootState) => state.wallets.usersWallets);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchWallets = async () => {
    try {
      setIsLoading(true);
      const response = await WalletService.getAllWallets();
      const walletData =
        response?.data || (Array.isArray(response) ? response : []);
      dispatch(setWallets(walletData));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to load wallets",
      });
      dispatch(setWallets([]));
    } finally {
      setIsLoading(false);
    }
  };

  const createWallet = async (name: string, address: string) => {
    try {
      const response = await WalletService.createWallets({ name, address });
      const newWallet: Wallet = response?.data || {
        _id: Date.now().toString(),
        name,
        address,
        createdAt: new Date().toISOString(),
      };

      dispatch(addWalletToTop(newWallet));
      toast({
        title: "Wallet Created",
        description: "Your wallet has been added successfully.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to create wallet",
      });
      return false;
    }
  };

  const deleteWallet = async (id: string) => {
    try {
      await WalletService.deleteWallet(id);
      dispatch(removeWallet(id));
      toast({
        title: "Wallet Deleted",
        description: "Your wallet has been removed.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to delete wallet",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return {
    wallets,
    isLoading,
    fetchWallets,
    createWallet,
    deleteWallet,
  };
};

export default useWallets;
