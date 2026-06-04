export interface StatValue {
  value: number;
  change: number;
  changeType: "increase" | "decrease";
  period?: string;
  referralCount?: number;
}

export interface DashboardStats {
  earnings: {
    credits: StatValue;
    taskEarnings: StatValue;
    referralEarnings: StatValue;
    withdrawEarnings: StatValue;
  };
  taskProgress: {
    completed: number;
    total: number;
    percentage: number;
    dailyTarget: number;
    status: string;
  };
  todaysTasks: any[];
  tier: any;
}

export interface DashboardState {
  stats: DashboardStats | null;
  monthlyRevenue: any | null;
  loading: boolean;
}
