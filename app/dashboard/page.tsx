"use client";

import { Header } from "@/components/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { TaskProgress } from "@/components/dashboard/task-progress";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Wallet, Zap, Users, ArrowDownLeft } from "lucide-react";
import useDashboard from "./useDashboard";
import PackagesData from "@/components/dashboard/packages";

export default function DashboardPage() {
  const { packages, user, stats, loading, handleToChosePlan } = useDashboard();

  // Fallback to user credits if stats not loaded yet
  // Access stats from the new nested structure
  const totalBalance = stats?.stats?.totalBalance?.value ?? user?.credits ?? 0;
  const taskEarnings = stats?.stats?.taskEarnings?.value ?? 0;
  const referralEarnings = stats?.stats?.referralIncome?.value ?? 0;
  const totalWithdrawn = stats?.stats?.totalWithdrawn?.value ?? 0;

  const tasksCompleted = stats?.taskProgress?.completed ?? 0;
  const tasksTotal = stats?.taskProgress?.total ?? 10;
  const dailyTaskTarget = stats?.taskProgress?.dailyTarget ?? 10;

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName.replace(/-/g, " ")} ${user.lastName.replace(/-/g, " ")}`
      : user?.username?.replace(/-/g, " ");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Welcome back! <span className="text-primary">{displayName}</span>
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
              value={loading ? "..." : `${totalBalance.toFixed(2)}`}
              icon={<Wallet className="h-5 w-5" />}
              color="primary"
              trend={{
                value: stats?.stats?.totalBalance?.change ?? 0,
                isPositive:
                  stats?.stats?.totalBalance?.changeType === "increase",
              }}
            />
            <StatCard
              label="Task Earnings"
              value={loading ? "..." : `${taskEarnings.toFixed(2)}`}
              subtext="This week"
              icon={<Zap className="h-5 w-5" />}
              color="warning"
              trend={{
                value: stats?.stats?.taskEarnings?.change ?? 0,
                isPositive:
                  stats?.stats?.taskEarnings?.changeType === "increase",
              }}
            />
            <StatCard
              label="Referral Income"
              value={loading ? "..." : `${referralEarnings.toFixed(2)}`}
              subtext={`From ${stats?.stats?.referralIncome?.referralCount ?? 0} referrals`}
              icon={<Users className="h-5 w-5" />}
              color="info"
              trend={{
                value: stats?.stats?.referralIncome?.change ?? 0,
                isPositive:
                  stats?.stats?.referralIncome?.changeType === "increase",
              }}
            />
            <StatCard
              label="Total Withdrawn"
              value={loading ? "..." : `${totalWithdrawn.toFixed(2)}`}
              subtext="Lifetime"
              icon={<ArrowDownLeft className="h-5 w-5" />}
              color="success"
              trend={{
                value: stats?.stats?.totalWithdrawn?.change ?? 0,
                isPositive:
                  stats?.stats?.totalWithdrawn?.changeType === "increase",
              }}
            />
          </div>

          {/* Task Progress */}
          <div className="grid grid-cols-1 gap-8 mb-8">
            <TaskProgress
              completed={tasksCompleted}
              total={tasksTotal}
              dailyTarget={dailyTaskTarget}
            />
          </div>
        </div>

        {/* Investment Packages Preview */}
        <PackagesData
          packages={packages}
          handleToChosePlan={handleToChosePlan}
        />
      </main>
    </>
  );
}
