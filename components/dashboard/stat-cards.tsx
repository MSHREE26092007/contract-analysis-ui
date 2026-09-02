import React from "react";
import { STATS } from "@/lib/data";
import {
  FileText,
  Clock,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCards() {
  const icons = [FileText, Clock, AlertTriangle, DollarSign];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat, idx) => {
        const Icon = icons[idx % icons.length];
        const isTrendUp = stat.trend === "up";
        const isNegativeGood = stat.title.includes("High Risk");

        return (
          <div
            key={stat.title}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-border/80 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:text-primary group-hover:bg-primary/10">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                  isNegativeGood
                    ? "bg-emerald-500/10 text-emerald-400"
                    : isTrendUp
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400"
                )}
              >
                {isTrendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold tracking-tight text-foreground tabular-nums">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground font-medium">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
