"use client";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import packageService from "@/services/packages";
import { setPackages } from "@/store/slices/package";
import { useRouter } from "next/navigation";

const useDashboard = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<{
    packages: boolean;
  }>({
    packages: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { packages } = useSelector((state: RootState) => state.packages);
  const { accessToken, refreshToken , user} = useSelector(
    (state: RootState) => state.auth
  );
console.log("user", user)
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

    console.log("i am calling")
    console.log("accessToken", accessToken)
    console.log("refreshToken", refreshToken)
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
  return { packages , handleToChosePlan};
};

export default useDashboard;
