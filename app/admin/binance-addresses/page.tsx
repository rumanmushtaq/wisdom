"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  Plus,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Check,
  Landmark,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BinanceAddress {
  _id: string;
  name: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

// Mock data - replace with API calls
const mockAddresses: BinanceAddress[] = [
  {
    _id: "1",
    name: "Primary USDT Wallet",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEbD",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Secondary BEP20",
    address: "0x8ba1B4C3d2E5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B",
    isActive: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function AdminBinanceAddressesPage() {
  const [addresses, setAddresses] = useState<BinanceAddress[]>([]);
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

  // Load addresses on mount
  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchAddresses = async () => {
    //   const response = await AdminService.getBinanceAddresses();
    //   setAddresses(response.data || []);
    // };
    setAddresses(mockAddresses);
    setIsLoading(false);
  }, []);

  const validateForm = () => {
    const newErrors: { name?: string; address?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Address name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Binance address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Please enter a valid wallet address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // TODO: Replace with actual API call
    // const response = await AdminService.createBinanceAddress({
    //   name: formData.name,
    //   address: formData.address,
    // });

    const newAddress: BinanceAddress = {
      _id: Date.now().toString(),
      name: formData.name,
      address: formData.address,
      isActive: addresses.length === 0, // First address is active by default
      createdAt: new Date().toISOString(),
    };

    setAddresses((prev) => [...prev, newAddress]);
    setFormData({ name: "", address: "" });
    setIsDialogOpen(false);

    toast({
      title: "Address Added",
      description: "Binance address has been added successfully.",
    });
  };

  const handleSelectActive = async (id: string) => {
    // TODO: Replace with actual API call
    // await AdminService.setActiveBinanceAddress(id);

    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isActive: addr._id === id,
      }))
    );

    toast({
      title: "Active Address Updated",
      description: "The selected address is now active for deposits.",
    });
  };

  const handleDeleteAddress = async (id: string) => {
    const addressToDelete = addresses.find((a) => a._id === id);
    
    if (addressToDelete?.isActive && addresses.length > 1) {
      toast({
        title: "Cannot Delete Active Address",
        description: "Please select another address as active before deleting this one.",
      });
      return;
    }

    // TODO: Replace with actual API call
    // await AdminService.deleteBinanceAddress(id);

    setAddresses((prev) => prev.filter((a) => a._id !== id));

    toast({
      title: "Address Deleted",
      description: "The address has been removed.",
    });
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
    return `${address.slice(0, 12)}...${address.slice(-12)}`;
  };

  const activeAddress = addresses.find((a) => a.isActive);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Landmark className="h-8 w-8 text-[#BFFF00]" />
                Binance Addresses
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage deposit addresses for users ({addresses.length} addresses)
              </p>
            </div>

            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#BFFF00] text-black hover:bg-[#BFFF00]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </div>

          {/* Active Address Banner */}
          {activeAddress && (
            <div className="mb-8 p-6 bg-[#BFFF00]/10 border border-[#BFFF00]/30 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-[#BFFF00]" />
                <h2 className="font-semibold text-white">Currently Active Address</h2>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-medium text-white">{activeAddress.name}</p>
                  <code className="text-sm text-[#BFFF00] font-mono">
                    {activeAddress.address}
                  </code>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(activeAddress.address, activeAddress._id)}
                  className="border-[#BFFF00]/30 text-[#BFFF00] hover:bg-[#BFFF00]/10"
                >
                  {copiedId === activeAddress._id ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy
                </Button>
              </div>
            </div>
          )}

          {/* Addresses List with Radio Selection */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin h-8 w-8 border-2 border-[#BFFF00] border-t-transparent rounded-full" />
            </div>
          ) : addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-[#1a1a1a] border border-white/10 rounded-xl">
              <Building2 className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg font-medium">No addresses yet</p>
              <p className="text-sm mt-1">Add your first Binance deposit address</p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="mt-6 bg-[#BFFF00] text-black hover:bg-[#BFFF00]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
              <RadioGroup
                value={activeAddress?._id}
                onValueChange={handleSelectActive}
                className="divide-y divide-white/5"
              >
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className={`p-6 hover:bg-white/5 transition-colors ${
                      address.isActive ? "bg-[#BFFF00]/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Radio Button */}
                      <RadioGroupItem
                        value={address._id}
                        id={address._id}
                        className="mt-1 border-white/30 data-[state=checked]:border-[#BFFF00] data-[state=checked]:bg-[#BFFF00]"
                      />

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <label
                            htmlFor={address._id}
                            className="font-semibold text-white cursor-pointer"
                          >
                            {address.name}
                          </label>
                          {address.isActive && (
                            <span className="px-2 py-0.5 bg-[#BFFF00]/20 text-[#BFFF00] text-xs font-medium rounded-full">
                              Active
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <code className="text-sm text-gray-400 font-mono">
                            {truncateAddress(address.address)}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(address.address, address._id)}
                            className="h-7 w-7 text-gray-500 hover:text-[#BFFF00] hover:bg-[#BFFF00]/10"
                          >
                            {copiedId === address._id ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <p className="text-xs text-gray-600 mt-2">
                          Added {new Date(address.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteAddress(address._id)}
                        className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#1a1a1a] border border-white/10 rounded-xl">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#BFFF00]" />
                How It Works
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#BFFF00]">1.</span>
                  Add multiple Binance deposit addresses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#BFFF00]">2.</span>
                  Select one address as active using the radio button
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#BFFF00]">3.</span>
                  Users will see the active address for deposits
                </li>
              </ul>
            </div>

            <div className="p-6 bg-[#1a1a1a] border border-white/10 rounded-xl">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#BFFF00]" />
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#BFFF00]">•</span>
                  Only one address can be active at a time
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#BFFF00]">•</span>
                  You cannot delete the active address
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#BFFF00]">•</span>
                  Changes are immediately visible to users
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Add Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Add Binance Address</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new deposit address for users. You can add multiple addresses and select one as active.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateAddress} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Address Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Primary USDT Wallet"
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
                Binance Address
              </Label>
              <Input
                id="address"
                placeholder="Enter BEP-20 wallet address"
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
                Add Address
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
