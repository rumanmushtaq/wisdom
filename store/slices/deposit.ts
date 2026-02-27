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
  deposits: any[];
}

const initialState: AuthState = {
  deposits: [],
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    // ✅ SET deposits
    setDeposits(state, action: PayloadAction<Deposit[]>) {
      state.deposits = action.payload;
    },
     addDepositToTop(state, action: PayloadAction<Deposit>) {
      state.deposits.unshift(action.payload);
    },
  },
});

export const { setDeposits , addDepositToTop} = depositSlice.actions;
export default depositSlice.reducer;
