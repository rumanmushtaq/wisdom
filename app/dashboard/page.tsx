"use client";

import { Header } from "@/components/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { TaskProgress } from "@/components/dashboard/task-progress";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Wallet, Zap, Users, ArrowDownLeft } from "lucide-react";
import useDashboard from "./useDashboard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
        <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Investment Packages
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose a package that fits your investment goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {packages?.map((pkg, index: number) => (
              <div
                key={index}
                className={`relative p-6 rounded-xl border transition-all duration-300 ease-in-out text-center ${
                  pkg.featured
                    ? "bg-card/70 border-primary/60 scale-105 shadow-lg shadow-primary/20"
                    : "bg-card/30 border-border/40 hover:border-primary/50"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-lg mb-4 text-foreground">
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {pkg.credits} credits
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Monthly Return
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Investment: ${pkg.price}
                </div>
                <Button
                  className={`w-full rounded-lg ${
                    pkg.featured
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-transparent border-border hover:border-primary/50"
                  }`}
                  variant={pkg.featured ? "default" : "outline"}
                  size="sm"
                  onClick={() => pkg?._id && handleToChosePlan(pkg._id)}
                >
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
