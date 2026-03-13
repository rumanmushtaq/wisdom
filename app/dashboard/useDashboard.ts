"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import settingService from "@/services/setting";
import DashboardService from "@/services/dashboard";
import { setDashboardStats, setLoading } from "@/store/slices/dashboard";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import usePackage from "@/hooks/use-package";
import { setSettings } from "@/store/slices/setting";


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

  const { handleToGetAllPackages } = usePackage({ setLoader });

  const fetchDashboardStats = async () => {
    dispatch(setLoading(true));
    const response = await DashboardService.getDashboardStats();
    if (response.success && typeof response.data === "object") {
      dispatch(setDashboardStats(response.data));
    }
    dispatch(setLoading(false));
  };

  const handleToChosePlan = (packageId: string) => {
    if (!user) {
      router.push("/auth/signup");
      return;
    } else {
      router.push(`/deposit?id=${packageId}`);
    }
  };

  const handleToGetAllSettings = async () => {
    const {data} = await settingService.getSettings();
    if (data?.success) {
     dispatch(setSettings(data?.data))
    }
  };


  useEffect(() => {
    handleToGetAllSettings()
    handleToGetAllPackages();
    fetchDashboardStats();
  }, []);
  return { user, packages, stats, loading, handleToChosePlan };
};

export default useDashboard;
