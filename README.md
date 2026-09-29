# PowerChain AI

An evidence-led AI research product for mapping company–concept relationships, cross-market comparability, and external-event transmission across AI data-center infrastructure.

## Demo

Live Product:
[https://powerchain-ai.vercel.app](https://powerchain-ai.vercel.app)

Source Code:
[https://github.com/1505375654-oss/powerchain-ai](https://github.com/1505375654-oss/powerchain-ai)

Demo Video:
[PLACEHOLDER — add before submission]

## 1. Problem

Infrastructure and thematic research often compresses several different questions into one market label. Industry-chain boundaries vary across sources, while companies can be associated with a popular concept even when the underlying business relationship is weak or undocumented. China-listed and global companies are also frequently treated as direct peers because they sell products into a similar end market, despite material differences in portfolio scope, geography, customers, services, scale, and disclosure structure. Finally, an external change such as higher AI data-center spending or rack power density is often translated directly into “company benefit,” omitting project timing, product qualification, order conversion, pricing, delivery, working capital, and other intermediate mechanisms. PowerChain AI addresses these problems by separating company–segment classification, primary-source evidence, confidence, comparison boundaries, and transmission hypotheses. It preserves missing information as unknown instead of filling gaps with unsupported assumptions, so users can see both what a conclusion establishes and what it does not establish.

## 2. Target User

PowerChain AI is designed for:

- public-equity researchers;
- industry researchers;
- investors focused on AI infrastructure.

It helps them answer four questions quickly:

- Is the company really exposed to this segment?
- How strong is the evidence?
- Why is a global peer comparable, and where is it not?
- How could an external change propagate into business and financial metrics?

## 3. Scope

The MVP intentionally covers a narrow, reviewable research universe.

**Segments**

- UPS
- Liquid Cooling
- Power Distribution

**China companies**

- 科华数据
- 科士达
- 英维克

**Global companies**

- Vertiv
- Eaton
- Schneider Electric

The current verified snapshot contains:

- 6 companies;
- 8 verified company–segment relationships;
- 16 verified Evidence items;
- 3 cross-market pairs;
- 2 scenarios;
- 5 transmission paths.

These counts describe the current MVP only and should not be interpreted as broad market coverage.

## 4. Core Product Flow

```text
Industry Segment
→ Company Relationship
→ Evidence
→ Confidence
→ Cross-market Comparison
→ Transmission Analysis
```

### Company Evidence

Company Research determines whether a company–segment relationship is supported by disclosed revenue, an established business, deployment/customer evidence, a strategic statement, or no reliable evidence. Each material claim links to its supporting Evidence.

### Cross-market Comparison

Comparison explains why two companies can be studied together and which structural differences prevent them from being treated as equivalents. Dimensions are classified as `Comparable`, `Partially Comparable`, or `Not Directly Comparable`.

### Transmission

Transmission decomposes an external scenario into a fixed six-stage path:

```text
External Driver
→ Industry Effect
→ Segment
→ Company Exposure
→ Business Metric
→ Financial Metric
```

There is no direct “macro change → stock/company benefit” shortcut.

## 5. Confidence Model

- **A — Revenue Confirmed:** relevant revenue, orders, or revenue share is explicitly disclosed.
- **B — Business Confirmed:** official materials confirm the product or business, but do not provide standalone revenue disclosure.
- **C — Deployment / Customer Evidence:** customer, project, or deployment evidence exists, but business scale cannot be confirmed.
- **D — Strategic Statement:** the company or management states an intention to enter the area, without evidenced business results.
- **E — No Reliable Evidence:** no sufficiently reliable evidence supports the relationship.

All eight current MVP relationships are rated B. This is not because the system only supports B: the reviewed official materials confirm that the businesses or products exist, but do not support standalone revenue, order, or revenue-share classification for the defined relationships.

The product does not upgrade confidence simply because a company is widely associated with a market concept.

## 6. AI Role

AI assists with:

- Evidence extraction;
- claim normalization;
- company–segment relationship classification;
- comparison reasoning;
- transmission-hypothesis structuring.

AI does **not**:

- invent missing Evidence;
- upgrade relationship confidence without source support;
- turn inference into a verified fact;
- generate Buy / Sell / Hold recommendations;
- produce unsupported financial forecasts.

The product separates research statements into three categories:

- **Known:** directly supported by reviewed Evidence;
- **Inference:** a labelled interpretation built from known facts;
- **Unknown:** information the current public Evidence cannot establish.

This boundary prevents plausible AI reasoning from being displayed as a verified company fact.

## 7. Evidence & Traceability

Material conclusions are linked through:

```text
evidenceIds → Evidence
```

Evidence priority is:

1. annual reports and regulatory disclosures;
2. Investor Relations materials;
3. official product pages;
4. other official company materials.

The current MVP does not use forums, self-media, or unattributed aggregation pages as core Evidence.

**Every material claim should be traceable to evidence.** Missing references remain visible as `Missing evidence reference`, and unsupported claims are presented as `Insufficient Evidence` rather than silently completed.

## 8. Cross-market Design

**Comparable does not mean equivalent.**

Comparability can be supported by:

- common product exposure;
- common end-market exposure;
- common demand drivers;
- a similar infrastructure role.

Direct comparison can be limited by:

- geographic exposure;
- business portfolio;
- customer mix;
- service mix;
- scale;
- disclosure structure.

The current product documents these boundaries and does not produce direct valuation conclusions.

## 9. Transmission Design

The product uses two separate confidence systems:

- **Relationship Confidence — A–E:** whether a company genuinely belongs to an industry segment.
- **Transmission Confidence — High / Medium / Low:** the evidence strength of a mechanism between transmission stages.

Transmission confidence does not indicate investment quality. Current external drivers are framed as **“What if…”** scenarios so that an unverified macro change is not presented as a current fact.

**Directional research hypothesis, not a financial forecast.**

## 10. Data Update Design

The MVP uses a verified, static research snapshot. A production version could ingest authorized data from:

- iFinD MCP;
- 扶摇;
- company filings;
- official public materials.

The intended update pipeline is:

```text
Source ingestion
→ Evidence extraction
→ relationship classification
→ validation
→ structured dataset
→ UI
```

No real-time iFinD or 扶摇 connection is implemented in this MVP. During the 24-hour build, reproducibility, source verification, and stability of the core research flow were prioritized over a live data interface.

## 11. Tech Stack

- Next.js 15 with the App Router
- React 19
- TypeScript
- Tailwind CSS 3
- PostCSS and Autoprefixer

The MVP uses local typed data modules and does not use a backend database or authentication service.

## 12. Validation & Reliability

[`data/validate.ts`](./data/validate.ts) validates:

- company and segment reference integrity;
- Evidence reference integrity;
- A–E relationship Evidence requirements;
- required `whyNotHigher` explanations;
- ComparablePair company, segment, and dimension references;
- the fixed six-node TransmissionPath structure and node order;
- Company Exposure consistency with its ConceptRelationship;
- High / Medium / Low transmission-confidence values;
- at least one Evidence reference per path;
- prohibition of specific forecast numbers, percentages, EPS, or target prices in Financial Metric nodes;
- Scenario-to-path references.

The UI separately handles missing Evidence IDs and unavailable or invalid URLs without crashing. Development mode logs explicit entity IDs and fields for integrity failures.

## 13. Known Limitations

- Coverage is intentionally narrow.
- The MVP is not real-time.
- All current relationships happen to be B based on available Evidence.
- Some companies do not separately disclose segment revenue.
- Transmission paths describe mechanisms, not magnitude.
- No valuation normalization is implemented.
- The product provides no investment recommendation.
- External scenarios are not automatically claimed to be currently occurring.

## 14. Not Built in This MVP

- real-time iFinD / 扶摇 integration;
- alerts;
- watchlists;
- AI chat;
- automatic peer discovery;
- valuation engine;
- financial forecasting;
- historical Evidence versioning.

## 15. Run Locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## 16. Product Routes

| Route | Product area |
|---|---|
| `/` | Overview |
| `/company/[id]` | Company Evidence |
| `/compare` | Cross-market Comparison |
| `/transmission` | Impact Transmission |

## 17. Disclaimer

For research and information organization only. This product does not constitute investment advice.
