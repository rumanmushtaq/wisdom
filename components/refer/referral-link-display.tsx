"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Share2 } from "lucide-react"

interface ReferralLinkDisplayProps {
  referralCode: string
  referralLink: string
}

export function ReferralLinkDisplay({ referralCode, referralLink }: ReferralLinkDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Wisdom Works",
          text: "Earn crypto by completing tasks! Use my referral link:",
          url: referralLink,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="glass p-6 rounded-xl">
        <h3 className="font-semibold mb-4">Your Referral Code</h3>
        <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg font-mono text-lg font-bold text-primary text-center break-all">
          {referralCode}
        </div>

        <div className="mb-4">
          <p className="text-sm text-foreground/60 mb-2">Your Referral Link</p>
          <div className="flex items-center gap-2 p-3 bg-card/50 border border-border/20 rounded-lg">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-transparent border-none outline-none text-sm truncate font-mono"
            />
            <Button onClick={handleCopy} variant="ghost" size="sm" className="p-2 h-auto">
              {copied ? <Check className="h-4 w-4 text-green-600 dark:text-green-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCopy} className="flex-1 bg-primary hover:bg-primary/90 rounded-lg">
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex-1 rounded-lg bg-transparent">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="glass p-4 rounded-xl bg-info/5 border border-info/20">
        <p className="text-sm text-foreground/70">
          Share your referral link with friends. Earn 10% commission on their task earnings.
        </p>
      </div>
    </div>
  )
}
