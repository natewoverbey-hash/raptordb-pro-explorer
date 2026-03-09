import { useState, useEffect, useRef } from "react";

// ─── Icons (inline SVG to avoid dependency issues on Vercel) ───
const Icon = ({ children, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const DatabaseIcon = ({ size }) => <Icon size={size}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></Icon>;
const ZapIcon = ({ size }) => <Icon size={size}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></Icon>;
const ShieldIcon = ({ size }) => <Icon size={size}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></Icon>;
const BarChartIcon = ({ size }) => <Icon size={size}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></Icon>;
const TrendingUpIcon = ({ size }) => <Icon size={size}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Icon>;
const ChevronRightIcon = ({ size }) => <Icon size={size}><path d="m9 18 6-6-6-6"/></Icon>;
const ArrowRightIcon = ({ size }) => <Icon size={size}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></Icon>;
const CheckIcon = ({ size }) => <Icon size={size}><path d="M20 6 9 17l-5-5"/></Icon>;
const XIcon = ({ size }) => <Icon size={size}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Icon>;
const RefreshIcon = ({ size }) => <Icon size={size}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></Icon>;
const LayersIcon = ({ size }) => <Icon size={size}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84Z"/><path d="m22 12.5-8.97 4.08a2 2 0 0 1-1.66 0L2 12.5"/><path d="m22 17.5-8.97 4.08a2 2 0 0 1-1.66 0L2 17.5"/></Icon>;
const ActivityIcon = ({ size }) => <Icon size={size}><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></Icon>;
const GitBranchIcon = ({ size }) => <Icon size={size}><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></Icon>;
const ServerIcon = ({ size }) => <Icon size={size}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></Icon>;
const SparklesIcon = ({ size }) => <Icon size={size}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></Icon>;
const ClockIcon = ({ size }) => <Icon size={size}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const EyeIcon = ({ size }) => <Icon size={size}><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></Icon>;
const LockIcon = ({ size }) => <Icon size={size}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;
const BotIcon = ({ size }) => <Icon size={size}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></Icon>;
const CpuIcon = ({ size }) => <Icon size={size}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></Icon>;
const HeartPulseIcon = ({ size }) => <Icon size={size}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></Icon>;
const MessageSquareIcon = ({ size }) => <Icon size={size}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;

const C = {
  infiniteBlue: "#032D42", deepBlue: "#041E2B", midBlue: "#0A4D6E",
  wasabi: "#63DF4E", wasabiDim: "rgba(99,223,78,0.12)", wasabiGlow: "rgba(99,223,78,0.25)",
  white: "#FFFFFF", gray: "#94A3B8", lightGray: "#CBD5E1",
  cardBg: "rgba(255,255,255,0.04)", cardBorder: "rgba(255,255,255,0.08)",
  red: "#EF4444", redDim: "rgba(239,68,68,0.08)", redBorder: "rgba(239,68,68,0.2)",
  amber: "#F59E0B", amberDim: "rgba(245,158,11,0.12)",
};

// ─── Data ───
const journeyStages = [
  { id: "mariadb", label: "MariaDB", subtitle: "OLTP Only", icon: <DatabaseIcon size={28} />, color: "#64748B",
    details: { title: "Traditional Transactional Database", points: ["Serialized query processing — one query at a time", "Must read entire rows to access a single column", "Analytics require exporting data to external systems", "Performance degrades as data volumes grow"], metric: null }},
  { id: "standard", label: "RaptorDB Standard", subtitle: "Enhanced OLTP", icon: <ServerIcon size={28} />, color: "#38BDF8",
    details: { title: "Improved Transactional Performance", points: ["PostgreSQL-based with proprietary enhancements", "Faster transactions vs. MariaDB", "Still serialized query processing", "Still must read full rows — no column-store"], metric: { label: "Transactions", value: "2.7x faster", sub: "vs. MariaDB (TPC-C)" } }},
  { id: "pro", label: "RaptorDB Pro", subtitle: "True HTAP", icon: <ZapIcon size={28} />, color: C.wasabi,
    details: { title: "Hybrid Transactional & Analytical Processing", points: ["Column-store index — reads only the data columns you need", "Parallel query processing — multiple queries simultaneously", "Run analytics on live operational data — no ETL needed", "Foundation for AI agents — speed and scale for agentic workloads"], metric: { label: "Analytics", value: "27x faster", sub: "vs. MariaDB (TPC-H)" } }},
];

const htapFeatures = [
  { icon: <LayersIcon size={20} />, label: "Column-Store Index", desc: "Only reads the columns you need — skips irrelevant data entirely" },
  { icon: <GitBranchIcon size={20} />, label: "Parallel Processing", desc: "Splits queries across multiple cores simultaneously" },
  { icon: <ActivityIcon size={20} />, label: "Real-Time Analytics", desc: "Run complex queries on live data without impacting workflows" },
  { icon: <BotIcon size={20} />, label: "AI-Ready Architecture", desc: "Speed and scale AI agents need to reason on billions of records" },
];

// Badge component for metric classification
function MetricBadge({ type }) {
  const styles = {
    verified: { bg: C.wasabi, color: C.infiniteBlue, label: "Verified Benchmark" },
    target: { bg: "transparent", color: C.amber, label: "Target Outcome", border: C.amber },
    strategic: { bg: "transparent", color: "#818CF8", label: "Strategic", border: "#818CF8" },
    proof: { bg: "transparent", color: C.wasabi, label: "Customer Proof Point", border: C.wasabi },
  };
  const s = styles[type] || styles.target;
  return (
    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, letterSpacing: 0.8, textTransform: "uppercase",
      background: s.bg, color: s.color, border: `1px solid ${s.border || s.bg}`, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

const useCases = [
  { id: "service-delivery", icon: <BarChartIcon size={32} />,
    title: "IT Service Delivery at Scale",
    tagline: "When your service desk supports 50,000+ across hospitals and clinics",
    persona: "VP of IT Service Delivery",
    before: { title: "Today on RaptorDB Standard",
      items: [
        { label: "SLA Dashboard Load", value: "4–8 min", icon: <ClockIcon size={16} /> },
        { label: "Staffing Insight Lag", value: "Next-day", icon: <EyeIcon size={16} /> },
        { label: "PA Drilldown Depth", value: "Limited", icon: <LayersIcon size={16} /> },
      ],
      narrative: "Monday morning SLA dashboards query 15M+ incident records across 3 years — taking 4–8 minutes to load on Standard. During flu season surges with 300% ticket spikes, leadership can't see real-time staffing needs. PA drilldowns can't simultaneously break down by facility, shift, and assignment group." },
    after: { title: "With RaptorDB Pro",
      items: [
        { label: "SLA Dashboard Load", value: "Seconds", icon: <ZapIcon size={16} /> },
        { label: "Staffing Insight", value: "Real-time", icon: <ActivityIcon size={16} /> },
        { label: "PA Drilldowns", value: "Unlimited", icon: <SparklesIcon size={16} /> },
      ],
      narrative: "Column-store + parallel processing delivers up to 27x faster analytics. Intraday Analytics tracks KPIs hour-by-hour so you can see surge patterns and reallocate staff before queues build. Unlimited PA drilldowns let you slice incidents by any dimension combination — a Pro-exclusive capability." },
    outcomes: [
      { metric: "50%", label: "decrease in analyst idle time", type: "target" },
      { metric: "20%", label: "increase in transaction throughput", type: "target" },
      { metric: "45%", label: "faster processing (Amadeus)", type: "proof" },
    ],
    proExclusive: ["Intraday Analytics", "Unlimited PA Drilldowns", "Column-Store Index"],
  },
  { id: "bi-analytics", icon: <TrendingUpIcon size={32} />,
    title: "BI & Analytics Without Data Export",
    tagline: "When your team exports millions of rows to external tools every week",
    persona: "Data Analyst / Enterprise Architect",
    before: { title: "Today on RaptorDB Standard",
      items: [
        { label: "Data Freshness", value: "Week-old", icon: <ClockIcon size={16} /> },
        { label: "ETL Pipelines", value: "3+ active", icon: <GitBranchIcon size={16} /> },
        { label: "Cross-Domain View", value: "Manual", icon: <LayersIcon size={16} /> },
      ],
      narrative: "Analysts export CMDB, incident, and HR case data weekly to Power BI or Snowflake — hours per export, stale on arrival. The enterprise architect maintains 3+ separate pipelines. Clinical ops needs IT + HR + asset visibility but can't get it without manual stitching across exports." },
    after: { title: "With RaptorDB Pro",
      items: [
        { label: "Data Freshness", value: "Real-time", icon: <ZapIcon size={16} /> },
        { label: "ETL Pipelines", value: "Eliminated", icon: <CheckIcon size={16} /> },
        { label: "Cross-Domain View", value: "One query", icon: <SparklesIcon size={16} /> },
      ],
      narrative: "SQL API connects Power BI, Tableau, or any JDBC/ODBC tool directly to RaptorDB Pro. \"Inverse zero-copy\" keeps data in ServiceNow while external tools query securely. Cross-product analytics in a single HTAP database — ITSM + HRSD + CSM + CMDB in one query, one source of truth." },
    outcomes: [
      { metric: "75%", label: "decrease in data management costs", type: "target" },
      { metric: "30M", label: "items in single instance (Experian)", type: "proof" },
      { metric: "0", label: "ETL pipelines needed", type: "verified" },
    ],
    proExclusive: ["SQL API (JDBC/ODBC)", "Cross-Product HTAP Analytics", "Inverse Zero-Copy"],
  },
  { id: "compliance", icon: <ShieldIcon size={32} />,
    title: "Compliance & Audit at Healthcare Scale",
    tagline: "When HIPAA auditors need 7 years of logs across 500M+ records",
    persona: "VP Enterprise Applications / Enterprise Architect",
    before: { title: "Today on RaptorDB Standard",
      items: [
        { label: "Audit Query Time", value: "Hours/Timeout", icon: <ClockIcon size={16} /> },
        { label: "Archived Data", value: "Invisible", icon: <EyeIcon size={16} /> },
        { label: "VI Drill-Down", value: "Export required", icon: <LockIcon size={16} /> },
      ],
      narrative: "HIPAA/HITECH audits require querying hundreds of millions of audit records — current DB times out or takes hours. 5–7 year retention policies make archived data invisible to investigators. Security teams export vulnerability data to external analytics platforms, creating compliance gaps." },
    after: { title: "With RaptorDB Pro",
      items: [
        { label: "Audit Query Time", value: "Minutes", icon: <ZapIcon size={16} /> },
        { label: "Archived Data", value: "Warm & queryable", icon: <SparklesIcon size={16} /> },
        { label: "VI Drill-Down", value: "Native in SN", icon: <ShieldIcon size={16} /> },
      ],
      narrative: "HTAP engine runs compliance queries on 500M+ records without impacting daily workflows. Object Store keeps historical data \"warm\" — fully queryable alongside live data with 50% compression. Multi-level vulnerability drill-down directly in ServiceNow, no external export." },
    outcomes: [
      { metric: "10%", label: "decrease in unaddressed vulnerabilities", type: "target" },
      { metric: "50%", label: "data compression on archived records", type: "verified" },
      { metric: "FedRAMP", label: "deployed in compliant gov environments", type: "proof" },
    ],
    proExclusive: ["Object Store (Warm Archiving)", "500M+ Record Analytics", "50% Data Compression"],
  },
  { id: "ai-agentic", icon: <BotIcon size={32} />,
    title: "AI & Agentic Readiness",
    tagline: "When your AI agents need to reason and act on billions of records in real time",
    persona: "VP Enterprise Applications / CIO",
    before: { title: "Today on RaptorDB Standard",
      items: [
        { label: "Agent Throughput", value: "Serialized", icon: <ClockIcon size={16} /> },
        { label: "AI + Analytics", value: "Can't coexist", icon: <LockIcon size={16} /> },
        { label: "Concurrent Sessions", value: "Bottlenecked", icon: <ActivityIcon size={16} /> },
      ],
      narrative: "AI agents are limited by serialized query processing — each agent action waits in queue. Now Assist and AI models can't run analytical reasoning on live operational data simultaneously with transactions. As agent volume scales to hundreds of concurrent sessions, Standard becomes the bottleneck — not the AI model itself." },
    after: { title: "With RaptorDB Pro",
      items: [
        { label: "Agent Throughput", value: "Parallel", icon: <ZapIcon size={16} /> },
        { label: "AI + Analytics", value: "Simultaneous", icon: <SparklesIcon size={16} /> },
        { label: "Concurrent Sessions", value: "Scales with demand", icon: <ActivityIcon size={16} /> },
      ],
      narrative: "HTAP architecture handles both agent transactional actions AND the analytical reasoning agents need — simultaneously. Parallel processing supports hundreds of concurrent AI agent sessions without degradation. RaptorDB Pro is the database foundation in ServiceNow's \"Sense\" pillar — giving AI agents enterprise context at speed." },
    outcomes: [
      { metric: "3x", label: "throughput for concurrent workloads", type: "verified" },
      { metric: "53%", label: "faster transaction processing", type: "verified" },
      { metric: "AI-Ready", label: "foundation for Now Assist & AI Agents", type: "strategic" },
    ],
    proExclusive: ["HTAP for Agentic Workloads", "Parallel Agent Processing", "AI Platform Foundation"],
  },
  { id: "device-intelligence", icon: <HeartPulseIcon size={32} />,
    title: "Medical Device & Asset Intelligence",
    tagline: "When your CMDB holds millions of clinical devices and you need real-time lifecycle visibility",
    persona: "Enterprise Architect / Biomedical Engineering",
    before: { title: "Today on RaptorDB Standard",
      items: [
        { label: "CMDB Query Speed", value: "Slow/Timeout", icon: <ClockIcon size={16} /> },
        { label: "Device Compliance", value: "Manual cross-ref", icon: <LayersIcon size={16} /> },
        { label: "Predictive Insights", value: "Not feasible", icon: <EyeIcon size={16} /> },
      ],
      narrative: "CMDB with 5M+ clinical devices, IT assets, and network equipment — queries on device lifecycle, warranty, or vulnerability exposure are slow or time out. FDA and Joint Commission compliance reports require correlating device data with maintenance history and incident records across manual exports. HTM teams can't get real-time visibility into device utilization at scale." },
    after: { title: "With RaptorDB Pro",
      items: [
        { label: "CMDB Query Speed", value: "Seconds", icon: <ZapIcon size={16} /> },
        { label: "Device Compliance", value: "One query", icon: <SparklesIcon size={16} /> },
        { label: "Predictive Insights", value: "Scalable", icon: <ActivityIcon size={16} /> },
      ],
      narrative: "Column-store index processes CMDB queries across millions of CIs in seconds. Cross-product analytics correlate CMDB device records + ITSM incidents + vulnerability data + FSM maintenance in a single query. Scalable foundation for predictive maintenance analytics and installed base intelligence as device counts grow." },
    outcomes: [
      { metric: "27x", label: "faster analytics on CMDB tables", type: "verified" },
      { metric: "50%", label: "compression on archived device records", type: "verified" },
      { metric: "75%", label: "fewer instances through consolidation", type: "target" },
    ],
    proExclusive: ["Column-Store on CMDB Tables", "Cross-Product Device Analytics", "Scalable Object Store"],
  },
];

const discoveryQuestions = [
  { id: "q1", question: "How long do your heaviest ServiceNow dashboards and reports take to load?",
    options: [
      { label: "Under 30 seconds", value: 0, tags: [] },
      { label: "1–3 minutes", value: 1, tags: ["service-delivery"] },
      { label: "4+ minutes or we avoid running them", value: 2, tags: ["service-delivery"] },
    ]},
  { id: "q2", question: "How does your team get ServiceNow data into BI tools like Power BI or Tableau?",
    options: [
      { label: "We don't use external BI on ServiceNow data", value: 0, tags: [] },
      { label: "Scheduled exports or API extracts", value: 1, tags: ["bi-analytics"] },
      { label: "Full ETL pipelines to a data lake or warehouse", value: 2, tags: ["bi-analytics"] },
    ]},
  { id: "q3", question: "How do you handle audit or compliance queries across historical data?",
    options: [
      { label: "Our data volumes are manageable today", value: 0, tags: [] },
      { label: "We archive data but it's hard to query", value: 1, tags: ["compliance"] },
      { label: "Queries time out or require external systems", value: 2, tags: ["compliance"] },
    ]},
  { id: "q4", question: "Do you need to analyze data across multiple ServiceNow products simultaneously?",
    options: [
      { label: "Not currently", value: 0, tags: [] },
      { label: "Yes, but we stitch it together manually", value: 1, tags: ["bi-analytics", "service-delivery"] },
      { label: "Yes, and it's a major pain point", value: 2, tags: ["bi-analytics", "service-delivery"] },
    ]},
  { id: "q5", question: "Are you planning to scale ServiceNow to more departments or deploy AI agents?",
    options: [
      { label: "Staying with current scope", value: 0, tags: [] },
      { label: "Adding 1–2 new products this year", value: 1, tags: ["service-delivery"] },
      { label: "Significant expansion planned", value: 2, tags: ["service-delivery", "bi-analytics", "compliance"] },
    ]},
  { id: "q6", question: "Are you deploying or planning to deploy Now Assist, AI agents, or agentic workflows?",
    options: [
      { label: "Not currently on our roadmap", value: 0, tags: [] },
      { label: "Evaluating or piloting", value: 1, tags: ["ai-agentic"] },
      { label: "Active deployment — scaling up", value: 2, tags: ["ai-agentic", "service-delivery"] },
    ]},
  { id: "q7", question: "How many devices, assets, or CIs does your CMDB manage — and do you run analytics on that data?",
    options: [
      { label: "Under 1M CIs, minimal analytics needs", value: 0, tags: [] },
      { label: "1–5M CIs, some reporting needed", value: 1, tags: ["device-intelligence"] },
      { label: "5M+ CIs — analytics are a pain point", value: 2, tags: ["device-intelligence", "compliance"] },
    ]},
];

// ─── Section Nav ───
function SectionNav({ active, onChange }) {
  const sections = [
    { id: "journey", label: "The Journey", icon: <DatabaseIcon size={16} /> },
    { id: "usecases", label: "Use Cases", icon: <SparklesIcon size={16} /> },
    { id: "discovery", label: "Discovery", icon: <MessageSquareIcon size={16} /> },
  ];
  return (
    <nav style={{ display: "flex", gap: 3, background: C.deepBlue, borderRadius: 11, padding: 3, border: `1px solid ${C.cardBorder}` }}>
      {sections.map((s) => (
        <button key={s.id} onClick={() => onChange(s.id)} style={{
          display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9, border: "none", cursor: "pointer",
          background: active === s.id ? C.wasabi : "transparent",
          color: active === s.id ? C.infiniteBlue : C.gray,
          fontWeight: active === s.id ? 700 : 500, fontSize: 13, transition: "all 0.3s ease", fontFamily: "inherit",
        }}>{s.icon} {s.label}</button>
      ))}
    </nav>
  );
}

// ─── Journey Section ───
function JourneySection() {
  const [active, setActive] = useState("pro");
  const stage = journeyStages.find((s) => s.id === active);
  return (
    <div style={{ animation: "fadeUp 0.6s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: C.white, margin: 0 }}>The Journey to <span style={{ color: C.wasabi }}>RaptorDB Pro</span></h2>
        <p style={{ color: C.gray, fontSize: 15, marginTop: 8 }}>Click each stage to explore the evolution</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 40, flexWrap: "wrap" }}>
        {journeyStages.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => setActive(s.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "18px 24px",
              borderRadius: 16, border: `2px solid ${active === s.id ? s.color : C.cardBorder}`,
              background: active === s.id ? `${s.color}15` : C.cardBg, cursor: "pointer",
              transition: "all 0.4s ease", minWidth: 155, fontFamily: "inherit",
              boxShadow: active === s.id ? `0 0 30px ${s.color}20` : "none",
            }}>
              <div style={{ color: s.color }}>{s.icon}</div>
              <div style={{ color: C.white, fontWeight: 700, fontSize: 14 }}>{s.label}</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: s.color, background: `${s.color}20`, padding: "2px 10px", borderRadius: 20 }}>{s.subtitle}</div>
            </button>
            {i < journeyStages.length - 1 && (
              <div style={{ display: "flex", alignItems: "center", padding: "0 6px" }}>
                <div style={{ width: 32, height: 2, background: `linear-gradient(90deg, ${journeyStages[i].color}, ${journeyStages[i + 1].color})` }} />
                <ChevronRightIcon size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div key={active} style={{ background: C.cardBg, border: `1px solid ${stage.color}30`, borderRadius: 20, padding: 32, animation: "fadeUp 0.4s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
          <div style={{ flex: "1 1 380px" }}>
            <h3 style={{ color: stage.color, fontSize: 20, fontWeight: 700, margin: "0 0 18px" }}>{stage.details.title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {stage.details.points.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: stage.color, marginTop: 7, flexShrink: 0 }} />
                  <span style={{ color: C.lightGray, fontSize: 14, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
          {stage.details.metric && (
            <div style={{ background: `${stage.color}10`, border: `1px solid ${stage.color}30`, borderRadius: 16, padding: "24px 32px", textAlign: "center", minWidth: 170 }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: stage.color, lineHeight: 1 }}>{stage.details.metric.value}</div>
              <div style={{ color: C.gray, fontSize: 12, marginTop: 6 }}>{stage.details.metric.sub}</div>
              <MetricBadge type="verified" />
            </div>
          )}
        </div>
      </div>
      {active === "pro" && (
        <div style={{ marginTop: 28, animation: "fadeUp 0.5s ease" }}>
          <h4 style={{ color: C.wasabi, fontSize: 13, fontWeight: 700, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1.5 }}>Pro-Exclusive Capabilities</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
            {htapFeatures.map((f, i) => (
              <div key={i} style={{ background: C.wasabiDim, border: `1px solid ${C.wasabi}20`, borderRadius: 14, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start", animation: `fadeUp 0.4s ease ${i * 0.1}s both` }}>
                <div style={{ color: C.wasabi, flexShrink: 0, marginTop: 1 }}>{f.icon}</div>
                <div>
                  <div style={{ color: C.white, fontWeight: 700, fontSize: 13 }}>{f.label}</div>
                  <div style={{ color: C.gray, fontSize: 12, marginTop: 3, lineHeight: 1.4 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Use Case Detail Modal ───
function UseCaseDetail({ uc, onClose }) {
  const [view, setView] = useState("before");
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,20,30,0.92)", backdropFilter: "blur(12px)", animation: "fadeIn 0.3s ease", padding: 20, overflowY: "auto" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: C.infiniteBlue, border: `1px solid ${C.cardBorder}`, borderRadius: 24, maxWidth: 920, width: "100%", maxHeight: "90vh", overflowY: "auto", animation: "scaleIn 0.35s ease", position: "relative" }}>
        <button onClick={onClose} style={{ position: "sticky", top: 12, float: "right", marginRight: 12, marginTop: 12, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer", color: C.gray, zIndex: 10 }}><XIcon size={20} /></button>
        <div style={{ padding: "32px 32px 20px" }}>
          <div style={{ color: C.wasabi, marginBottom: 8 }}>{uc.icon}</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.white, margin: "0 0 4px" }}>{uc.title}</h2>
          <p style={{ color: C.gray, fontSize: 13, margin: 0 }}>Primary Persona: {uc.persona}</p>
        </div>
        <div style={{ padding: "0 32px", marginBottom: 20 }}>
          <div style={{ display: "inline-flex", background: C.deepBlue, borderRadius: 10, padding: 3 }}>
            {["before", "after"].map((v) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "9px 22px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit",
                fontWeight: 700, fontSize: 13, transition: "all 0.3s",
                background: view === v ? (v === "before" ? C.red : C.wasabi) : "transparent",
                color: view === v ? (v === "before" ? C.white : C.infiniteBlue) : C.gray,
              }}>{v === "before" ? "Before (Standard)" : "After (Pro)"}</button>
            ))}
          </div>
        </div>
        <div key={view} style={{ padding: "0 32px", animation: "fadeUp 0.35s ease" }}>
          {(() => {
            const data = view === "before" ? uc.before : uc.after;
            const isBefore = view === "before";
            return (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
                  {data.items.map((item, i) => (
                    <div key={i} style={{ background: isBefore ? C.redDim : C.wasabiDim, border: `1px solid ${isBefore ? C.redBorder : C.wasabi + "25"}`, borderRadius: 14, padding: "16px 14px", textAlign: "center" }}>
                      <div style={{ color: isBefore ? C.red : C.wasabi, marginBottom: 6 }}>{item.icon}</div>
                      <div style={{ color: C.gray, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</div>
                      <div style={{ color: C.white, fontSize: 20, fontWeight: 800, marginTop: 3 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <p style={{ color: C.lightGray, fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>{data.narrative}</p>
              </>
            );
          })()}
        </div>
        <div style={{ padding: "20px 32px 28px", borderTop: `1px solid ${C.cardBorder}`, background: C.deepBlue, borderRadius: "0 0 24px 24px" }}>
          <h4 style={{ color: C.wasabi, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 14px" }}>Value Drivers</h4>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 16 }}>
            {uc.outcomes.map((o, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: C.wasabi }}>{o.metric}</span>
                  <span style={{ color: C.lightGray, fontSize: 12 }}>{o.label}</span>
                </div>
                <MetricBadge type={o.type} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {uc.proExclusive.map((f, i) => (
              <span key={i} style={{ background: C.wasabiDim, color: C.wasabi, fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: `1px solid ${C.wasabi}30` }}>Pro: {f}</span>
            ))}
          </div>
          <p style={{ color: C.gray, fontSize: 10, margin: 0, fontStyle: "italic" }}>Target outcomes based on ServiceNow internal benchmarks and expert guidance. Verified benchmarks from TPC-C/TPC-H testing. Actual results vary by environment.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Use Cases Section ───
function UseCasesSection() {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ animation: "fadeUp 0.6s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: C.white, margin: 0 }}>Healthcare Use Cases for <span style={{ color: C.wasabi }}>RaptorDB Pro</span></h2>
        <p style={{ color: C.gray, fontSize: 15, marginTop: 8 }}>Click any card to explore the before-and-after impact</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {useCases.map((uc, i) => (
          <button key={uc.id} onClick={() => setSel(uc)} style={{
            background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 18, padding: 24,
            textAlign: "left", cursor: "pointer", transition: "all 0.35s ease",
            animation: `fadeUp 0.5s ease ${i * 0.08}s both`, fontFamily: "inherit",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.wasabi + "50"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ color: C.wasabi, marginBottom: 12 }}>{uc.icon}</div>
            <h3 style={{ color: C.white, fontSize: 17, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.3 }}>{uc.title}</h3>
            <p style={{ color: C.gray, fontSize: 13, margin: "0 0 16px", lineHeight: 1.4 }}>{uc.tagline}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
              {uc.outcomes.slice(0, 2).map((o, j) => (
                <div key={j}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.wasabi }}>{o.metric}</div>
                  <div style={{ fontSize: 10, color: C.gray, maxWidth: 100 }}>{o.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: C.wasabi, fontSize: 13, fontWeight: 600 }}>Explore <ArrowRightIcon size={14} /></div>
          </button>
        ))}
      </div>
      {sel && <UseCaseDetail uc={sel} onClose={() => setSel(null)} />}
    </div>
  );
}

// ─── Discovery Section ───
function DiscoverySection() {
  const [curQ, setCurQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const handleAnswer = (qId, opt) => {
    const a = { ...answers, [qId]: opt };
    setAnswers(a);
    if (curQ < discoveryQuestions.length - 1) setTimeout(() => setCurQ(curQ + 1), 300);
    else setTimeout(() => setDone(true), 400);
  };

  const getScores = () => {
    const sc = {};
    useCases.forEach((u) => (sc[u.id] = 0));
    Object.values(answers).forEach((o) => o.tags.forEach((t) => (sc[t] = (sc[t] || 0) + o.value)));
    return sc;
  };

  const reset = () => { setCurQ(0); setAnswers({}); setDone(false); };

  if (done) {
    const scores = getScores();
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).filter(([, v]) => v > 0);
    const maxPossible = discoveryQuestions.length * 2;

    return (
      <div style={{ animation: "fadeUp 0.6s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: C.white, margin: 0 }}>Your <span style={{ color: C.wasabi }}>RaptorDB Pro</span> Opportunity Map</h2>
          <p style={{ color: C.gray, fontSize: 15, marginTop: 8 }}>Based on your responses, here's where Pro delivers the most value</p>
        </div>
        {sorted.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, background: C.cardBg, borderRadius: 20, border: `1px solid ${C.cardBorder}` }}>
            <p style={{ color: C.lightGray, fontSize: 16 }}>Your current environment may not require RaptorDB Pro today — but as you scale ServiceNow, these use cases become increasingly relevant.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {sorted.map(([id, score], i) => {
              const uc = useCases.find((u) => u.id === id);
              if (!uc) return null;
              const pct = Math.min(Math.round((score / maxPossible) * 100), 100);
              return (
                <div key={id} style={{
                  background: C.cardBg, border: `1px solid ${i === 0 ? C.wasabi + "50" : C.cardBorder}`,
                  borderRadius: 18, padding: 24, animation: `fadeUp 0.4s ease ${i * 0.12}s both`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ color: C.wasabi }}>{uc.icon}</div>
                      <div>
                        <h3 style={{ color: C.white, fontSize: 18, fontWeight: 700, margin: 0 }}>{uc.title}</h3>
                        <p style={{ color: C.gray, fontSize: 12, margin: "2px 0 0" }}>{uc.persona}</p>
                      </div>
                    </div>
                    {i === 0 && <span style={{ background: C.wasabi, color: C.infiniteBlue, fontSize: 11, fontWeight: 800, padding: "4px 14px", borderRadius: 20 }}>HIGHEST PRIORITY</span>}
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ color: C.gray, fontSize: 11 }}>Relevance to your environment</span>
                      <span style={{ color: C.wasabi, fontSize: 13, fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 5, background: C.deepBlue, borderRadius: 3 }}>
                      <div style={{ height: 5, background: `linear-gradient(90deg, ${C.wasabi}, ${C.wasabi}AA)`, borderRadius: 3, width: `${pct}%`, transition: "width 1s ease" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                    {uc.outcomes.map((o, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                        <span style={{ fontSize: 22, fontWeight: 800, color: C.wasabi }}>{o.metric}</span>
                        <span style={{ fontSize: 11, color: C.gray }}>{o.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <p style={{ color: C.gray, fontSize: 12, fontStyle: "italic", maxWidth: 500 }}>Value projections based on ServiceNow benchmarks. An evaluation of RaptorDB Pro in your environment will quantify actual impact.</p>
          <button onClick={reset} style={{ background: "transparent", border: `1px solid ${C.cardBorder}`, color: C.gray, padding: "9px 20px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            <RefreshIcon size={13} /> Reset Assessment
          </button>
        </div>
      </div>
    );
  }

  const q = discoveryQuestions[curQ];
  const progress = (curQ / discoveryQuestions.length) * 100;

  return (
    <div style={{ animation: "fadeUp 0.6s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: C.white, margin: 0 }}><span style={{ color: C.wasabi }}>Discovery</span> Navigator</h2>
        <p style={{ color: C.gray, fontSize: 15, marginTop: 8 }}>Answer {discoveryQuestions.length} quick questions to identify where RaptorDB Pro delivers the most value</p>
      </div>
      <div style={{ maxWidth: 580, margin: "0 auto 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: C.gray, fontSize: 12 }}>Question {curQ + 1} of {discoveryQuestions.length}</span>
          <span style={{ color: C.wasabi, fontSize: 12, fontWeight: 600 }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 4, background: C.deepBlue, borderRadius: 2 }}>
          <div style={{ height: 4, background: C.wasabi, borderRadius: 2, width: `${progress}%`, transition: "width 0.5s ease" }} />
        </div>
      </div>
      <div key={q.id} style={{ maxWidth: 580, margin: "0 auto", animation: "fadeUp 0.4s ease" }}>
        <h3 style={{ color: C.white, fontSize: 20, fontWeight: 700, textAlign: "center", margin: "0 0 24px", lineHeight: 1.4 }}>{q.question}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            const selected = answers[q.id]?.label === opt.label;
            return (
              <button key={i} onClick={() => handleAnswer(q.id, opt)} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderRadius: 13,
                border: `1px solid ${selected ? C.wasabi : C.cardBorder}`,
                background: selected ? C.wasabiDim : C.cardBg,
                cursor: "pointer", transition: "all 0.3s ease", textAlign: "left", fontFamily: "inherit", width: "100%",
              }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${selected ? C.wasabi : C.gray}`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  background: selected ? C.wasabi : "transparent", transition: "all 0.3s" }}>
                  {selected && <CheckIcon size={11} />}
                </div>
                <span style={{ color: C.white, fontSize: 14 }}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───
export default function RaptorDBProExplorer() {
  const [section, setSection] = useState("journey");
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(145deg, ${C.deepBlue} 0%, ${C.infiniteBlue} 40%, #062F45 100%)`, fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif", color: C.white }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
        button:focus-visible { outline: 2px solid ${C.wasabi}60; outline-offset: 2px; }
        button:focus:not(:focus-visible) { outline: none; }
      `}</style>
      <header style={{ padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.cardBorder}`, flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${C.wasabi}, #4ADE80)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DatabaseIcon size={18} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>RaptorDB <span style={{ color: C.wasabi }}>Pro</span></div>
            <div style={{ fontSize: 10, color: C.gray, letterSpacing: 0.3 }}>The AI-Ready Database for the Agentic Era</div>
          </div>
        </div>
        <SectionNav active={section} onChange={setSection} />
      </header>
      <main style={{ padding: "36px 28px 52px", maxWidth: 1080, margin: "0 auto" }}>
        {section === "journey" && <JourneySection />}
        {section === "usecases" && <UseCasesSection />}
        {section === "discovery" && <DiscoverySection />}
      </main>
      <footer style={{ padding: "14px 28px", borderTop: `1px solid ${C.cardBorder}`, textAlign: "center" }}>
        <p style={{ color: C.gray, fontSize: 10, margin: 0 }}>
          ServiceNow Confidential &bull; This content may contain forward-looking statements &bull; Not a commitment to deliver any material, code, or functionality &bull; Target outcomes based on internal benchmarks; actual results vary
        </p>
      </footer>
    </div>
  );
}
