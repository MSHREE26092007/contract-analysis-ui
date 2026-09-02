"use client";

import React, { useState } from "react";
import { CONTRACT_DETAILS, CONTRACTS_LIST, ContractDetail, Clause } from "@/lib/data";
import { DocumentViewer } from "./document-viewer";
import { AnalysisPanel } from "./analysis-panel";
import {
  FileText,
  ChevronDown,
  Layers,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { RiskBadge, StatusBadge } from "@/components/badges";

export function WorkspaceView() {
  const [contractId, setContractId] = useState<string>("ct-1");
  const contract = CONTRACT_DETAILS[contractId] || CONTRACT_DETAILS["ct-1"];
  const [activeClause, setActiveClause] = useState<Clause | null>(
    contract.clauses[0] || null
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 md:p-6 gap-4">
      {/* Workspace Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-2.5">
        {/* Contract Selector */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={contractId}
              onChange={(e) => {
                const newId = e.target.value;
                setContractId(newId);
                const newContract = CONTRACT_DETAILS[newId] || CONTRACT_DETAILS["ct-1"];
                setActiveClause(newContract.clauses[0] || null);
              }}
              className="rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground focus:border-primary focus:outline-hidden"
            >
              {CONTRACTS_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.counterparty})
                </option>
              ))}
            </select>
            <StatusBadge status={contract.status} />
            <RiskBadge risk={contract.risk} score={contract.riskScore} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share Analysis</span>
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export Redline</span>
          </button>
        </div>
      </div>

      {/* Split-Screen Workspace: Left Document Viewer, Right AI Analysis Panel */}
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-12">
        <div className="h-full overflow-hidden lg:col-span-7 xl:col-span-8">
          <DocumentViewer
            contract={contract}
            activeClauseId={activeClause?.id || null}
            onSelectClause={(clause) => setActiveClause(clause)}
          />
        </div>

        <div className="h-full overflow-hidden lg:col-span-5 xl:col-span-4">
          <AnalysisPanel activeClause={activeClause} />
        </div>
      </div>
    </div>
  );
}
