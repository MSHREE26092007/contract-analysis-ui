"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Plus,
  Scale,
  Menu,
  X,
  Upload,
  Sparkles,
  Download,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getPageInfo = () => {
    if (pathname === "/") {
      return {
        title: "Contracts Overview",
        subtitle: "Executive obligations, active risks, and renewal forecast",
      };
    }
    if (pathname.startsWith("/workspace")) {
      return {
        title: "Contract Analysis Workspace",
        subtitle: "Split-screen document viewer with real-time AI clause extraction",
      };
    }
    if (pathname.startsWith("/assistant")) {
      return {
        title: "AI Legal Assistant",
        subtitle: "Interactive clause negotiation, comparison, and redlining",
      };
    }
    return {
      title: title || "Contract Intelligence",
      subtitle: subtitle || "Legal Operations Platform",
    };
  };

  const page = getPageInfo();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          {/* Left section: mobile hamburger + title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground md:hidden hover:text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>

            <div className="flex items-center gap-2.5 md:hidden">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Scale className="h-4 w-4" />
              </div>
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold tracking-tight text-foreground md:text-base">
                {page.title}
              </h1>
              <p className="hidden truncate text-xs text-muted-foreground md:block">
                {page.subtitle}
              </p>
            </div>
          </div>

          {/* Right section: Search bar & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Bar */}
            <div className="relative hidden w-60 sm:block lg:w-72">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clauses, obligations, terms... (⌘K)"
                className="w-full rounded-lg border border-border bg-secondary/50 py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:outline-hidden"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-card px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">
                Ctrl K
              </kbd>
            </div>

            {/* AI Assistant Quick Trigger */}
            <Link
              href="/assistant"
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ask AI</span>
            </Link>

            {/* Upload / New Contract button */}
            <Link
              href="/workspace"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/25 transition-all hover:bg-primary/90"
            >
              <Upload className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Upload Contract</span>
            </Link>

            {/* Notifications */}
            <button
              className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-warning" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-sidebar p-4 md:hidden">
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Dashboard
            </Link>
            <Link
              href="/workspace"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Contract Workspace
            </Link>
            <Link
              href="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              AI Legal Assistant
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
