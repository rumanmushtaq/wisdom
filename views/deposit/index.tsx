"use client";
import { Wallet, Shield, Clock, DollarSign } from "lucide-react";
import {  DepositsTable } from "@/components/deposits/table";
import { DepositForm } from "@/components/deposits/form";
import { WalletAddressDisplay } from "@/components/deposits/walletAddress";
import useDeposit from "./useDeposit";
import { Button } from "@/components/ui/button";

const BINANCE_WALLET_ADDRESS = "TRC20:TYourBinanceWalletAddressHere1234567890";

interface DepositFormProps {
  onSubmit: (data: {
    amount: string;
    transactionId: string;
    paymentProof: string;
  }) => void;
}
export default function Index() {
  const {
    packages,
    selectedPackage,
    setSelectedPackage,
    pendingCount,
    approvedTotal,
    deposits,
    handleDepositSubmit,
  } = useDeposit();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Deposit Portal</h1>
                <p className="text-xs text-muted-foreground">Secure Payments</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pending/10 text-pending text-sm">
                <Clock className="w-4 h-4" />
                <span>{pendingCount} pending</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm">
                <DollarSign className="w-4 h-4" />
                <span>${approvedTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            Make a <span className="text-gradient">Deposit</span>
          </h2>
          <p className="text-muted-foreground">
            Send USDT to our Binance wallet and upload your payment proof for
            verification
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Instructions & Form */}
          <div className="space-y-6 animate-slide-up">
            {/* Wallet Address Card */}
            <div
              className="glass p-6 rounded-xl border 
                shadow-sm hover:shadow-md 
                hover:border-primary shadow-primary/20
                transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Binance Wallet Address</h3>
                  <p className="text-xs text-muted-foreground">
                    Send USDT to this address
                  </p>
                </div>
              </div>
              <WalletAddressDisplay address={BINANCE_WALLET_ADDRESS} />
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="glass p-6 rounded-xl border 
                shadow-sm hover:shadow-md 
                hover:border-primary 
                transition-all duration-300"
              >
                <div className="text-2xl font-bold text-primary mb-1">$10</div>
                <p className="text-xs text-muted-foreground">Minimum Deposit</p>
              </div>
              <div
                className="glass p-6 rounded-xl border 
                shadow-sm hover:shadow-md 
                hover:border-primary 
                transition-all duration-300"
              >
                <div className="text-2xl font-bold text-accent mb-1">24h</div>
                <p className="text-xs text-muted-foreground">Processing Time</p>
              </div>
            </div>

            {/* Deposit Steps */}
            <div
              className="glass p-6 rounded-xl border 
                shadow-sm hover:shadow-md 
                hover:border-primary 
                shadow-primary/20
                transition-all duration-300"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                How to Deposit
              </h3>
              <ol className="space-y-3">
                {[
                  "Copy the Binance wallet address above",
                  "Open your Binance app and send USDT",
                  "Take a screenshot of the payment confirmation",
                  "Fill in the form and upload your proof",
                  "Wait for admin approval (usually within 24h)",
                ].map((step, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground/70">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Column - Deposit Form */}
          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div
              className="glass p-6 rounded-xl border 
                shadow-sm hover:shadow-md 
                hover:border-primary 
                shadow-primary/20
                transition-all duration-300 sticky top-24"
            >
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Submit Your Deposit
              </h3>
              <DepositForm onSubmit={handleDepositSubmit} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {packages?.map((pkg, index: number) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl border transition-all duration-300 ${
                pkg._id === selectedPackage
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
                onClick={() => pkg?._id && setSelectedPackage(pkg._id)}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>

        {/* Deposits Table */}
        <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h3 className="text-xl font-semibold mb-4">Deposit History</h3>
          <DepositsTable deposits={deposits} />
        </div>
      </div>
    </main>
  );
}
