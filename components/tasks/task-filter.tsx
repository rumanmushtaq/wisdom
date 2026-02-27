"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type TaskStatus = "all" | "PENDING" | "IN_PROGRESS" | "COMPLETED"

interface TaskFilterProps {
  onFilterChange?: (status: TaskStatus) => void
  counts?: Partial<Record<TaskStatus, number>>
}

export function TaskFilter({ onFilterChange, counts }: TaskFilterProps) {
  const [activeFilter, setActiveFilter] = useState<TaskStatus>("all")

  const filters: { label: string; value: TaskStatus }[] = [
    { label: "All Tasks", value: "all" },
    { label: "Available", value: "PENDING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
  ]

  const handleFilterChange = (value: TaskStatus) => {
    setActiveFilter(value)
    onFilterChange?.(value)
  }

  return (
    <div className="glass p-4 rounded-xl flex flex-wrap gap-2">
      {filters.map((filter) => {
        const count = counts?.[filter.value] ?? 0

        return (
          <Button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            variant={activeFilter === filter.value ? "default" : "outline"}
            size="sm"
            className="rounded-lg"
          >
            {filter.label}

            {count > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-foreground/10 rounded-full text-xs">
                {count}
              </span>
            )}
          </Button>
        )
      })}
    </div>
  )
}