"use client";

import { Header } from "@/components/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { TaskProgress } from "@/components/dashboard/task-progress";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Wallet, Zap, Users, ArrowDownLeft } from "lucide-react";
import useDashboard from "./useDashboard";
import PackagesData from "@/components/dashboard/packages";
import WhatsAppChannelModal from "@/components/whatsapp-channel-modal";

export default function DashboardPage() {
  const { packages, user, stats, loading, handleToChosePlan } = useDashboard();

  // Use the exact database lifetime totals passed from the new earnings block
  const totalBalance = stats?.earnings?.credits ?? user?.credits ?? 0;
  const taskEarnings = stats?.earnings?.taskEarnings ?? 0;
  const referralEarnings = stats?.earnings?.referralEarnings ?? 0;
  const totalWithdrawn = stats?.earnings?.withdrawEarnings ?? 0;

  const tasksCompleted = stats?.taskProgress?.completed ?? 0;
  const tasksTotal = stats?.taskProgress?.total ?? 10;
  const dailyTaskTarget = stats?.taskProgress?.dailyTarget ?? 10;

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName.replace(/-/g, " ")} ${user.lastName.replace(/-/g, " ")}`
      : user?.username?.replace(/-/g, " ");

  return (
    <>
      {user?._id && <WhatsAppChannelModal userId={user._id} />}
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
              value={loading ? "..." : `${Number(totalBalance).toFixed(2)}`}
              icon={<Wallet className="h-5 w-5" />}
              color="primary"
              trend={{
                value: stats?.earnings?.credits?.change ?? 0,
                isPositive:
                  stats?.earnings?.credits?.changeType === "increase",
              }}
            />
            <StatCard
              label="Task Earnings"
              value={loading ? "..." : `${Number(taskEarnings).toFixed(2)}`}
              subtext="This week"
              icon={<Zap className="h-5 w-5" />}
              color="warning"
              trend={{
                value: stats?.earnings?.taskEarnings?.change ?? 0,
                isPositive:
                  stats?.earnings?.taskEarnings?.changeType === "increase",
              }}
            />
            <StatCard
              label="Referral Income"
              value={loading ? "..." : `${Number(referralEarnings).toFixed(2)}`}
              subtext={`From ${stats?.earnings?.referralEarnings?.referralCount ?? 0} referrals`}
              icon={<Users className="h-5 w-5" />}
              color="info"
              trend={{
                value: stats?.earnings?.referralEarnings?.change ?? 0,
                isPositive:
                  stats?.earnings?.referralEarnings?.changeType === "increase",
              }}
            />
            <StatCard
              label="Total Withdrawn"
              value={loading ? "..." : `${Number(totalWithdrawn).toFixed(2)}`}
              subtext="Lifetime"
              icon={<ArrowDownLeft className="h-5 w-5" />}
              color="success"
              trend={{
                value: stats?.earnings?.withdrawEarnings?.change ?? 0,
                isPositive:
                  stats?.earnings?.withdrawEarnings?.changeType === "increase",
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
