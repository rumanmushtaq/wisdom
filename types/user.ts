import { Tier } from "./tier";


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
  tierId?: Tier;
}