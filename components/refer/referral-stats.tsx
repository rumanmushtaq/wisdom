interface ReferralStatsProps {
  directReferrals: number
  totalTeamSize: number
  totalEarned: number
  todayEarned: number
  weekEarned: number
}

export function ReferralStats({
  directReferrals,
  totalTeamSize,
  totalEarned,
  todayEarned,
  weekEarned,
}: ReferralStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="glass p-4 rounded-xl">
        <p className="text-sm text-foreground/60 mb-1">Direct Referrals</p>
        <p className="text-3xl font-bold text-primary">{directReferrals}</p>
        <p className="text-xs text-foreground/50 mt-1">People you invited</p>
      </div>

      <div className="glass p-4 rounded-xl">
        <p className="text-sm text-foreground/60 mb-1">Team Size</p>
        <p className="text-3xl font-bold text-primary">{totalTeamSize}</p>
        <p className="text-xs text-foreground/50 mt-1">Including sub-referrals</p>
      </div>

      <div className="glass p-4 rounded-xl">
        <p className="text-sm text-foreground/60 mb-1">Total Earned</p>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalEarned.toFixed(2)}</p>
        <p className="text-xs text-foreground/50 mt-1">All time</p>
      </div>

      <div className="glass p-4 rounded-xl">
        <p className="text-sm text-foreground/60 mb-1">Today</p>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{todayEarned.toFixed(2)}</p>
        <p className="text-xs text-foreground/50 mt-1">Referral earnings</p>
      </div>

      <div className="glass p-4 rounded-xl">
        <p className="text-sm text-foreground/60 mb-1">This Week</p>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{weekEarned.toFixed(2)}</p>
        <p className="text-xs text-foreground/50 mt-1">Referral earnings</p>
      </div>
    </div>
  )
}
