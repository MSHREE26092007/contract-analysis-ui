export interface ContractSummary {
  id: string;
  title: string;
  counterparty: string;
  status: "Active" | "Under Review" | "Draft" | "Expired";
  risk: "Low" | "Medium" | "High";
  riskScore: number;
  value: number | null;
  expiryDate: string;
  type: string;
  clauseCount: number;
  effectiveDate: string;
  department: string;
}

export interface Obligation {
  id: string;
  title: string;
  contractName: string;
  contractId: string;
  dueInDays: number;
  dueDate: string;
  assignee: {
    name: string;
    initials: string;
    avatar?: string;
  };
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Completed" | "Overdue";
  description: string;
}

export interface Clause {
  id: string;
  section: string;
  title: string;
  originalText: string;
  risk: "Low" | "Medium" | "High";
  riskScore: number;
  category: "Liability" | "Indemnity" | "Termination" | "Confidentiality" | "SLA" | "IP" | "Compliance";
  analysis: string;
  extractedObligations: string[];
  redlineRecommendation?: {
    suggestedText: string;
    rationale: string;
    impact: string;
  };
}

export interface ContractDetail extends ContractSummary {
  summary: string;
  governingLaw: string;
  autoRenew: boolean;
  renewalNoticeDays: number;
  clauses: Clause[];
}

export interface StatMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  changeLabel: string;
  subtitle: string;
}

export const STATS: StatMetric[] = [
  {
    title: "Total Active Contracts",
    value: "128",
    change: "+12",
    trend: "up",
    changeLabel: "vs last quarter",
    subtitle: "Total Active Contracts",
  },
  {
    title: "Upcoming Renewals (30d)",
    value: "9",
    change: "+3",
    trend: "up",
    changeLabel: "urgent review needed",
    subtitle: "Upcoming Renewals (30d)",
  },
  {
    title: "High Risk Clauses",
    value: "24",
    change: "-5",
    trend: "down",
    changeLabel: "from last audit",
    subtitle: "High Risk Clauses",
  },
  {
    title: "Total Contract Value",
    value: "$48.2M",
    change: "+4.1%",
    trend: "up",
    changeLabel: "YoY growth",
    subtitle: "Total Contract Value",
  },
];

export const EXPIRATION_CHART_DATA = [
  { month: "Jan", count: 4, value: 1.2 },
  { month: "Feb", count: 7, value: 2.8 },
  { month: "Mar", count: 12, value: 5.4 },
  { month: "Apr", count: 9, value: 3.9 },
  { month: "May", count: 14, value: 6.8 },
  { month: "Jun", count: 18, value: 8.5 },
  { month: "Jul", count: 11, value: 4.2 },
  { month: "Aug", count: 15, value: 7.1 },
  { month: "Sep", count: 8, value: 3.5 },
  { month: "Oct", count: 13, value: 5.9 },
  { month: "Nov", count: 10, value: 4.8 },
  { month: "Dec", count: 16, value: 7.9 },
];

export const OBLIGATIONS: Obligation[] = [
  {
    id: "ob-1",
    title: "Auto-renewal opt-out deadline",
    contractName: "Reseller Agreement — Vantor Partners",
    contractId: "ct-3",
    dueInDays: 4,
    dueDate: "Sep 06, 2026",
    assignee: { name: "L. Chen", initials: "LC" },
    priority: "High",
    status: "Pending",
    description: "Submit written non-renewal notice at least 30 days prior to annual renewal.",
  },
  {
    id: "ob-2",
    title: "Annual compliance certificate due",
    contractName: "Supply Agreement — Ironclad Mfg.",
    contractId: "ct-5",
    dueInDays: 9,
    dueDate: "Sep 11, 2026",
    assignee: { name: "M. Rivera", initials: "MR" },
    priority: "Medium",
    status: "Pending",
    description: "Provide audited ISO 27001 and SOC 2 Type II attestation report.",
  },
  {
    id: "ob-3",
    title: "Price escalation review window",
    contractName: "Master Services Agreement — Northwind",
    contractId: "ct-1",
    dueInDays: 16,
    dueDate: "Sep 18, 2026",
    assignee: { name: "S. Okafor", initials: "SO" },
    priority: "High",
    status: "Pending",
    description: "Benchmark annual CPI adjustment cap against standard 3.5% ceiling.",
  },
  {
    id: "ob-4",
    title: "License true-up report submission",
    contractName: "License Agreement — Meridian IP",
    contractId: "ct-7",
    dueInDays: 22,
    dueDate: "Sep 24, 2026",
    assignee: { name: "L. Chen", initials: "LC" },
    priority: "Medium",
    status: "Pending",
    description: "Calculate and submit quarterly active seat counts for tier pricing.",
  },
  {
    id: "ob-5",
    title: "Security questionnaire refresh",
    contractName: "SaaS Subscription — Helios Cloud",
    contractId: "ct-2",
    dueInDays: 28,
    dueDate: "Sep 30, 2026",
    assignee: { name: "J. Park", initials: "JP" },
    priority: "Low",
    status: "Pending",
    description: "Deliver annual vendor risk assessment and penetration test summary.",
  },
];

export const CONTRACTS_LIST: ContractSummary[] = [
  {
    id: "ct-1",
    title: "Master Services Agreement — Northwind",
    counterparty: "Northwind Logistics Inc.",
    status: "Active",
    risk: "Medium",
    riskScore: 58,
    value: 1240000,
    expiryDate: "Jan 12, 2027",
    effectiveDate: "Jan 12, 2024",
    type: "Master Services",
    clauseCount: 14,
    department: "Enterprise Logistics",
  },
  {
    id: "ct-2",
    title: "SaaS Subscription — Helios Cloud",
    counterparty: "Helios Cloud Inc.",
    status: "Active",
    risk: "Low",
    riskScore: 22,
    value: 420000,
    expiryDate: "Mar 01, 2026",
    effectiveDate: "Mar 01, 2023",
    type: "Cloud Infrastructure",
    clauseCount: 9,
    department: "Engineering",
  },
  {
    id: "ct-3",
    title: "Reseller Agreement — Vantor Partners",
    counterparty: "Vantor Partners LLC",
    status: "Under Review",
    risk: "High",
    riskScore: 84,
    value: 2100000,
    expiryDate: "Aug 18, 2025",
    effectiveDate: "Aug 18, 2022",
    type: "Channel Distribution",
    clauseCount: 18,
    department: "Global Sales",
  },
  {
    id: "ct-4",
    title: "NDA — Quanta Research",
    counterparty: "Quanta Research Labs",
    status: "Active",
    risk: "Low",
    riskScore: 15,
    value: null,
    expiryDate: "Apr 02, 2028",
    effectiveDate: "Apr 02, 2025",
    type: "Confidentiality",
    clauseCount: 6,
    department: "R&D",
  },
  {
    id: "ct-5",
    title: "Supply Agreement — Ironclad Mfg.",
    counterparty: "Ironclad Manufacturing",
    status: "Active",
    risk: "Medium",
    riskScore: 62,
    value: 3450000,
    expiryDate: "Nov 20, 2026",
    effectiveDate: "Nov 20, 2023",
    type: "Hardware Procurement",
    clauseCount: 16,
    department: "Operations",
  },
  {
    id: "ct-6",
    title: "Consulting SOW — Brightpath",
    counterparty: "Brightpath Advisory Group",
    status: "Expired",
    risk: "Low",
    riskScore: 30,
    value: 185000,
    expiryDate: "Jan 05, 2025",
    effectiveDate: "Jan 05, 2024",
    type: "Professional Services",
    clauseCount: 8,
    department: "Finance",
  },
  {
    id: "ct-7",
    title: "License Agreement — Meridian IP",
    counterparty: "Meridian IP Holdings",
    status: "Under Review",
    risk: "High",
    riskScore: 78,
    value: 960000,
    expiryDate: "May 14, 2027",
    effectiveDate: "May 14, 2024",
    type: "IP Licensing",
    clauseCount: 12,
    department: "Legal & IP",
  },
  {
    id: "ct-8",
    title: "Data Processing Addendum — Helios",
    counterparty: "Helios Cloud Inc.",
    status: "Draft",
    risk: "Medium",
    riskScore: 45,
    value: null,
    expiryDate: "Mar 01, 2026",
    effectiveDate: "Pending",
    type: "Data Protection",
    clauseCount: 11,
    department: "Compliance",
  },
];

export const CONTRACT_DETAILS: Record<string, ContractDetail> = {
  "ct-1": {
    ...CONTRACTS_LIST[0],
    summary:
      "Enterprise Master Services Agreement governing software development, system integration, and level-3 support services provided by Northwind Logistics with a 36-month baseline term and automated CPI indexation.",
    governingLaw: "State of Delaware, United States",
    autoRenew: true,
    renewalNoticeDays: 60,
    clauses: [
      {
        id: "cl-1",
        section: "Section 8.2",
        title: "Limitation of Liability",
        originalText:
          "IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT EXCEED FIVE TIMES (5X) THE TOTAL FEES PAID OR PAYABLE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, EXCEPT FOR BREACHES OF SECTION 9 (CONFIDENTIALITY) AND SECTION 11 (INDEMNIFICATION) WHICH SHALL BE SUBJECT TO UNLIMITED LIABILITY.",
        risk: "High",
        riskScore: 88,
        category: "Liability",
        analysis:
          "The 5x annual fees aggregate cap is substantially higher than market standard (1x–2x). Additionally, unlimited liability carve-outs for confidentiality without a gross negligence threshold present asymmetrical corporate financial exposure.",
        extractedObligations: [
          "Maintain active commercial general liability insurance ($5M minimum)",
          "Notify counterparty within 5 business days of potential liability triggers",
        ],
        redlineRecommendation: {
          suggestedText:
            "EXCEPT FOR WILLFUL MISCONDUCT OR DIRECT INDEMNIFICATION OBLIGATIONS UNDER SECTION 11, NEITHER PARTY'S AGGREGATE LIABILITY SHALL EXCEED TWO TIMES (2X) THE TOTAL FEES PAID IN THE PRECEDING TWELVE (12) MONTHS.",
          rationale:
            "Restricts liability multiplier to market standard 2x and removes unlimited uncapped confidentiality exposure.",
          impact: "Reduces potential litigation financial exposure by ~60%.",
        },
      },
      {
        id: "cl-2",
        section: "Section 11.1",
        title: "Indemnification Obligations",
        originalText:
          "Provider agrees to defend, indemnify, and hold harmless Customer, its affiliates, directors, officers, and employees from and against any third-party claims, liabilities, losses, damages, and reasonable legal costs arising out of (a) infringement of intellectual property, (b) material breach of data security, or (c) gross negligence or willful misconduct.",
        risk: "Medium",
        riskScore: 54,
        category: "Indemnity",
        analysis:
          "Broad indemnity triggers for 'material breach of data security' lack standard defense procedure requirements (sole control of defense, prompt notice within 10 days).",
        extractedObligations: [
          "Prompt written notice of claim within 10 business days",
          "Customer cooperation in defense without admitting unilateral liability",
        ],
        redlineRecommendation: {
          suggestedText:
            "Provided Customer gives prompt written notice within ten (10) business days and allows Provider sole control of defense, Provider shall indemnify Customer against final judicially awarded third-party IP infringement damages.",
          rationale: "Aligns indemnification defense rights and limits procedural risks.",
          impact: "Prevents unauthorized settlements and procedural forfeiture.",
        },
      },
      {
        id: "cl-3",
        section: "Section 14.3",
        title: "Termination for Convenience",
        originalText:
          "Customer may terminate this Agreement or any applicable Statement of Work at any time without cause upon providing ninety (90) days prior written notice to Provider, subject to payment of pro-rated fees for services performed through the effective date of termination.",
        risk: "Low",
        riskScore: 20,
        category: "Termination",
        analysis:
          "Standard 90-day notice window with clean pro-rated compensation terms. Low risk with favorable termination flexibility.",
        extractedObligations: [
          "Issue formal written notice 90 days in advance",
          "Complete off-boarding and data return within 30 days post-termination",
        ],
      },
      {
        id: "cl-4",
        section: "Section 5.4",
        title: "Price Escalation and Annual Adjustments",
        originalText:
          "Upon each anniversary of the Effective Date, Provider reserves the right to increase standard hourly rates and recurring retainer fees by an amount not to exceed the higher of 6% or the Consumer Price Index (CPI-U) for the preceding 12-month period.",
        risk: "High",
        riskScore: 75,
        category: "Compliance",
        analysis:
          "The 'higher of 6% or CPI-U' formula creates compounding price volatility above customary SaaS/services industry benchmarks (typically capped at 3% or CPI-U whichever is lower).",
        extractedObligations: [
          "Annual fee audit prior to 45-day renewal notification window",
          "Written objection within 30 days of price increase notice",
        ],
        redlineRecommendation: {
          suggestedText:
            "Fee adjustments upon renewal shall not exceed the lesser of three percent (3%) or the annual increase in the Consumer Price Index (CPI-U), subject to sixty (60) days advance notice.",
          rationale: "Caps compounding cost growth at 3% and switches to 'lesser of' standard.",
          impact: "Locks in predictable multi-year operational expenditure budgets.",
        },
      },
      {
        id: "cl-5",
        section: "Section 16.1",
        title: "Service Level Agreement & Credits",
        originalText:
          "Provider guarantees a Monthly Uptime Percentage of at least 99.9% for all hosted API endpoints. Failure to meet the SLA shall entitle Customer to a service credit equal to 5% of monthly fees for each 0.5% downtime increment, capped at 25% of monthly fees.",
        risk: "Low",
        riskScore: 18,
        category: "SLA",
        analysis:
          "Well-defined 99.9% uptime commitment with progressive service credit schedule. Clear exclusion list for scheduled maintenance windows.",
        extractedObligations: [
          "Request service credits in writing within 30 days of month-end incident",
          "Provider must publish quarterly SLA uptime verification reports",
        ],
      },
    ],
  },
};

export const CHAT_SUGGESTIONS = [
  "Analyze indemnification exposure in Northwind MSA",
  "Compare liability caps across all Active vendor agreements",
  "Draft redline for the Section 8.2 limitation of liability",
  "What contracts have opt-out deadlines in the next 30 days?",
];

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  timestamp: string;
  content: string;
  quoteCard?: {
    contractName: string;
    section: string;
    snippet: string;
    risk: "High" | "Medium" | "Low";
  };
  actions?: string[];
}

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "user",
    timestamp: "10:42 AM",
    content:
      "What are the major risk factors in the Northwind Master Services Agreement?",
  },
  {
    id: "msg-2",
    sender: "assistant",
    timestamp: "10:43 AM",
    content:
      "I have completed an automated clause-level risk assessment on the **Master Services Agreement — Northwind (ct-1)**. Here is a summary of the 2 critical vulnerabilities identified:\n\n1. **5x Aggregate Liability Multiplier (Section 8.2)**: Market standard is 1x–2x annual fees. The current clause exposes your organization to up to $6.2M in claims with uncapped confidentiality carve-outs.\n2. **Compound Price Escalation (Section 5.4)**: Allows annual rate hikes up to the *higher* of 6% or CPI-U.",
    quoteCard: {
      contractName: "Master Services Agreement — Northwind",
      section: "Section 8.2 (Limitation of Liability)",
      snippet:
        "IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY ... EXCEED FIVE TIMES (5X) THE TOTAL FEES ... EXCEPT FOR BREACHES OF SECTION 9 (CONFIDENTIALITY) ... WHICH SHALL BE SUBJECT TO UNLIMITED LIABILITY.",
      risk: "High",
    },
    actions: ["Insert Redline into Workspace", "Export Legal Memo (PDF)", "Compare to Playbook"],
  },
];
