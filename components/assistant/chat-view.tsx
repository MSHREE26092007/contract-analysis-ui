"use client";

import React, { useState } from "react";
import {
  INITIAL_CHAT_MESSAGES,
  CHAT_SUGGESTIONS,
  ChatMessage,
} from "@/lib/data";
import { RiskBadge } from "@/components/badges";
import {
  Send,
  Sparkles,
  Bot,
  User,
  Paperclip,
  Copy,
  Check,
  FileText,
  ArrowRight,
  Download,
  CornerDownLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: messageText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse: ChatMessage;

      if (messageText.toLowerCase().includes("indemnif")) {
        aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          content:
            "Under **Section 11.1 (Indemnification)** of the Northwind Agreement, the current terms require uncapped indemnity for 'data security breaches' without standard defense notice procedures.\n\n### Recommended Actions:\n1. Limit indemnity to direct, final court judgments.\n2. Insert reciprocal indemnification for customer IP usage.\n3. Add a strict 10-day notice requirement.",
          quoteCard: {
            contractName: "Master Services Agreement — Northwind",
            section: "Section 11.1 (Indemnification)",
            snippet:
              "Provider agrees to defend, indemnify, and hold harmless Customer... from liabilities arising out of material breach of data security...",
            risk: "Medium",
          },
          actions: ["Copy Suggested Redline", "Insert into Workspace", "Export Legal Memo"],
        };
      } else if (messageText.toLowerCase().includes("liability") || messageText.toLowerCase().includes("8.2")) {
        aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          content:
            "Here is the proposed redline for **Section 8.2 (Limitation of Liability)** to bring the contract in line with company policy (2x cap, removing uncapped confidentiality carve-outs):\n\n```text\nEXCEPT FOR WILLFUL MISCONDUCT OR DIRECT INDEMNIFICATION OBLIGATIONS UNDER SECTION 11, NEITHER PARTY'S AGGREGATE LIABILITY SHALL EXCEED TWO TIMES (2X) THE TOTAL FEES PAID IN THE PRECEDING TWELVE (12) MONTHS.\n```",
          quoteCard: {
            contractName: "Master Services Agreement — Northwind",
            section: "Section 8.2",
            snippet:
              "IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY ... EXCEED FIVE TIMES (5X) THE TOTAL FEES...",
            risk: "High",
          },
          actions: ["Apply to Contract", "Generate Comparison Table"],
        };
      } else {
        aiResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          content: `I've analyzed your query regarding "${messageText}" across your 128 active contracts in the vault. \n\nNo blocking compliance breaches were detected. Would you like me to run a deep clause alignment check against your standard procurement playbook?`,
          actions: ["Run Deep Playbook Audit", "Export Findings Summary"],
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 md:p-6 max-w-5xl mx-auto w-full gap-4">
      {/* Assistant Header Banner */}
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-sky-400 text-primary-foreground shadow-sm shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              Clauselens AI Legal Assistant
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                v2.4 Active
              </span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Trained on enterprise contracts, standard playbooks, and regulatory frameworks
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_CHAT_MESSAGES)}
          className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset Session
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 rounded-xl border border-border bg-card/60 p-4 sm:p-6">
        {messages.map((msg) => {
          const isAssistant = msg.sender === "assistant";

          return (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-3xl",
                isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                  isAssistant
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}
              >
                {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>

              {/* Message Content */}
              <div className="space-y-3 min-w-0">
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 text-xs leading-relaxed",
                    isAssistant
                      ? "border border-border/80 bg-secondary/50 text-foreground"
                      : "bg-primary text-primary-foreground font-medium"
                  )}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>
                </div>

                {/* Formatted Quote Card */}
                {msg.quoteCard && (
                  <div className="rounded-xl border border-border bg-card p-3.5 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-semibold text-foreground">
                          {msg.quoteCard.contractName}
                        </span>
                        <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                          {msg.quoteCard.section}
                        </span>
                      </div>
                      <RiskBadge risk={msg.quoteCard.risk} />
                    </div>

                    <div className="rounded-md border border-border/60 bg-secondary/30 p-2 text-[11px] font-serif text-muted-foreground italic leading-relaxed">
                      "{msg.quoteCard.snippet}"
                    </div>
                  </div>
                )}

                {/* AI Action suggestions */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(act)}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        <span>{act}</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-[10px] text-muted-foreground px-1">
                  {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse pl-11">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Clauselens is analyzing contract terms...</span>
          </div>
        )}
      </div>

      {/* Quick Starter Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] text-muted-foreground shrink-0 flex items-center gap-1 font-medium">
          <Sparkles className="h-3 w-3 text-primary" /> Suggestions:
        </span>
        {CHAT_SUGGESTIONS.map((sug, i) => (
          <button
            key={i}
            onClick={() => handleSend(sug)}
            className="shrink-0 rounded-full border border-border/80 bg-secondary/40 px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/30 hover:bg-secondary hover:text-foreground"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative flex items-center rounded-xl border border-border bg-card p-2 shadow-sm focus-within:border-primary">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask anything about liabilities, termination clauses, compliance risks..."
          className="flex-1 bg-transparent px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden"
        />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 transition-opacity"
            aria-label="Send message"
          >
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
