
export interface TiersState {
  tiers: Tier[];
  loading: boolean;
}

export interface Tier {
  _id: string;
  name: string;
  level: number;
  invitePercentage: number;
  referralTaskPercentage: number;
  secondReferralTaskPercentage: number;
  minTasksCompleted: number;
  minReferralCount: number;
  isActive: boolean;
}