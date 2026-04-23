"use client";

import React from "react";
import { Clock } from "lucide-react";

interface TaskTimerOverlayProps {
  timeLeft: number;
  totalTime?: number;
}

export function TaskTimerOverlay({
  timeLeft,
  totalTime = 60,
}: TaskTimerOverlayProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md pointer-events-auto cursor-wait select-none">
      <div className="relative flex flex-col items-center gap-8 p-12 glass rounded-3xl border border-primary/20 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="relative w-48 h-48">
          {/* Background Circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
            <circle
              cx="96"
              cy="96"
              r={radius}
              className="stroke-muted/20 fill-none"
              strokeWidth="10"
            />
            {/* Progress Circle */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              className="stroke-primary fill-none transition-all duration-1000 ease-linear"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
            />
          </svg>

          {/* Timer Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <Clock className="w-6 h-6 text-primary/60 mb-1" />
            <span className="text-5xl font-bold font-mono text-primary tracking-tighter">
              {timeLeft}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              seconds left
            </span>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Task Verification
          </h2>
          <p className="text-muted-foreground text-sm max-w-[200px]">
            Please wait while we verify your activity. Do not refresh the page.
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  );
}
