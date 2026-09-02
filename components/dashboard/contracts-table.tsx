"use client";

import React, { useState } from "react";
import { CONTRACTS_LIST, ContractSummary } from "@/lib/data";
import { RiskBadge, StatusBadge } from "@/components/badges";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import {
  Search,
  ArrowUpDown,
  ChevronRight,
  Filter,
  ExternalLink,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ContractsTable() {
  const [contracts] = useState<ContractSummary[]>(CONTRACTS_LIST);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const statuses = ["All", "Active", "Under Review", "Draft", "Expired"];

  const filteredContracts = contracts.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.counterparty.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header with Title and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Recent Contracts
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {filteredContracts.length} of {contracts.length} contracts
          </p>
        </div>

        {/* Search & Status Filters */}
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap rounded-lg border border-border bg-secondary/50 p-0.5">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                  statusFilter === st
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full sm:w-48">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter table..."
              className="w-full rounded-lg border border-border bg-secondary/40 py-1 pl-8 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Table Component */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-secondary/30 text-muted-foreground font-medium uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-5 py-3">Document</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Risk Assessment</th>
              <th className="px-4 py-3 text-right">Contract Value</th>
              <th className="px-4 py-3">Expiry Date</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {filteredContracts.map((c) => (
              <tr
                key={c.id}
                className="group transition-colors hover:bg-secondary/40"
              >
                {/* Document & Counterparty */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/workspace?id=${c.id}`}
                        className="truncate font-medium text-foreground hover:text-primary hover:underline block"
                      >
                        {c.title}
                      </Link>
                      <p className="truncate text-[11px] text-muted-foreground mt-0.5">
                        {c.counterparty} · {c.type}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <StatusBadge status={c.status} />
                </td>

                {/* Risk */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <RiskBadge risk={c.risk} score={c.riskScore} />
                </td>

                {/* Value */}
                <td className="px-4 py-3.5 text-right font-medium text-foreground whitespace-nowrap">
                  {c.value ? formatCurrency(c.value) : "—"}
                </td>

                {/* Expiry */}
                <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                  {c.expiryDate}
                </td>

                {/* Action Link */}
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <Link
                    href={`/workspace?id=${c.id}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border/80 bg-secondary/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
                  >
                    <span>Review</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
