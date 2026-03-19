import { setReferrals } from "@/store/slices/referrals";
import { setTiers, setLoading } from "@/store/slices/tiers";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import referralService from "@/services/referral";
import TiersService from "@/services/tiers";

const useReferrals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { referralList, user, tiers, loading, settings } = useSelector(
    (state: RootState) => ({
      referralList: state.referral.referralList,
      user: state.auth.user,
      tiers: state.tiers.tiers,
      loading: state.tiers.loading,
      settings: state.settings.settings,
    }),
  );

  const [referralStats, setReferralStats] = useState<any>(null);
  const [referralLink] = useState<string>(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/signup?ref=${user.referralCode}`,
  );

  const handleToGetReferralsOfThisUser = async () => {
    try {
      const { data } = await referralService.getUserReferrals();
      dispatch(setReferrals(data));
    } catch (error) {
      console.log("error ", error);
    }
  };

  const handleToGetReferralStats = async () => {
    try {
      const data = await referralService.getReferralStats();
      setReferralStats(data);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const fetchTiers = async () => {
    dispatch(setLoading(true));
    const response = await TiersService.getAllTiers();
    if (response.success && Array.isArray(response.data)) {
      dispatch(setTiers(response.data));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    handleToGetReferralsOfThisUser();
    handleToGetReferralStats();
    fetchTiers();
  }, []);

  return {
    referralList,
    user,
    referralLink,
    tiers,
    loading,
    settings,
    referralStats,
  };
};

export default useReferrals;
