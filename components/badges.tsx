import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface RiskBadgeProps {
  risk: "Low" | "Medium" | "High";
  score?: number;
  className?: string;
  showIcon?: boolean;
}

export function RiskBadge({ risk, score, className, showIcon = true }: RiskBadgeProps) {
  const configs = {
    Low: {
      bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400",
      icon: CheckCircle2,
      label: "Low risk",
    },
    Medium: {
      bg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      dot: "bg-amber-400",
      icon: AlertCircle,
      label: "Medium risk",
    },
    High: {
      bg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      dot: "bg-rose-400",
      icon: AlertTriangle,
      label: "High risk",
    },
  };

  const config = configs[risk] || configs.Low;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight",
        config.bg,
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3 shrink-0" />}
      <span>{config.label}</span>
      {score !== undefined && (
        <span className="opacity-75 font-mono text-[11px]">({score})</span>
      )}
    </span>
  );
}

interface StatusBadgeProps {
  status: "Active" | "Under Review" | "Draft" | "Expired";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const configs = {
    Active: {
      bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400 animate-pulse",
    },
    "Under Review": {
      bg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
      dot: "bg-sky-400",
    },
    Draft: {
      bg: "bg-slate-500/10 text-slate-400 border-slate-500/20",
      dot: "bg-slate-400",
    },
    Expired: {
      bg: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
      dot: "bg-zinc-500",
    },
  };

  const config = configs[status] || configs.Active;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.bg,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      <span>{status}</span>
    </span>
  );
}

export function CategoryBadge({ category, className }: { category: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-secondary/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground",
        className
      )}
    >
      {category}
    </span>
  );
}
