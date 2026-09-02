# Clauselens — AI Contract Analysis & Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Clauselens** is a full-featured B2B legal technology SaaS for automated AI contract analysis, real-time clause extraction, executive obligations tracking, and legal AI chat assistant.

---

## 📸 Key Views & Architecture

### 1. 📊 Executive Obligations Dashboard (`/`)
- **Key Metrics Overview**: Total active contracts, upcoming renewals (30d), high-risk clauses, and total contract value ($48.2M).
- **Upcoming Expirations Chart**: Interactive Recharts visualization with monthly breakdowns togglable between volume count and contract value ($M).
- **Time-Sensitive Obligations**: Actionable list of auto-renewal opt-outs, audit requirements, price review windows, and assigned legal owners.
- **Contract Registry Table**: Searchable, status-filtered (Active, Under Review, Draft, Expired) repository with risk tags and 1-click workspace deep links.

### 2. 📑 Split-Screen Contract Workspace (`/workspace`)
- **Interactive Document Viewer**: Visual highlighting for high-risk (rose), medium-risk (amber), and low-risk (emerald) legal clauses.
- **AI Clause Extraction & Risk Assessment**: Instant evaluation of liability caps, uncapped indemnification, termination flexibility, SLA credits, and compound price increases.
- **1-Click AI Redlining**: Proposed replacement text with rationale, litigation risk impact, and instant draft integration.

### 3. 🤖 AI Legal Assistant (`/assistant`)
- **Interactive Legal Copilot**: Query agreements across your entire repository with prompt suggestions.
- **Structured Quote Cards**: Verifiable clause citations with risk levels directly mapped to source agreements.
- **Negotiation Playbook Alignment**: Generate comparison tables, memo drafts, and redline recommendations.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Dark enterprise theme with custom OKLCH tokens)
- **Icons**: Lucide React
- **Visualizations**: Recharts
- **Design System**: Geist/Vercel inspired enterprise UI with custom components

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or higher
- npm / yarn / pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/MSHREE26092007/contract-analysis-ui.git
cd contract-analysis-ui

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the platform.

---

## 📁 Project Structure

```
contract-analysis-ui/
├── app/
│   ├── globals.css              # Dark mode theme tokens & design system
│   ├── layout.tsx               # Root layout & Clauselens AppShell wrapper
│   ├── page.tsx                 # Executive Obligations Dashboard
│   ├── workspace/page.tsx       # Split-Screen Contract Analysis Workspace
│   └── assistant/page.tsx       # AI Legal Assistant Chat Interface
├── components/
│   ├── app-shell.tsx            # Unified layout shell
│   ├── app-sidebar.tsx          # Collapsible enterprise navigation
│   ├── topbar.tsx               # Global search, notifications, actions
│   ├── badges.tsx               # Risk, Status, & Category badges
│   ├── dashboard/
│   │   ├── stat-cards.tsx       # Executive metric cards
│   │   ├── expiration-chart.tsx # Recharts monthly expiration trends
│   │   ├── obligations-list.tsx # Actionable legal covenants & deadlines
│   │   └── contracts-table.tsx  # Searchable & filterable contract registry
│   ├── workspace/
│   │   ├── document-viewer.tsx  # Document text with clause highlights
│   │   ├── analysis-panel.tsx   # AI extraction, risk scores, redlines
│   │   └── workspace-view.tsx   # Split-screen state coordinator
│   └── assistant/
│       └── chat-view.tsx        # Interactive AI chat with Quote Cards
├── lib/
│   ├── data.ts                  # Mock enterprise contract repository & clauses
│   └── utils.ts                 # Classname merge & currency utilities
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📄 License
This project is licensed under the MIT License.
