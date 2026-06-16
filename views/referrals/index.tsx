"use client";

import { Header } from "@/components/header";
import { ReferralLinkDisplay } from "@/components/refer/referral-link-display";
import { ReferralStats } from "@/components/refer/referral-stats";
import { Users, TrendingUp, Award } from "lucide-react";
import useReferrals from "./useReferrals";

interface ReferredUser {
  id: string;
  username: string;
  dateJoined: string;
  totalEarned: number;
  tasksCompleted: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  isActive?: boolean;
  isVerified?: boolean;
  credits?: number;
}

// Mock data
const mockReferredUsers: ReferredUser[] = [
  {
    id: "1",
    username: "alex_trader",
    dateJoined: "2 days ago",
    totalEarned: 450.25,
    tasksCompleted: 28,
    tier: "gold",
  },
  {
    id: "2",
    username: "crypto_fan",
    dateJoined: "5 days ago",
    totalEarned: 320.5,
    tasksCompleted: 18,
    tier: "silver",
  },
  {
    id: "3",
    username: "earn_daily",
    dateJoined: "1 week ago",
    totalEarned: 215.75,
    tasksCompleted: 12,
    tier: "bronze",
  },
  {
    id: "4",
    username: "moon_walker",
    dateJoined: "10 days ago",
    totalEarned: 580.0,
    tasksCompleted: 35,
    tier: "platinum",
  },
  {
    id: "5",
    username: "hodl_forever",
    dateJoined: "2 weeks ago",
    totalEarned: 195.25,
    tasksCompleted: 9,
    tier: "bronze",
  },
  {
    id: "6",
    username: "defi_pro",
    dateJoined: "2 weeks ago",
    totalEarned: 489.0,
    tasksCompleted: 31,
    tier: "silver",
  },
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case "platinum":
      return "bg-blue-500/20 text-blue-600 dark:text-blue-400";
    case "gold":
      return "bg-amber-500/20 text-amber-600 dark:text-amber-400";
    case "silver":
      return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
    case "bronze":
      return "bg-orange-500/20 text-orange-600 dark:text-orange-400";
    default:
      return "bg-primary/20 text-primary";
  }
};

const InARow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs text-foreground/50 mt-1">
        {label}
      </p>
      <p className="text-lg font-bold text-primary">
        {value}
      </p>
    </div>
  );
};


export default function ReferralPage() {
  const {
    referralList,
    user,
    referralLink,
    tiers,
    loading,
    settings,
    referralStats,
  } = useReferrals();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Referral Program
            </h1>
            <p className="text-foreground/60">
              Earn commissions by inviting friends to Wisdom Works
            </p>
          </div>

          {/* Referral Stats */}
          <div className="mb-12">
            <ReferralStats
              directReferrals={referralStats?.directReferrals || 0}
              totalTeamSize={referralStats?.teamSize || 0}
              totalEarned={referralStats?.totalEarned || 0}
              todayEarned={referralStats?.today || 0}
              weekEarned={referralStats?.thisWeek || 0}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Referral Link */}
            <div className="lg:col-span-1">
              <ReferralLinkDisplay
                referralCode={user?.referralCode}
                referralLink={referralLink}
              />
            </div>

            {/* How It Works */}
            <div className="lg:col-span-2">
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-6">
                  How the Referral Program Works
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: Users,
                      title: "Share Your Link",
                      description:
                        "Copy and share your unique referral link with friends, family, or on social media.",
                    },
                    {
                      icon: TrendingUp,
                      title: "They Join & Earn",
                      description:
                        "When someone signs up using your link, they get a bonus and you start earning.",
                    },
                    {
                      icon: Award,
                      title: "Earn Commissions",
                      description: `You earn ${settings?.websiteCommission}% commission on all task earnings from your referrals.`,
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-foreground/70">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <span className="font-medium">Commission Structure:</span> 10% of referral task earnings + bonus
                    rewards for team milestones
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Unlimited Referrals</h3>
              <p className="text-sm text-foreground/70">
                Invite as many people as you want and earn from all of them.
              </p>
            </div>

            <div className="glass p-6 rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Passive Income</h3>
              <p className="text-sm text-foreground/70">
                Earn automatically as your referrals complete tasks.
              </p>
            </div>

            <div className="glass p-6 rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Tier Rewards</h3>
              <p className="text-sm text-foreground/70">
                Unlock higher commissions as your team grows.
              </p>
            </div>
          </div>

          {/* Referrals Table */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">Your Referrals</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Username
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Joined
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Tasks Completed
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Your Earnings
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Tier
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Verified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {referralList?.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border/10 hover:bg-card/30 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">{user.username}</td>
                      <td className="py-3 px-4 text-foreground/70">
                        {user.dateJoined || 'N/A'}
                      </td>
                      <td className="py-3 px-4">{user.tasksCompleted ?? 0}</td>
                      <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                        +{(user.totalEarned || 0).toFixed(2)} Credits
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTierColor(user.tier || "bronze")}`}
                        >
                          {(user.tier || "bronze").charAt(0).toUpperCase() +
                            (user.tier || "bronze").slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.isVerified ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'}`}>
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tier System Info */}
          <div className="mt-12 glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">Commission Tiers</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-4 border border-border/20 rounded-lg"
                  >
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-white/10 rounded w-1/2"></div>
                      <div className="h-3 bg-white/10 rounded w-3/4"></div>
                      <div className="h-6 bg-white/10 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tiers?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {tiers?.map((tier) => (
                  <div
                    key={tier._id}
                    className="p-4 border border-border/20 rounded-lg hover:border-primary transition-colors ease-in-out"
                  >
                    <p className="font-semibold mb-2">{tier.name}</p>
                    <p className="text-sm text-foreground/60 mb-2">
                      <span className="block">
                        Members: {tier?.minReferralCount}
                      </span>
                    </p>
          
                    <InARow label="Invite Percentage Rate" value={`${tier?.invitePercentage}%`} />
                    <InARow label="First Referral Percentage Rate" value={`${tier?.referralTaskPercentage}%`} />
                    <InARow label="Second Referral Percentage Rate" value={`${tier?.secondReferralTaskPercentage}%`} />

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-foreground/60">
                No tiers available
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
