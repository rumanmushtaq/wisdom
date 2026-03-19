import { Deposit, DepositState } from "@/types/deposit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DepositState = {
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
