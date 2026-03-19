


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

export interface DashboardState {
  stats: DashboardStats | null;
  monthlyRevenue: any | null;
  loading: boolean;
}
