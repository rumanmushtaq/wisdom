import { DashboardState, DashboardStats } from "@/types/dashboard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DashboardState = {
  stats: null,
  monthlyRevenue: null,
  loading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
    },
    setMonthlyRevenue: (state, action: PayloadAction<any>) => {
      state.monthlyRevenue = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setDashboardStats, setMonthlyRevenue, setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;
