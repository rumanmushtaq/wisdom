"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WalletAddressDisplayProps {
  address: string;
}

export function WalletAddressDisplay({ address }: WalletAddressDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast({
        title: "Address Copied!",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 bg-secondary/50 rounded-xl border border-border/50">
      <div className="flex items-center justify-between gap-3">
        <code className="flex-1 font-mono text-sm break-all text-foreground/90">
          {address}
        </code>
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className={`flex-shrink-0 transition-all duration-300 ${
            copied
              ? "bg-success/20 border-success text-success"
              : "hover:bg-primary/10 hover:border-primary hover:text-primary"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1.5" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
