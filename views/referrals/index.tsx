"use client"

import { Header } from "@/components/header"
import { ReferralLinkDisplay } from "@/components/refer/referral-link-display"
import { ReferralStats } from "@/components/refer/referral-stats"
import { Users, TrendingUp, Award } from "lucide-react"
import useReferrals from "./useReferrals"

interface ReferredUser {
  id: string
  username: string
  dateJoined: string
  totalEarned: number
  tasksCompleted: number
  tier: "bronze" | "silver" | "gold" | "platinum"
}

// Mock data
const mockReferralStats = {
  directReferrals: 12,
  totalTeamSize: 45,
  totalEarned: 3250.75,
  todayEarned: 125.5,
  weekEarned: 680.25,
}

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
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case "platinum":
      return "bg-blue-500/20 text-blue-600 dark:text-blue-400"
    case "gold":
      return "bg-amber-500/20 text-amber-600 dark:text-amber-400"
    case "silver":
      return "bg-gray-500/20 text-gray-600 dark:text-gray-400"
    case "bronze":
      return "bg-orange-500/20 text-orange-600 dark:text-orange-400"
    default:
      return "bg-primary/20 text-primary"
  }
}

export default function ReferralPage() {

  const {referralList, user, referralLink} = useReferrals()


  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Referral Program</h1>
            <p className="text-foreground/60">Earn commissions by inviting friends to Wisdom Works</p>
          </div>

          {/* Referral Stats */}
          <div className="mb-12">
            <ReferralStats {...mockReferralStats} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Referral Link */}
            <div className="lg:col-span-1">
              <ReferralLinkDisplay referralCode={user.referralCode} referralLink={referralLink} />
            </div>

            {/* How It Works */}
            <div className="lg:col-span-2">
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-6">How the Referral Program Works</h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: Users,
                      title: "Share Your Link",
                      description: "Copy and share your unique referral link with friends, family, or on social media.",
                    },
                    {
                      icon: TrendingUp,
                      title: "They Join & Earn",
                      description: "When someone signs up using your link, they get a bonus and you start earning.",
                    },
                    {
                      icon: Award,
                      title: "Earn Commissions",
                      description: "You earn 10% commission on all task earnings from your referrals.",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-foreground/70">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <span className="font-medium">Commission Structure:</span> 10% of referral task earnings + bonus
                    rewards for team milestones
                  </p>
                </div>
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
              <p className="text-sm text-foreground/70">Invite as many people as you want and earn from all of them.</p>
            </div>

            <div className="glass p-6 rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Passive Income</h3>
              <p className="text-sm text-foreground/70">Earn automatically as your referrals complete tasks.</p>
            </div>

            <div className="glass p-6 rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Tier Rewards</h3>
              <p className="text-sm text-foreground/70">Unlock higher commissions as your team grows.</p>
            </div>
          </div>

          {/* Referrals Table */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-6">Your Referrals</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Username</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Joined</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Tasks Completed</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Your Earnings</th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReferredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/10 hover:bg-card/30 transition-colors">
                      <td className="py-3 px-4 font-medium">{user.username}</td>
                      <td className="py-3 px-4 text-foreground/70">{user.dateJoined}</td>
                      <td className="py-3 px-4">{user.tasksCompleted}</td>
                      <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
                        +${user.totalEarned.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTierColor(user.tier)}`}>
                          {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { tier: "Bronze", members: "1-5", commission: "10%" },
                { tier: "Silver", members: "6-15", commission: "12%" },
                { tier: "Gold", members: "16-50", commission: "15%" },
                { tier: "Platinum", members: "50+", commission: "20%" },
              ].map((item) => (
                <div key={item.tier} className="p-4 border border-border/20 rounded-lg">
                  <p className="font-semibold mb-2">{item.tier}</p>
                  <p className="text-sm text-foreground/60 mb-2">
                    <span className="block">Members: {item.members}</span>
                  </p>
                  <p className="text-lg font-bold text-primary">{item.commission}</p>
                  <p className="text-xs text-foreground/50 mt-1">Commission Rate</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
