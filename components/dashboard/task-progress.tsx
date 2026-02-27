interface TaskProgressProps {
  completed: number
  total: number
  dailyTarget: number
}

export function TaskProgress({ completed, total, dailyTarget }: TaskProgressProps) {
  const percentage = (completed / total) * 100
  const isOnTrack = completed >= dailyTarget

  return (
    <div className="glass p-6 rounded-xl">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Today's Task Progress</h3>
          <span className="text-sm text-foreground/60">
            {completed}/{total} completed
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span className="text-sm font-medium text-foreground/70 min-w-fit">{Math.round(percentage)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-foreground/60 mb-1">Daily Target</p>
          <p className="text-lg font-bold text-primary">{dailyTarget}</p>
        </div>
        <div>
          <p className="text-foreground/60 mb-1">Status</p>
          <p
            className={`text-lg font-bold ${isOnTrack ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}
          >
            {isOnTrack ? "On Track" : "Behind"}
          </p>
        </div>
      </div>
    </div>
  )
}
