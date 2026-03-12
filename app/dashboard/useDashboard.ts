"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import packageService from "@/services/packages";
import DashboardService from "@/services/dashboard";
import { setPackages } from "@/store/slices/package";
import { setDashboardStats, setLoading } from "@/store/slices/dashboard";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";

const useDashboard = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { packages } = useSelector((state: RootState) => state.packages);
  const { stats, loading } = useSelector((state: RootState) => state.dashboard);
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

  const fetchDashboardStats = async () => {
    dispatch(setLoading(true));
    const response = await DashboardService.getDashboardStats();
    if (response.success && typeof response.data === "object") {
      dispatch(setDashboardStats(response.data));
    }
    dispatch(setLoading(false));
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
    fetchDashboardStats();
  }, []);
  return { user, packages, stats, loading, handleToChosePlan };
};

export default useDashboard;
