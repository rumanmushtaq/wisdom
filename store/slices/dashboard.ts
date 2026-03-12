import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardStats {
  totalBalance: number;
  availableBalance: number;
  lockedBalance: number;
  taskEarnings: number;
  referralEarnings: number;
  totalWithdrawn: number;
  totalDeposited: number;
  directReferrals: number;
  totalTeamSize: number;
  totalTeamEarnings: number;
  tasksCompleted: number;
  tasksTotal: number;
  dailyTaskTarget: number;
}

interface DashboardState {
  stats: DashboardStats | null;
  monthlyRevenue: any | null;
  loading: boolean;
}

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
