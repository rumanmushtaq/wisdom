"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskFilter } from "@/components/tasks/task-filter";
import { TaskModal } from "@/components/tasks/task-modal";
import useTasks from "./useTasks";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type TaskStatus = "all" | "PENDING" | "IN_PROGRESS" | "COMPLETED";

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  duration: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  fullDescription: string;
  requirements: string[];
}

export default function TasksPage() {
  const { myTasks, loader, timeLeft,user, handleTaskAction, handleToAddCreditsOfUser } =
    useTasks();
  const [filter, setFilter] = useState<TaskStatus>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks =
    filter === "all"
      ? myTasks
      : myTasks?.filter((task: any) => task.taskId.status === filter);

  const taskCounts = {
    all: myTasks?.length,
    PENDING: myTasks?.filter((t: any) => t.userStatus === "PENDING").length,
    IN_PROGRESS: myTasks?.filter(
      (t: any) => t.userStatus === "IN_PROGRESS"
    ).length,
    COMPLETED: myTasks?.filter((t: any) => t.userStatus === "COMPLETED").length,
  };

  const allTasksCompleted =
    myTasks?.length > 0 &&
    myTasks.every((task: any) => task.userStatus === "COMPLETED");
  
  const canClaim =
  allTasksCompleted &&
  (!user.lastClaimedAt ||
    new Date(user.lastClaimedAt).toDateString() !== new Date().toDateString());

  const handleModalSubmit = async (taskId: string) => {
    // TODO: Submit task completion to API
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Available Tasks
            </h1>
            <p className="text-foreground/60">
              Complete tasks to earn crypto rewards instantly
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8">
            <TaskFilter
              onFilterChange={(status) => setFilter(status)}
              counts={taskCounts}
            />
          </div>

          {/* Tasks Grid */}
          <div className="space-y-4">
            {loader.data ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : filteredTasks?.length > 0 ? (
              filteredTasks.map((task: any, index: number) => (
                <TaskCard
                  key={index}
                  {...task.taskId}
                  loader={loader}
                  timeLeft={timeLeft}
                  onAction={handleTaskAction}
                />
              ))
            ) : (
              <div className="glass p-12 rounded-xl text-center">
                <p className="text-foreground/60 text-lg mb-4">
                  No tasks found in this category.
                </p>
                <p className="text-foreground/50">
                  Check back later for more tasks or complete tasks from other
                  categories.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Full-width button at bottom */}
        <div className="fixed bottom-0 left-0 w-full px-4 py-3 bg-background shadow-lg">
          <Button
            className={`w-full py-4 font-semibold rounded-lg transition-all duration-300 ${
              canClaim
                ? "bg-primary hover:bg-primary/90 cursor-pointer "
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!canClaim}
            onClick={handleToAddCreditsOfUser}
          >
            {canClaim
              ? "All Today's Tasks Completed 🎉"
              : "Complete all tasks to unlock"}
          </Button>
        </div>

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          task={selectedTask || undefined}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={handleModalSubmit}
        />
      </main>
    </>
  );
}
