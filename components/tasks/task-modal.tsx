"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Clock, Award, CheckCircle } from "lucide-react"

interface TaskModalProps {
  isOpen: boolean
  task?: {
    id: string
    title: string
    description: string
    reward: number
    duration: number
    fullDescription: string
    requirements: string[]
  }
  onClose: () => void
  onSubmit: (taskId: string) => Promise<void>
}

export function TaskModal({ isOpen, task, onClose, onSubmit }: TaskModalProps) {
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  if (!isOpen || !task) return null

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit(task.id)
      setCompleted(true)
      setTimeout(onClose, 1500)
    } catch (error) {
      console.error("Error submitting task:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass w-full max-w-md rounded-xl p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-foreground/10 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {completed ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Task Completed!</h3>
            <p className="text-foreground/70 mb-4">
              You earned{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">{task.reward.toFixed(2)} USDT</span>
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                Task Reward
              </span>
              <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
              <p className="text-foreground/70">{task.description}</p>
            </div>

            <div className="bg-card/50 p-4 rounded-lg mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-foreground/60">Reward</p>
                  <p className="font-semibold text-lg">{task.reward.toFixed(2)} USDT</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="text-sm text-foreground/60">Duration</p>
                  <p className="font-semibold">{task.duration} minutes</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Task Details</h4>
              <p className="text-sm text-foreground/70 mb-4">{task.fullDescription}</p>
              <h4 className="font-semibold mb-2 text-sm">Requirements</h4>
              <ul className="space-y-2">
                {task.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <Button onClick={onClose} variant="outline" className="flex-1 rounded-lg bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90 rounded-lg"
              >
                {loading ? "Submitting..." : "Submit Task"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
