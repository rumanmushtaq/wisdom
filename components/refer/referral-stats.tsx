import Stats from "./stats"
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
      <Stats value={directReferrals} label="Direct Referrals" />
      <Stats value={totalTeamSize} label="Team Size" />
      <Stats value={totalEarned} label="Total Earned" />
      <Stats value={todayEarned} label="Today" />
      <Stats value={weekEarned} label="This Week" />
    </div>
  )
}
