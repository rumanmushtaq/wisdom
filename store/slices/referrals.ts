import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Deposit {
  _id?: string;
  amount: number;
  balanceBefore: number;
  image: string;
  type: string;
  transactionId: string;
  updatedAt: string;
  paymentProof: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: string;
  userId : string
}

interface AuthState {
  referralList: any[];
}

const initialState: AuthState = {
  referralList: [],
};

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    // ✅ SET packages
    setReferrals(state, action: PayloadAction<Deposit[]>) {
      state.referralList = action.payload;
    },
     addReferralToTop(state, action: PayloadAction<Deposit>) {
      state.referralList.unshift(action.payload);
    },
  },
});

export const { setReferrals , addReferralToTop} = referralSlice.actions;
export default referralSlice.reducer;
