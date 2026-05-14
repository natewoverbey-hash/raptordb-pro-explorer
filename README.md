# RaptorDB Pro Interactive Explorer

An interactive, customer-facing experience for exploring RaptorDB Pro value drivers and healthcare use cases.

## Sections

1. **The Journey** — Animated evolution from MariaDB → RaptorDB Standard → RaptorDB Pro with technical details and 6 Pro-exclusive capability cards
2. **Use Cases** — 6 healthcare-specific scenarios with before/after comparisons and quantified value drivers
3. **Discovery Navigator** — 8 guided questions that surface the most relevant use cases based on customer responses

## v2 Updates (May 2026)

### New Use Case: Vulnerability Response at Scale
Added VR as a 6th use case based on K26 field intelligence. VR tables are structurally massive (every CVE × every asset × every scan cycle), and ServiceNow publishes dedicated VR Performance Best Practices acknowledging that high-volume VR environments break standard configurations. RaptorDB Pro's column-store index and parallel processing directly address VR table scale.

### Updated Customer Proof Points
Replaced target/estimated outcomes with verified customer results where available:
- **MTS (Telecom):** 25x faster SQL response, 80% reduction in UI response time, 73% faster report loading, 55% faster list views
- **ProAssurance (Insurance):** 59% reduction in compute time for user-initiated transactions
- **Wells Fargo:** 2-3x faster workflows, 3.5x quicker reports, 2.2x faster list loads
- **Amadeus:** 45% faster processing, 30M items in config DB, <4 months to implement
- **Adobe:** Planning WDF + RaptorDB Pro for AI agent scale

### Updated Pro-Exclusive Capabilities
Added SQL API & BYOBI and Object Store cards to the Journey section's Pro capabilities grid (now 6 cards).

### Updated Positioning
Aligned with latest SSC Solution Brief language: "The Database for AI Agents, Reports & Workflows." Added SQL API/BYOBI as a 5th bullet in Pro journey details.

### New Discovery Question
Added Q8 targeting VR footprint to identify accounts where vulnerability data volume is a bottleneck.

## Deploy to Vercel

### Option 1: GitHub → Vercel (Recommended)

1. Create a new GitHub repository
2. Push this project to the repo:
   ```bash
   git init
   git add .
   git commit -m "v2 - VR use case, updated proof points, May 2026"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/raptordb-pro-explorer.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) and click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite — click **Deploy**
6. Your site will be live at `https://raptordb-pro-explorer.vercel.app`

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Content Notes

- **Verified Benchmarks** (green badge): From TPC-C and TPC-H testing — 27x faster analytics, 53% faster transactions, 3x throughput, 50% compression
- **Target Outcomes** (amber badge): Based on ServiceNow internal benchmarks and expert guidance — actual results vary by environment
- **Customer Proof Points** (green outline badge): MTS (25x SQL, 80% UI), Amadeus (45% faster, 30M items), ProAssurance (59% compute reduction), Wells Fargo (2-3x workflows)
- **Strategic** (purple badge): Forward-looking AI/agentic readiness positioning

## Safe Harbor

This content may contain forward-looking statements. Information on new products, features, or functionality is intended to outline general product direction and should not be relied upon in making a purchasing decision.
