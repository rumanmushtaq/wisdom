"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import useWithdraws from "./useWithdraws";
import WithdrawsForm from "@/components/withdraws";

interface WithdrawalHistory {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "processing" | "completed";
  address: string;
  txId?: string;
}

// Mock data
const mockWithdrawalHistory: WithdrawalHistory[] = [
  {
    id: "1",
    amount: 200,
    date: "2025-11-09",
    status: "completed",
    address: "0xabcd...ef01",
    txId: "0x1111...2222",
  },
  {
    id: "2",
    amount: 150,
    date: "2025-11-06",
    status: "completed",
    address: "0xefgh...ij23",
    txId: "0x3333...4444",
  },
];

const mockSavedAddresses = [
  {
    id: "1",
    label: "My Main Wallet",
    address: "0xabcd1234abcd1234abcd1234abcd1234abcd1234",
  },
  {
    id: "2",
    label: "Exchange Wallet",
    address: "0xefgh5678efgh5678efgh5678efgh5678efgh5678",
  },
];

export default function WithdrawPage() {
  const {user, usersWallets, isSubmitting, setIsSubmitting} = useWithdraws()
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(
    mockSavedAddresses[0].id,
  );

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const availableBalance = 3450.23;
  const withdrawalFee = withdrawAmount
    ? (Number.parseFloat(withdrawAmount) * 0.01).toFixed(2)
    : "0";
  const netAmount = withdrawAmount
    ? (
        Number.parseFloat(withdrawAmount) - Number.parseFloat(withdrawalFee)
      ).toFixed(2)
    : "0";

  const handleWithdraw = async () => {
    if (!withdrawAmount || !selectedAddress) return;

    setIsSubmitting(true);
    // TODO: Submit withdrawal to API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setWithdrawAmount("");
    setIsSubmitting(false);
  };

  const handleAddAddress = async () => {
    if (!newAddress || !newLabel) return;
    // TODO: Save new address to API
    setNewAddress("");
    setNewLabel("");
    setShowAddressForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
        );
      case "processing":
        return (
          <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 animate-spin" />
        );
      case "pending":
        return (
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        );
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "processing":
        return "Processing";
      case "pending":
        return "Pending";
      default:
        return "";
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Withdraw Funds
            </h1>
            <p className="text-foreground/60">
              Withdraw your earnings to your BEP-20 wallet
            </p>
          </div>

          {/* Withdrawal Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
             <WithdrawsForm user={user} usersWallets={usersWallets}/>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-4">
              <div className="glass p-4 rounded-xl">
                <h3 className="font-semibold mb-3">Withdrawal Info</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  <p>
                    <span className="font-medium block text-foreground mb-1">
                      Minimum:
                    </span>
                    $10 USDT
                  </p>
                  <p>
                    <span className="font-medium block text-foreground mb-1">
                      Maximum:
                    </span>
                    {availableBalance} USDT
                  </p>
                  <p>
                    <span className="font-medium block text-foreground mb-1">
                      Network Fee:
                    </span>
                    1% of amount
                  </p>
                  <p>
                    <span className="font-medium block text-foreground mb-1">
                      Processing Time:
                    </span>
                    1-5 minutes
                  </p>
                </div>
              </div>

              <div className="glass p-4 rounded-xl bg-info/5 border border-info/20">
                <p className="text-sm text-foreground/70">
                  Withdrawals are processed automatically. Check your wallet
                  within a few minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Withdrawal History */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-6">Withdrawal History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Address
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-foreground/60 font-medium">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockWithdrawalHistory.map((withdrawal) => (
                    <tr
                      key={withdrawal.id}
                      className="border-b border-border/10 hover:bg-card/30 transition-colors"
                    >
                      <td className="py-3 px-4">{withdrawal.date}</td>
                      <td className="py-3 px-4 font-semibold">
                        ${withdrawal.amount}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-foreground/70">
                        {withdrawal.address}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(withdrawal.status)}
                          <span className="text-foreground/70">
                            {getStatusLabel(withdrawal.status)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-foreground/70">
                        {withdrawal.txId || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
