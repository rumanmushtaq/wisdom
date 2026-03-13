"use client";

import { Header } from "@/components/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { TaskProgress } from "@/components/dashboard/task-progress";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Wallet, Zap, Users, ArrowDownLeft } from "lucide-react";
import useDashboard from "./useDashboard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PackagesData from "@/components/dashboard/packages";

export default function DashboardPage() {
  const { packages, user, stats, loading, handleToChosePlan } = useDashboard();

  // Fallback to user credits if stats not loaded yet
  const totalBalance = stats?.totalBalance ?? user?.credits ?? 0;
  const taskEarnings = stats?.taskEarnings ?? 0;
  const referralEarnings = stats?.referralEarnings ?? 0;
  const totalWithdrawn = stats?.totalWithdrawn ?? 0;
  const tasksCompleted = stats?.tasksCompleted ?? 0;
  const tasksTotal = stats?.tasksTotal ?? 10;
  const dailyTaskTarget = stats?.dailyTaskTarget ?? 10;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Welcome back!{" "}
              <span className="text-primary">
                {user?.firstName} {user?.lastName}
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
              value={loading ? "..." : `${totalBalance.toFixed(2)}`}
              // subtext="Available: 3,450.23"
              icon={<Wallet className="h-5 w-5" />}
              color="primary"
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatCard
              label="Task Earnings"
              value={loading ? "..." : `${taskEarnings.toFixed(2)}`}
              subtext="This week"
              icon={<Zap className="h-5 w-5" />}
              color="warning"
              trend={{ value: 5.2, isPositive: true }}
            />
            <StatCard
              label="Referral Income"
              value={loading ? "..." : `${referralEarnings.toFixed(2)}`}
              subtext={`From ${stats?.directReferrals ?? 0} referrals`}
              icon={<Users className="h-5 w-5" />}
              color="info"
              trend={{ value: 8.3, isPositive: true }}
            />
            <StatCard
              label="Total Withdrawn"
              value={loading ? "..." : `${totalWithdrawn.toFixed(2)}`}
              subtext="Lifetime"
              icon={<ArrowDownLeft className="h-5 w-5" />}
              color="success"
              trend={{ value: 3.1, isPositive: true }}
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
        <PackagesData packages={packages} handleToChosePlan={handleToChosePlan} />
      </main>
    </>
  );
}
