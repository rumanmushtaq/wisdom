"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Eye, EyeOff } from "lucide-react"

interface WalletAddressDisplayProps {
  address: string
  onCopy?: () => void
}

export function WalletAddressDisplay({ address, onCopy }: WalletAddressDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [showFull, setShowFull] = useState(false)

  const maskedAddress = `${address.slice(0, 6)}...${address.slice(-6)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    onCopy?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border/20">
        <div>
          <p className="text-sm text-foreground/60 mb-1">Your BEP-20 Address</p>
          <p className="font-mono text-sm font-medium break-all">{showFull ? address : maskedAddress}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowFull(!showFull)} variant="ghost" size="sm" className="p-2 h-auto">
            {showFull ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button onClick={handleCopy} variant="ghost" size="sm" className="p-2 h-auto">
            {copied ? <Check className="h-4 w-4 text-green-600 dark:text-green-400" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
