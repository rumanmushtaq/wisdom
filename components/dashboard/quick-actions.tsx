"use client"

import Link from "next/link"
import { ArrowUp, ArrowDown, Users, Zap } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      label: "Deposit",
      icon: ArrowDown,
      href: "/deposit",
      color: "primary",
      description: "Add funds",
    },
    {
      label: "Withdraw",
      icon: ArrowUp,
      href: "/withdraw",
      color: "success",
      description: "Claim earnings",
    },
    {
      label: "Tasks",
      icon: Zap,
      href: "/tasks",
      color: "warning",
      description: "Start earning",
    },
    {
      label: "Refer",
      icon: Users,
      href: "/refer",
      color: "info",
      description: "Invite friends",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon
        const colorClasses = {
          primary: "bg-primary/10 text-primary hover:bg-primary/20",
          success: "bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400",
          warning: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400",
          info: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400",
        }

        return (
          <Link key={action.href} href={action.href}>
            <button
              className={`w-full glass p-4 rounded-xl text-center group transition-all duration-300 border border-border/20 hover:border-primary/40 ${colorClasses[action.color as keyof typeof colorClasses]}`}
            >
              <Icon className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm">{action.label}</div>
              <div className="text-xs text-foreground/50 group-hover:text-foreground/70">{action.description}</div>
            </button>
          </Link>
        )
      })}
    </div>
  )
}
