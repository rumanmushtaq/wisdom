import { setReferrals } from "@/store/slices/referrals";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import referralService from "@/services/referral";
const useReferrals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { referralList, user } = useSelector((state: RootState) => ({
    referralList: state.referral.referralList,
    user: state.auth.user,
  }));
  const [referralLink] = useState<string>(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/signup?ref=${user.referralCode}`,
  );

  const handleToGetReferralsOfThisUser = async () => {
     console.log("2")
    try {
        console.log("3")
      const { data } = await referralService.getUserReferrals();
      console.log("data", data);
      dispatch(setReferrals(data));
    } catch (error) {
      console.log("error ", error);
    }
  };
  useEffect(() => {
    console.log("1")
    handleToGetReferralsOfThisUser();
  }, []);

  return { referralList, user, referralLink };
};

export default useReferrals;
