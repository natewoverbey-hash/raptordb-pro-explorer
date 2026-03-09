# RaptorDB Pro Interactive Explorer

An interactive, customer-facing experience for exploring RaptorDB Pro value drivers and healthcare use cases.

## Sections

1. **The Journey** — Animated evolution from MariaDB → RaptorDB Standard → RaptorDB Pro with technical details
2. **Use Cases** — 5 healthcare-specific scenarios with before/after comparisons and quantified value drivers
3. **Discovery Navigator** — 7 guided questions that surface the most relevant use cases based on customer responses

## Deploy to Vercel

### Option 1: GitHub → Vercel (Recommended)

1. Create a new GitHub repository
2. Push this project to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - RaptorDB Pro Explorer"
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
- **Customer Proof Points** (green outline badge): Amadeus (45% faster processing), Experian (30M items), FedRAMP government deployment
- **Strategic** (purple badge): Forward-looking AI/agentic readiness positioning

## Safe Harbor

This content may contain forward-looking statements. Information on new products, features, or functionality is intended to outline general product direction and should not be relied upon in making a purchasing decision.
