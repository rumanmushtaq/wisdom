"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const earningsData = [
  { date: "Mon", tasks: 12.5, referrals: 5.2, total: 17.7 },
  { date: "Tue", tasks: 15.3, referrals: 6.1, total: 21.4 },
  { date: "Wed", tasks: 10.8, referrals: 7.5, total: 18.3 },
  { date: "Thu", tasks: 18.2, referrals: 4.9, total: 23.1 },
  { date: "Fri", tasks: 22.1, referrals: 8.3, total: 30.4 },
  { date: "Sat", tasks: 19.5, referrals: 9.2, total: 28.7 },
  { date: "Sun", tasks: 16.7, referrals: 6.8, total: 23.5 },
]

export function EarningChart() {
  return (
    <div className="glass p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-6">Earnings Overview (7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={earningsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          <Bar dataKey="tasks" fill="var(--chart-1)" name="Tasks" radius={[8, 8, 0, 0]} />
          <Bar dataKey="referrals" fill="var(--chart-2)" name="Referrals" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
