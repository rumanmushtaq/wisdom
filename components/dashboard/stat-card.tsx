import type React from "react"
interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
  icon?: React.ReactNode
  trend?: { value: number; isPositive: boolean }
  color?: "primary" | "success" | "warning" | "info"
}

export function StatCard({ label, value, subtext, icon, trend, color = "primary" }: StatCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-green-500/10 text-green-600 dark:text-green-400",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  }

  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-foreground/60 text-sm font-medium mb-1">{label}</p>
          <div className="text-2xl sm:text-3xl font-bold text-foreground">{value}</div>
          {subtext && <p className="text-xs text-foreground/50 mt-1">{subtext}</p>}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>{icon}</div>
        )}
      </div>
      {trend && (
        <div
          className={`text-xs font-medium ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-destructive"}`}
        >
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
        </div>
      )}
    </div>
  )
}
