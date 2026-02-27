import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Package {
  _id?: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  isActive: boolean;
  featured: boolean;
  displayOrder: number;
}

interface AuthState {
  packages: Package[];
}

const initialState: AuthState = {
  packages: [],
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    // ✅ SET packages
    setPackages(state: any, action: PayloadAction<Package[]>) {
      state.packages = action.payload;
    },
  },
});

export const { setPackages } = packageSlice.actions;
export default packageSlice.reducer;
