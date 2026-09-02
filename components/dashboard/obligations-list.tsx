"use client";

import React, { useState } from "react";
import { OBLIGATIONS, Obligation } from "@/lib/data";
import { Clock, CheckCircle2, ChevronRight, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ObligationsList() {
  const [obligations, setObligations] = useState<Obligation[]>(OBLIGATIONS);

  const toggleComplete = (id: string) => {
    setObligations((prev) =>
      prev.map((ob) =>
        ob.id === id
          ? {
              ...ob,
              status: ob.status === "Completed" ? "Pending" : "Completed",
            }
          : ob
      )
    );
  };

  const pendingCount = obligations.filter((o) => o.status !== "Completed").length;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Upcoming Obligations
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Time-sensitive legal deadlines and covenants
          </p>
        </div>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/20">
          {pendingCount} actions
        </span>
      </div>

      <div className="divide-y divide-border/60">
        {obligations.map((ob) => {
          const isUrgent = ob.dueInDays <= 7;
          const isCompleted = ob.status === "Completed";

          return (
            <div
              key={ob.id}
              className={cn(
                "group flex items-start justify-between gap-3 py-3 transition-colors",
                isCompleted && "opacity-50"
              )}
            >
              <div className="flex items-start gap-3 min-w-0">
                <button
                  onClick={() => toggleComplete(ob.id)}
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border bg-secondary transition-colors hover:border-primary"
                  title={isCompleted ? "Mark incomplete" : "Mark complete"}
                >
                  {isCompleted && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate text-xs font-medium text-foreground",
                      isCompleted && "line-through text-muted-foreground"
                    )}
                  >
                    {ob.title}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground mt-0.5">
                    {ob.contractName}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                <span
                  className={cn(
                    "text-[11px] font-semibold",
                    isUrgent ? "text-warning font-bold" : "text-muted-foreground"
                  )}
                >
                  In {ob.dueInDays} days
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-muted-foreground">
                    {ob.assignee.initials}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {ob.assignee.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 mt-2 border-t border-border">
        <Link
          href="/workspace"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/40 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <span>View all obligations & compliance audit</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
