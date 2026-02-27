interface TeamMember {
  id: string
  username: string
  avatar: string
  totalEarned: number
  joinedDate: string
}

interface TeamOverviewProps {
  totalReferrals: number
  totalTeamSize: number
  totalTeamEarnings: number
  recentMembers: TeamMember[]
}

export function TeamOverview({ totalReferrals, totalTeamSize, totalTeamEarnings, recentMembers }: TeamOverviewProps) {
  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Your Team</h3>
        <a href="/refer" className="text-primary hover:text-primary/80 text-sm font-medium">
          View All
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-foreground/60 text-sm mb-1">Direct Referrals</p>
          <p className="text-2xl font-bold text-primary">{totalReferrals}</p>
        </div>
        <div>
          <p className="text-foreground/60 text-sm mb-1">Total Team</p>
          <p className="text-2xl font-bold text-primary">{totalTeamSize}</p>
        </div>
        <div>
          <p className="text-foreground/60 text-sm mb-1">Team Earnings</p>
          <p className="text-2xl font-bold text-success">{totalTeamEarnings.toFixed(2)}</p>
        </div>
      </div>

      {recentMembers.length > 0 && (
        <div className="border-t border-border/20 pt-4">
          <p className="text-sm font-medium text-foreground/70 mb-3">Recent Members</p>
          <div className="space-y-3">
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {member.username.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{member.username}</p>
                    <p className="text-xs text-foreground/50">{member.joinedDate}</p>
                  </div>
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium">+{member.totalEarned.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
