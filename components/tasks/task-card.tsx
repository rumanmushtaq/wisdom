"use client";

import { Button } from "@/components/ui/button";
import { Clock, Award, ArrowRight } from "lucide-react";

interface TaskCardProps {
  id: string;
  _id: string;
  title: string;
  description: string;
  websiteUrl: string;
  reward: number;
  loader: { start: {
    load : boolean,
    id: string | null
  } };
  timeLeft: number;
  verificationDuration: number;
  status: "available" | "PENDING" | "IN_PROGRESS" | "COMPLETED";
  onAction?: (taskId: string, stage: string) => void;
}

export function TaskCard({
  _id,
  title,
  description,
  reward,
  timeLeft,
  websiteUrl,
  verificationDuration,
  status,
  loader,
  onAction,
}: TaskCardProps) {
  const statusStyles = {
    available: "bg-primary/10 border-primary/20 hover:border-primary/40",
    PENDING: "bg-primary/10 border-primary/20 hover:border-primary/40",
    IN_PROGRESS: "bg-amber-500/10 border-amber-500/20",
    COMPLETED: "bg-green-500/10 border-green-500/20 opacity-75",
  };

  const statusLabels = {
    available: "Available",
    PENDING: "PENDING",
    IN_PROGRESS: "In Progress",
    COMPLETED: "COMPLETED",
  };

  const statusColors = {
    available: "text-foreground/70",
    IN_PROGRESS: "text-amber-600 dark:text-amber-400 font-medium",
    PENDING: "text-amber-600 dark:text-amber-400 font-medium",
    COMPLETED: "text-green-600 dark:text-green-400 font-medium",
  };

  return (
    <div
      className={`glass p-6 rounded-xl border transition-all duration-300 ${statusStyles[status]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1 text-foreground">
            {title}
          </h3>
          <p className="text-foreground/60 text-sm">{description}</p>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full bg-foreground/5 ${statusColors[status]} whitespace-nowrap ml-2`}
        >
          {statusLabels[status]}
        </span>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4 mb-4 py-3 border-t border-b border-border/20">
          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-primary" />
            {/* <span className="font-medium">{reward.toFixed(2)} USDT</span> */}
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <Clock className="h-4 w-4" />
            <span>{verificationDuration} min</span>
          </div>
        </div>
        <div>
          {(loader.start.load && loader.start.id === _id) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Time left:</span>
              <span className="font-semibold text-primary">{timeLeft}s</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {status === "PENDING" && (
          <Button
            onClick={() => {
              if (websiteUrl) {
                window.open(websiteUrl, "_blank", "noopener,noreferrer");
              }
              onAction?.(_id, "start");
            }}
            className="flex-1 bg-primary hover:bg-primary/90 rounded-lg cursor-pointer"
            size="sm"
            disabled={loader?.start?.load}
          >
            Start Task
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        {status === "IN_PROGRESS" && (
          <Button
            onClick={() => onAction?.(_id, "complete")}
            variant="outline"
            disabled={loader?.start?.load}
            className="flex-1 rounded-lg cursor-pointer"
            size="sm"
          >
            Complete Task
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        {status === "COMPLETED" && (
          <Button
            disabled
            variant="outline"
            className="flex-1 rounded-lg bg-transparent cursor-pointer"
            size="sm"
          >
            Completed
          </Button>
        )}
      </div>
    </div>
  );
}
