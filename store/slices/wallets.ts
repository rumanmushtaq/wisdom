import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Wallet {
  _id?: string;
  name: string;
  address: string;
}

interface AuthState {
  usersWallets: Wallet[];
}

const initialState: AuthState = {
  usersWallets: [],
};

const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    // ✅ SET wallets
    setWallets(state, action: PayloadAction<Wallet[]>) {
      state.usersWallets = action.payload;
    },

    addWalletToTop(state, action: PayloadAction<Wallet>) {
      state.usersWallets.unshift(action.payload);
    },
  },
});

export const { setWallets, addWalletToTop } = walletSlice.actions;
export default walletSlice.reducer;
