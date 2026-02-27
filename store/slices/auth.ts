// src/store/slices/auth.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  createdAt?: string;
  credits: number;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  referralCode: string;
  lastClaimedAt?: string;
  role: string;
  totalEarnings: number;
  updatedAt: string;
  _id?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: User;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: {
    firstName: "",
    username: "",
    lastName: "",
    credits: -1,
    createdAt: "",
    email: "",
    isActive: false,
    isVerified: false,

    referralCode: "",
    role: "",
    totalEarnings: -1,
    updatedAt: "",
    _id: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },

    setUser: (
      state,
      action: PayloadAction<{
        user: User
      }>
    ) => {
      state.user = action.payload.user;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
