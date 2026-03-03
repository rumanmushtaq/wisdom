"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import packageService from "@/services/packages";
import { setPackages } from "@/store/slices/package";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";

const useDashboard = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { packages } = useSelector((state: RootState) => state.packages);
  const dispatch = useDispatch<AppDispatch>();
  const [loader, setLoader] = useState<{
    packages: boolean;
  }>({
    packages: false,
  });

  const handleToGetAllPackages = async () => {
    setLoader((prev) => ({ ...prev, packages: true }));
    try {
      const { data } = await packageService.getAllPackages({});
      dispatch(setPackages(data?.data));
    } catch (error) {
      console.log("error:::::", error);
    } finally {
      setLoader((prev) => ({ ...prev, packages: false }));
    }
  };

  const handleToChosePlan = (packageId: string) => {
    console.log("i am calling");

    if (!user) {
      router.push("/auth/signup");
      return;
    } else {
      router.push(`/deposit?id=${packageId}`);
    }
  };

  useEffect(() => {
    handleToGetAllPackages();
  }, []);
  return { user, packages, handleToChosePlan };
};

export default useDashboard;
