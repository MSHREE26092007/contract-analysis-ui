"use client";

import React, { useState } from "react";
import { EXPIRATION_CHART_DATA } from "@/lib/data";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";

export function ExpirationChart() {
  const [metric, setMetric] = useState<"count" | "value">("count");

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {/* Header with metric switchers */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Upcoming Expirations
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Contracts reaching end of term, month over month
          </p>
        </div>

        <div className="flex rounded-lg border border-border bg-secondary/50 p-0.5">
          <button
            onClick={() => setMetric("count")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
              metric === "count"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            By count
          </button>
          <button
            onClick={() => setMetric("value")}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
              metric === "value"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            By value ($M)
          </button>
        </div>
      </div>

      {/* Recharts Visualization */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={EXPIRATION_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(224 16% 18%)"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(218 11% 65%)", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(218 11% 65%)", fontSize: 11 }}
              tickFormatter={(val) => (metric === "value" ? `$${val}M` : `${val}`)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-border bg-card p-2.5 shadow-xl">
                      <p className="text-xs font-semibold text-foreground">
                        {data.month} 2026
                      </p>
                      <p className="text-xs text-primary font-medium mt-1">
                        {metric === "count"
                          ? `${data.count} contracts expiring`
                          : `$${data.value}M total value`}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey={metric}
              fill="hsl(217 91% 60%)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
