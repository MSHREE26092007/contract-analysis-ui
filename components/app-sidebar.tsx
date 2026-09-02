"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Scale,
  LayoutDashboard,
  FileSpreadsheet,
  MessageSquareText,
  Clock,
  Settings,
  ShieldCheck,
  FolderLock,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      badge: "Live",
    },
    {
      title: "Workspace",
      href: "/workspace",
      icon: FileSpreadsheet,
      badge: "8 Active",
    },
    {
      title: "AI Assistant",
      href: "/assistant",
      icon: MessageSquareText,
      badge: "Claude 3.5",
      isAi: true,
    },
  ];

  const secondaryItems = [
    {
      title: "Obligations Due",
      href: "/#obligations",
      icon: Clock,
      count: "5",
    },
    {
      title: "Compliance Rules",
      href: "/#compliance",
      icon: ShieldCheck,
    },
    {
      title: "Contract Vault",
      href: "/#vault",
      icon: FolderLock,
    },
    {
      title: "Settings",
      href: "/#settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25">
          <Scale className="h-4.5 w-4.5" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Clauselens
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5">
            Contract Intelligence
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-4">
        <div className="space-y-6">
          <div>
            <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Core Views
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-secondary text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          "h-4 w-4 transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      <span>{item.title}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium",
                          item.isAi
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-secondary/80 text-muted-foreground"
                        )}
                      >
                        {item.isAi && <Sparkles className="h-2.5 w-2.5" />}
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Management */}
          <div>
            <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Operations
            </div>
            <nav className="space-y-1">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.title}</span>
                    </div>
                    {item.count && (
                      <span className="rounded-full bg-warning/15 px-1.5 py-0.2 text-[10px] font-semibold text-warning">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User / Workspace Profile */}
        <div className="rounded-xl border border-border/70 bg-card/60 p-3 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-sky-400 text-xs font-bold text-white">
                MS
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">
                  Mshree Legal Team
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  Enterprise Tier
                </p>
              </div>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </aside>
  );
}
