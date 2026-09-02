"use client";

import React from "react";
import { ContractDetail, Clause } from "@/lib/data";
import { RiskBadge, CategoryBadge } from "@/components/badges";
import {
  FileText,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentViewerProps {
  contract: ContractDetail;
  activeClauseId: string | null;
  onSelectClause: (clause: Clause) => void;
}

export function DocumentViewer({
  contract,
  activeClauseId,
  onSelectClause,
}: DocumentViewerProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card overflow-hidden">
      {/* Document Viewer Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xs font-semibold text-foreground">
              {contract.title}
            </h2>
            <p className="truncate text-[10px] text-muted-foreground">
              {contract.governingLaw} · {contract.clauseCount} Analyzed Clauses
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <div className="flex items-center rounded-lg border border-border bg-card px-2 py-1 text-xs">
            <span className="text-[11px]">100%</span>
          </div>
          <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card transition-colors hover:text-foreground">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card transition-colors hover:text-foreground">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Document Content with Clause Highlights */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 font-serif leading-relaxed text-sm text-foreground/90">
        {/* Document Header Metadata */}
        <div className="rounded-lg border border-border/70 bg-secondary/20 p-4 font-sans not-italic">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Legal Document Stream
              </p>
              <h3 className="text-base font-bold text-foreground mt-0.5">
                {contract.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <RiskBadge risk={contract.risk} score={contract.riskScore} />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground leading-normal">
            {contract.summary}
          </p>
        </div>

        {/* Clauses List */}
        <div className="space-y-4">
          {contract.clauses.map((clause) => {
            const isSelected = activeClauseId === clause.id;
            const isHighRisk = clause.risk === "High";
            const isMedRisk = clause.risk === "Medium";

            return (
              <div
                key={clause.id}
                onClick={() => onSelectClause(clause)}
                className={cn(
                  "cursor-pointer rounded-xl border p-4 transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/40 shadow-md"
                    : isHighRisk
                    ? "border-rose-500/30 bg-rose-500/5 hover:border-rose-500/50"
                    : isMedRisk
                    ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50"
                    : "border-border/80 bg-card/60 hover:border-border hover:bg-secondary/30"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 font-sans not-italic">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[11px] font-semibold text-foreground">
                      {clause.section}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      {clause.title}
                    </span>
                    <CategoryBadge category={clause.category} />
                  </div>
                  <RiskBadge risk={clause.risk} score={clause.riskScore} />
                </div>

                {/* Clause body */}
                <p className="text-xs leading-relaxed text-foreground/85">
                  {clause.originalText}
                </p>

                {/* Micro AI tag */}
                {clause.redlineRecommendation && (
                  <div className="mt-3 flex items-center gap-1.5 font-sans not-italic text-[11px] font-medium text-primary">
                    <Sparkles className="h-3 w-3" />
                    <span>AI Redline suggestion available (Click to view)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
