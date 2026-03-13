import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Wallet {
  _id?: string;
  name: string;
  address: string;
}

interface WithdrawState {
  usersWithdraws: any[];
}

const initialState: WithdrawState = {
  usersWithdraws: [],
};

const withdrawSlice = createSlice({
  name: "withdraws",
  initialState,
  reducers: {
    // ✅ SET wallets
    setWithdraws(state, action: PayloadAction<any[]>) {
      state.usersWithdraws = action.payload;
    },

    addWithdrawToTop(state, action: PayloadAction<any>) {
      state.usersWithdraws.unshift(action.payload);
    },
  },
});


export const { setWithdraws, addWithdrawToTop } = withdrawSlice.actions;
export default withdrawSlice.reducer;
