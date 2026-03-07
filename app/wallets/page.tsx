"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Wallet,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WalletService from "@/services/withdraws";

interface WalletItem {
  _id?: string;
  name: string;
  address: string;
  createdAt?: string;
}

const MAX_WALLETS = 3;

export default function WalletsPage() {
  const [wallets, setWallets] = useState<WalletItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });
  const [errors, setErrors] = useState<{ name?: string; address?: string }>({});

  // Load wallets on mount
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        setIsLoading(true);
        const response = await WalletService.getAllWallets();
        if (response?.data) {
          setWallets(response.data);
        } else if (Array.isArray(response)) {
          setWallets(response);
        } else {
          setWallets([]);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error?.response?.data?.message || "Failed to load wallets",
        });
        setWallets([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWallets();
  }, [toast]);

  const validateForm = () => {
    const newErrors: { name?: string; address?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Wallet name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Wallet address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Please enter a valid wallet address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (wallets.length >= MAX_WALLETS) {
      toast({
        title: "Limit Reached",
        description: `You can only create up to ${MAX_WALLETS} wallets.`,
      });
      return;
    }

    try {
      const response = await WalletService.createWallets({
        name: formData.name,
        address: formData.address,
      });

      const newWallet: WalletItem = response?.data || {
        _id: Date.now().toString(),
        name: formData.name,
        address: formData.address,
        createdAt: new Date().toISOString(),
      };

      setWallets((prev) => [...prev, newWallet]);
      setFormData({ name: "", address: "" });
      setIsDialogOpen(false);

      toast({
        title: "Wallet Created",
        description: "Your wallet has been added successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to create wallet",
      });
    }
  };

  const handleDeleteWallet = async (id: string) => {
    try {
      await WalletService.deleteWallet(id);
      setWallets((prev) => prev.filter((w) => w._id !== id));
      toast({
        title: "Wallet Deleted",
        description: "Your wallet has been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to delete wallet",
      });
    }
  };

  const copyToClipboard = async (address: string, id: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
      });
    }
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 20) return address;
    return `${address.slice(0, 10)}...${address.slice(-10)}`;
  };

  const canCreateMore = wallets.length < MAX_WALLETS;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Wallet className="h-8 w-8 text-[#BFFF00]" />
                My Wallets
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your withdrawal wallets ({wallets.length}/{MAX_WALLETS})
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#BFFF00] text-black hover:bg-[#BFFF00]/90"
                  disabled={!canCreateMore}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Wallet
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a1a] border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Wallet</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Add a new wallet address for withdrawals. You can create up to {MAX_WALLETS} wallets.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleCreateWallet} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Wallet Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., Main Wallet, Binance Wallet"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="bg-[#0a0a0a] border-white/10 text-white mt-1.5"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-gray-300">
                      Wallet Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="Enter your BEP-20 wallet address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, address: e.target.value }))
                      }
                      className="bg-[#0a0a0a] border-white/10 text-white mt-1.5 font-mono text-sm"
                    />
                    {errors.address && (
                      <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1 border-white/10 hover:bg-white/5"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#BFFF00] text-black hover:bg-[#BFFF00]/90"
                    >
                      Create Wallet
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Limit Warning */}
          {!canCreateMore && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <p className="text-yellow-400 text-sm">
                You have reached the maximum limit of {MAX_WALLETS} wallets. Delete an existing wallet to add a new one.
              </p>
            </div>
          )}

          {/* Wallets Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin h-8 w-8 border-2 border-[#BFFF00] border-t-transparent rounded-full" />
            </div>
          ) : wallets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-[#1a1a1a] border border-white/10 rounded-xl">
              <Wallet className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg font-medium">No wallets yet</p>
              <p className="text-sm mt-1">Add your first wallet to start withdrawing</p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="mt-6 bg-[#BFFF00] text-black hover:bg-[#BFFF00]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Wallet
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallets.map((wallet) => (
                <div
                  key={wallet._id}
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 hover:border-[#BFFF00]/30 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#BFFF00]/20 rounded-lg flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-[#BFFF00]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{wallet.name}</h3>
                        <p className="text-xs text-gray-500">
                          Added {new Date(wallet.createdAt || "").toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteWallet(wallet._id!)}
                      className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Wallet Address</p>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-sm text-gray-300 font-mono">
                        {truncateAddress(wallet.address)}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(wallet.address, wallet._id!)}
                        className="h-7 w-7 text-gray-500 hover:text-[#BFFF00] hover:bg-[#BFFF00]/10"
                      >
                        {copiedId === wallet._id ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {copiedId === wallet._id && (
                    <p className="text-green-400 text-xs mt-2">Copied to clipboard!</p>
                  )}
                </div>
              ))}

              {/* Add New Card (if less than max) */}
              {canCreateMore && (
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-[#BFFF00]/50 hover:bg-[#BFFF00]/5 transition-all group min-h-[180px]"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 group-hover:border-[#BFFF00]/50 flex items-center justify-center">
                    <Plus className="h-6 w-6 text-gray-500 group-hover:text-[#BFFF00]" />
                  </div>
                  <span className="text-gray-500 group-hover:text-[#BFFF00] font-medium">
                    Add New Wallet
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-12 p-6 bg-[#1a1a1a] border border-white/10 rounded-xl">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[#BFFF00]" />
              Important Information
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-[#BFFF00]">•</span>
                You can add up to {MAX_WALLETS} wallet addresses for withdrawals
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BFFF00]">•</span>
                Make sure to enter the correct BEP-20 (Binance Smart Chain) address
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BFFF00]">•</span>
                Withdrawals to incorrect addresses cannot be recovered
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#BFFF00]">•</span>
                You can delete and add new wallets at any time
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
