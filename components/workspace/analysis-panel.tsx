"use client";

import React, { useState } from "react";
import { Clause } from "@/lib/data";
import { RiskBadge, CategoryBadge } from "@/components/badges";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  ListFilter,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisPanelProps {
  activeClause: Clause | null;
}

export function AnalysisPanel({ activeClause }: AnalysisPanelProps) {
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!activeClause) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
        <Sparkles className="h-8 w-8 text-primary/40 animate-pulse mb-3" />
        <h3 className="text-sm font-semibold text-foreground">
          Select a Clause to Inspect
        </h3>
        <p className="mt-1 text-xs max-w-xs">
          Click on any highlighted clause in the document viewer to see AI risk analysis, extracted obligations, and redline recommendations.
        </p>
      </div>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground">
              AI Clause Extraction
            </h3>
            <p className="text-[10px] text-muted-foreground">
              {activeClause.section} · {activeClause.title}
            </p>
          </div>
        </div>
        <RiskBadge risk={activeClause.risk} score={activeClause.riskScore} />
      </div>

      {/* Analysis Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Risk Assessment Card */}
        <div className="rounded-xl border border-border/80 bg-secondary/20 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Risk Assessment
            </span>
            <CategoryBadge category={activeClause.category} />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {activeClause.analysis}
          </p>
        </div>

        {/* Extracted Obligations */}
        {activeClause.extractedObligations &&
          activeClause.extractedObligations.length > 0 && (
            <div className="rounded-xl border border-border/80 bg-card p-3.5 space-y-2">
              <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
                Extracted Legal Obligations
              </h4>
              <ul className="space-y-1.5">
                {activeClause.extractedObligations.map((ob, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{ob}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* AI Suggested Redline */}
        {activeClause.redlineRecommendation && (
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Suggested AI Redline
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    activeClause.redlineRecommendation?.suggestedText || ""
                  )
                }
                className="inline-flex items-center gap-1 rounded border border-primary/20 bg-background/80 px-2 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Proposed Redline Text */}
            <div className="rounded-lg border border-primary/20 bg-background p-3 text-xs leading-relaxed text-foreground font-mono">
              {activeClause.redlineRecommendation.suggestedText}
            </div>

            {/* Rationale & Impact */}
            <div className="space-y-1.5 text-xs">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Rationale: </strong>
                {activeClause.redlineRecommendation.rationale}
              </p>
              <p className="text-emerald-400 font-medium">
                <strong>Impact: </strong>
                {activeClause.redlineRecommendation.impact}
              </p>
            </div>

            {/* Accept / Insert Redline action */}
            <button
              onClick={() => setApplied(!applied)}
              className={cn(
                "w-full rounded-lg py-2 text-xs font-semibold transition-all shadow-xs",
                applied
                  ? "bg-emerald-500 text-white"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {applied ? "✓ Redline Applied to Draft" : "Apply Redline to Contract"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
