"use client";

import { Header } from "@/components/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { TaskProgress } from "@/components/dashboard/task-progress";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Wallet, Zap, Users, ArrowDownLeft } from "lucide-react";
import useDashboard from "./useDashboard";

export default function DashboardPage() {
  // Mock data - replace with actual API calls

  const { user } = useDashboard();

  const mockBalance = {
    total: 5234.67,
    available: 3450.23,
    locked: 1784.44,
    tasksEarned: 2100.5,
    referralsEarned: 1050.25,
    totalWithdrawn: 1500,
    totalDeposited: 3000,
  };

  const mockTeam = {
    directReferrals: 12,
    totalTeamSize: 45,
    totalTeamEarnings: 3250.75,
    recentMembers: [
      {
        id: "1",
        username: "alex_trader",
        avatar: "AT",
        totalEarned: 450.25,
        joinedDate: "2 days ago",
      },
      {
        id: "2",
        username: "crypto_fan",
        avatar: "CF",
        totalEarned: 320.5,
        joinedDate: "5 days ago",
      },
      {
        id: "3",
        username: "earn_daily",
        avatar: "ED",
        totalEarned: 215.75,
        joinedDate: "1 week ago",
      },
    ],
  };

  const mockTaskProgress = {
    completed: 6,
    total: 10,
    dailyTarget: 5,
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Welcome back! <span className="text-primary">
                {user?.firstName}{" "}{user?.lastName}
                </span> 
            </h1>
            <p className="text-muted-foreground">
              Here's your earnings summary for today
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total Balance"
              value={`${mockBalance.total.toFixed(2)}`}
              subtext="Available: 3,450.23"
              icon={<Wallet className="h-5 w-5" />}
              color="primary"
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              label="Task Earnings"
              value={`${mockBalance.tasksEarned.toFixed(2)}`}
              subtext="This week"
              icon={<Zap className="h-5 w-5" />}
              color="warning"
              trend={{ value: 5.2, isPositive: true }}
            />
            <StatCard
              label="Referral Income"
              value={`${mockBalance.referralsEarned.toFixed(2)}`}
              subtext="From 12 referrals"
              icon={<Users className="h-5 w-5" />}
              color="info"
              trend={{ value: 8.3, isPositive: true }}
            />
            <StatCard
              label="Total Withdrawn"
              value={`${mockBalance.totalWithdrawn.toFixed(2)}`}
              subtext="Lifetime"
              icon={<ArrowDownLeft className="h-5 w-5" />}
              color="success"
              trend={{ value: 3.1, isPositive: true }}
            />
          </div>

          {/* Task Progress */}
          <div className="grid grid-cols-1 gap-8 mb-8">
            <TaskProgress {...mockTaskProgress} />
          </div>
        </div>
      </main>
    </>
  );
}
