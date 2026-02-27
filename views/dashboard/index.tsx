"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { AnimatedHero3D } from "@/components/animated-hero-3d";
import { ArrowRight, Zap, TrendingUp, Users, Wallet } from "lucide-react";
import useDashboard from "./useDashboard";

export default function LandingPage() {
  const { packages , handleToChosePlan} = useDashboard();
  const features = [
    {
      icon: Zap,
      title: "Complete Tasks",
      description: "Earn crypto by completing simple, verified tasks daily.",
    },
    {
      icon: Wallet,
      title: "Easy Deposits",
      description:
        "Deposit using your BEP-20 wallet with instant confirmation.",
    },
    {
      icon: TrendingUp,
      title: "Track Earnings",
      description:
        "Real-time earnings dashboard showing tasks and referral income.",
    },
    {
      icon: Users,
      title: "Build Your Team",
      description: "Invite friends and earn commissions from their activity.",
    },
  ];

  const stats = [
    { label: "Active Users", value: "78K+" },
    { label: "Artists", value: "27K+" },
    { label: "Collectors", value: "44K+" },
  ];

  console.log("packages", packages)
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 overflow-hidden">
          {/* 3D Animated Background */}
          <div className="absolute inset-0 w-full h-full -z-0">
            <AnimatedHero3D />
          </div>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] -z-0" />

          {/* Content */}
          <div className="relative z-10 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight drop-shadow-lg">
              Create, Explore & Collect{" "}
              <span className="text-primary">Crypto Earnings</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed drop-shadow-md">
              Deposit. Work. Withdraw. Grow your team and multiply your earnings
              through our dynamic investment packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold px-8 shadow-lg shadow-primary/30"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-lg border-border hover:border-primary/50 bg-transparent font-semibold px-8"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y border-border/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary font-medium mb-2">
                    {stat.label}
                  </div>
                  <div className="w-24 h-0.5 bg-primary mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A simple platform to earn, invest, and grow your crypto portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card/50 border border-border/40 p-8 rounded-xl hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Investment Packages Preview */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Investment Packages
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose a package that fits your investment goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* {[
              { name: "Starter", rate: "5%", min: "$50" },
              { name: "Growth", rate: "8%", min: "$200" },
              { name: "Pro", rate: "12%", min: "$500", featured: true },
              { name: "Elite", rate: "15%", min: "$1000" },
              { name: "VIP", rate: "20%", min: "$5000" },
            ] */}

            {packages?.map((pkg, index: number) => (
              <div
                key={index}
                className={`relative p-6 rounded-xl border transition-all duration-300 ${
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
                    {pkg.credits} cre{" "}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Monthly Return
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  Min: {pkg.price}
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

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="bg-card/50 border border-border/40 p-12 sm:p-16 rounded-xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users already earning crypto daily. No
              experience necessary.
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold px-8"
              >
                Create Your Account Today
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-card/20 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/dashboard"
                      className="hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tasks"
                      className="hover:text-primary transition-colors"
                    >
                      Tasks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/deposit"
                      className="hover:text-primary transition-colors"
                    >
                      Deposit
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-primary transition-colors"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-primary transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="hover:text-primary transition-colors"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">
                  Community
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Telegram
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Discord
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-primary transition-colors"
                    >
                      support@wisdomworks.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
              <p>© 2025 Wisdom Works. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
