import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tier } from "@/services/tiers";

interface TiersState {
  tiers: Tier[];
  loading: boolean;
}

const initialState: TiersState = {
  tiers: [],
  loading: false,
};

const tiersSlice = createSlice({
  name: "tiers",
  initialState,
  reducers: {
    setTiers: (state, action: PayloadAction<Tier[]>) => {
      state.tiers = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTiers, setLoading } = tiersSlice.actions;
export default tiersSlice.reducer;
