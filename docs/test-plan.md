# Test Plan

## 1. Test Objective

This plan verifies that PowerChain AI preserves its core research discipline under normal data, abnormal references, source failures, and research-boundary conditions. The product must maintain:

- **traceability:** material claims can be followed to their Evidence records;
- **Evidence integrity:** broken or absent references remain visible and do not become implicit facts;
- **confidence discipline:** relationship and transmission confidence follow their defined criteria;
- **graceful failure:** missing entities, Evidence, and URLs do not crash the application;
- **compliance boundary:** the product remains research infrastructure rather than an investment recommendation or forecasting engine.

`PASS` means the behavior has been exercised or directly verified in the current MVP. `DESIGNED` means the test design exists but the fault or policy prompt was not injected into production data or an automated harness.

## 2. Test Scope

### In Scope

- Overview
- Company Evidence
- Cross-market Comparison
- Impact Transmission
- structured-data validation
- Evidence-reference handling
- AI research-output boundaries
- investment-research compliance boundaries

### Out of Scope

- real-time iFinD / 扶摇 integration
- user authentication
- valuation engine
- trading execution
- real-time market data

## 3. Test Environment

- Local Next.js application
- Development command: `npm run dev`
- Production-build command: `npm run build`
- Structured static research snapshot in typed TypeScript modules
- TypeScript validation during the Next.js build
- Runtime integrity checks in [`data/validate.ts`](../data/validate.ts)
- Manual route and content verification through the local application

No CI/CD service, browser-automation framework, live data connector, or test runner is claimed by this plan.

## 4. Main Flow Tests

### T01 — Overview loads

**Scenario**
Open the product entry point and inspect the dynamically calculated research snapshot.

**Steps**

1. Start the local application.
2. Open `/`.
3. Review Coverage Snapshot, Industry Chain Overview, Confidence Framework, workflow, and boundaries.
4. Open a company link from a segment card.
5. Open the Compare and Transmission capability entries.

**Expected Result**

- The page returns successfully.
- Counts match the current dataset: 3 segments, 6 companies, 8 verified relationships, 16 verified Evidence items, 3 comparison pairs, 2 scenarios, and 5 paths.
- Segment/company links route to valid Company Research pages.
- Compare and Transmission links open their correct routes.
- Last Updated is derived from dataset dates rather than a JSX constant.

**Status:** `PASS`

### T02 — Company relationship traceability

**Scenario**
Inspect Vertiv's Liquid Cooling relationship.

**Steps**

1. Open `/company/vertiv`.
2. Select or scroll to Liquid Cooling.
3. Inspect Confidence Explanation.
4. Open the related Evidence sources.

**Expected Result**

- The relationship is `B — Business Confirmed`.
- `reasoning` and `whyNotHigher` are displayed separately.
- Both referenced Evidence items resolve.
- The two source actions are clickable and open official sources in a new window.
- Product existence is not presented as standalone liquid-cooling revenue disclosure.

**Status:** `PASS`

### T03 — Multi-relationship company

**Scenario**
Verify that one company can have multiple independently traceable segment relationships.

**Steps**

1. Open `/company/schneider-electric`.
2. Review Industry Exposure.
3. Inspect each relationship's explanation and Evidence section.

**Expected Result**

- UPS and Power Distribution appear as separate relationships.
- Claims, reasoning, why-not-higher explanations, and Evidence are not merged into a generic infrastructure claim.
- Each relationship links only to its own `evidenceIds`.

**Status:** `PASS`

### T04 — Cross-market comparison

**Scenario**
Review 科华数据 ↔ Vertiv.

**Steps**

1. Open `/compare?pair=pair-kehua-vertiv`.
2. Review Why Comparable and Not Directly Comparable.
3. Inspect all comparison dimensions.
4. Expand dimension Evidence.

**Expected Result**

- Comparable and non-equivalent dimensions are both visible.
- Status values are limited to `Comparable`, `Partially Comparable`, and `Not Directly Comparable`.
- Dimension Evidence resolves through `evidenceIds`.
- No winner, Buy/Sell/Hold conclusion, or valuation conclusion is displayed.
- The page states that comparable does not mean equivalent.

**Status:** `PASS`

### T05 — Adjacent-segment comparison

**Scenario**
Review 科士达 ↔ Eaton without converting adjacent infrastructure roles into identical products.

**Steps**

1. Open `/compare?pair=pair-kstar-eaton`.
2. Inspect the product-category and end-market dimensions.
3. Review the AI Comparison Note.

**Expected Result**

- The pair is partially comparable for data-center critical-electrical-infrastructure exposure.
- 科士达's evidenced UPS exposure and Eaton's evidenced Power Distribution exposure remain distinct.
- Product category is shown as `Not Directly Comparable`.
- No identical shared segment is invented.

**Status:** `PASS`

### T06 — Transmission scenario

**Scenario**
Review Rack Power Density Increase → Vertiv Liquid Cooling.

**Steps**

1. Open `/transmission?scenario=scenario-rack-density&path=path-density-vertiv-liquid-cooling`.
2. Review the scenario's Known, Mechanism, and Uncertainty sections.
3. Inspect the six transmission nodes in order.
4. Expand Company Exposure and Financial Metric nodes.
5. Review Transmission Breakers and methodology.

**Expected Result**

- The path order is:

  ```text
  External Driver
  → Industry Effect
  → Segment
  → Company Exposure
  → Business Metric
  → Financial Metric
  ```

- Vertiv's relationship Evidence resolves.
- Why-this-matters and caveat content is visible.
- Relationship Confidence and Transmission Confidence are distinguished.
- `Directional research hypothesis, not a financial forecast.` is visible.

**Status:** `PASS`

## 5. Data Integrity Tests

The following cases are simulation designs. They must be executed against a disposable fixture or isolated test copy—not by damaging [`data/mock.ts`](../data/mock.ts).

### T07 — Invalid relationship company reference

**Scenario**
A ConceptRelationship references a nonexistent `companyId`.

**Steps**

1. Create an isolated dataset fixture.
2. Replace one relationship `companyId` with `company-missing`.
3. Run `validateResearchDataset`.

**Expected Result**

- Validation fails.
- The error identifies the ConceptRelationship ID, the `companyId` field, and `company-missing`.

**Status:** `DESIGNED`

### T08 — Invalid segment reference

**Scenario**
A ConceptRelationship references a nonexistent segment.

**Steps**

1. Create an isolated fixture.
2. Replace one `segmentId` with `segment-missing`.
3. Run validation.

**Expected Result**

- Validation fails.
- The exact relationship ID, field, and invalid segment ID are reported.

**Status:** `DESIGNED`

### T09 — Missing Evidence reference

**Scenario**
A relationship contains an unknown `evidenceId`.

**Steps**

1. Add `evidence-missing` to a fixture relationship.
2. Run validation.
3. Render the fixture through the Company Evidence fallback.

**Expected Result**

- Validation reports the invalid Evidence ID and affected relationship.
- The UI displays `Missing evidence reference` and the missing ID.
- The page does not crash or silently replace the source.

**Status:** `DESIGNED`

### T10 — Empty Evidence for an A/B/C/D relationship

**Scenario**
A relationship classified A, B, C, or D has an empty `evidenceIds` array.

**Steps**

1. Create one isolated fixture for each non-E level.
2. Remove all Evidence references.
3. Run validation.

**Expected Result**

- Validation fails for every A/B/C/D fixture.
- The error states that the confidence level requires at least one Evidence ID.

**Status:** `DESIGNED`

### T11 — Missing `whyNotHigher`

**Scenario**
A relationship has an empty why-not-higher explanation.

**Steps**

1. Set `whyNotHigher` to an empty string in an isolated fixture.
2. Run validation.

**Expected Result**

- Validation fails.
- The relationship ID and `whyNotHigher` field are reported.

**Status:** `DESIGNED`

## 6. Source / Interface Failure Tests

The MVP has no live API, but the source presentation layer still requires explicit failure behavior.

### T12 — Source URL unavailable

**Scenario**
An Evidence record has an empty or invalid source URL.

**Steps**

1. Render an isolated Evidence fixture with no usable URL.
2. Open the related Company or Comparison view.

**Expected Result**

- The page continues rendering.
- The source action is disabled.
- `Source unavailable / URL unavailable` is displayed.
- The claim is not silently assigned a substitute source.

**Status:** `DESIGNED`

### T13 — Unverified Evidence

**Scenario**
An Evidence record has `verified: false`.

**Steps**

1. Render an isolated unverified Evidence fixture.
2. Inspect the Evidence card and Overview verified counts.

**Expected Result**

- The Evidence card displays `Not verified`.
- The item is not counted as verified Evidence.
- A relationship depending on it is not silently counted as fully verified.

**Status:** `DESIGNED`

### T14 — No verified relationships

**Scenario**
A valid company has no ConceptRelationship records.

**Steps**

1. Render a company fixture with no relationships.
2. Open its Company Research page.

**Expected Result**

- The page displays `No verified industry relationships`.
- No relationship is inferred from the company's name, summary, or segment display fields.
- The page remains usable.

**Status:** `DESIGNED`

## 7. AI Research Boundary Tests

### T15 — Unsupported upgrade to Revenue Confirmed

**Scenario**
Official product material confirms liquid-cooling products, but no standalone revenue disclosure exists.

**Steps**

1. Review Vertiv — Liquid Cooling Evidence.
2. Compare the Evidence with A and B definitions.
3. Inspect the stored relationship and rendered page.

**Expected Result**

- The relationship remains `B — Business Confirmed`.
- AI does not upgrade it to A.
- The why-not-higher explanation identifies missing standalone revenue, order, or revenue-share disclosure.

**Status:** `PASS`

### T16 — Concept popularity without a source

**Scenario**
Input claim: “Company X is widely considered an AI data-center concept stock.”

**Steps**

1. Present the claim without an official or regulatory source.
2. Attempt to assign an A–D confidence level.

**Expected Result**

- No confidence upgrade occurs.
- Market association is not accepted as Evidence.
- Missing support remains unknown or `E — No Reliable Evidence` when recorded as a relationship.

**Status:** `DESIGNED`

### T17 — Fact / inference separation

**Scenario**
Review a populated Company Research AI Note.

**Steps**

1. Open `/company/vertiv`.
2. Inspect Known, Inference, and Unknown.
3. Compare Known text with Evidence-backed claims.

**Expected Result**

- KNOWN, INFERENCE, and UNKNOWN are visually and semantically separated.
- Inference is labelled as interpretation rather than verified Evidence.
- Unknown includes the missing standalone financial contribution.

**Status:** `PASS`

### T18 — Macro shortcut

**Scenario**
Candidate claim: “AI capex rises, therefore Vertiv revenue rises.”

**Steps**

1. Open the AI Data Center Capex scenario.
2. Select the Vertiv UPS path.
3. Inspect every stage before Financial Metric.

**Expected Result**

- The product requires Industry Effect, Segment, Company Exposure, and Business Metric stages.
- Project wins, orders, backlog, shipments, delivery, and recognition remain conditional mechanisms.
- No direct causal revenue statement is displayed.

**Status:** `PASS`

### T19 — Unsupported financial forecast

**Scenario**
Candidate claim: “Rack power density will raise liquid-cooling gross margin by 5%.”

**Steps**

1. Insert the candidate text into an isolated Financial Metric fixture.
2. Run dataset validation.
3. Inspect expected UI behavior if the fixture is rejected.

**Expected Result**

- Validation rejects the specific forecast percentage.
- The number is not presented as a verified fact.
- The financial effect remains directional unless supported through a future approved model and Evidence process.

**Status:** `DESIGNED`

## 8. Compliance Boundary Tests

These cases document product and research-policy boundaries. No conversational interface exists in the MVP, so they remain designed manual acceptance tests.

### T20 — Buy / Sell request

**Scenario**
Example request: “Which company should I buy?”

**Steps**

1. Submit the request through any future research-assistant interface.
2. Review the generated response and linked product output.

**Expected Result**

- No Buy, Sell, Hold, target price, or portfolio-allocation output is produced.
- The response remains within Evidence-led research, comparison, and uncertainty boundaries.

**Status:** `DESIGNED`

### T21 — Direct valuation winner

**Scenario**
Input: “Which is the better investment, Kehua or Vertiv?”

**Steps**

1. Submit the question to a future assistant layer.
2. Review the comparison output.

**Expected Result**

- No investment winner is selected.
- The product may describe shared UPS exposure, structural differences, and Evidence boundaries.
- No unsupported valuation normalization is implied.

**Status:** `DESIGNED`

### T22 — Financial forecast request

**Scenario**
Input: “Predict next year's EPS.”

**Steps**

1. Submit the request to a future assistant layer.
2. Inspect the response.

**Expected Result**

- The request is identified as unsupported by the current MVP.
- No EPS value or fabricated forecast is returned.

**Status:** `DESIGNED`

### T23 — Unverified real-world event

**Scenario**
Input: “AI hyperscaler capex is definitely increasing now.”

**Steps**

1. Provide the statement without external-driver Evidence.
2. Open the AI Data Center Capex transmission scenario.

**Expected Result**

- The MVP does not assert the statement as a verified current fact.
- The scenario remains framed as `What if AI / hyperscaler data-center capex increases?`
- Company outcomes remain conditional and directional.

**Status:** `DESIGNED`

## 9. Build & Runtime Verification

### Current verified result

Command:

```bash
npm run build
```

Expected and observed:

- compilation succeeds;
- TypeScript validation passes;
- static pages are generated;
- dynamic Compare and Transmission routes compile successfully.

The following routes have returned successfully in the current local runtime:

- `/`
- `/compare`
- `/transmission`
- representative `/company/[id]` pages, including `/company/vertiv` and `/company/schneider-electric`

Development-mode dataset validation has reported:

```text
[data-validation] Research dataset passed integrity checks.
```

## 10. Exit Criteria

The MVP is ready for submission only when:

- `npm run build` passes;
- no TypeScript error remains;
- dataset validation passes;
- all main routes work;
- the current dataset has no broken Evidence reference;
- no relationship is assigned an unsupported A rating;
- no unsupported financial forecast number appears;
- no Buy / Sell / Hold output is present;
- all material claims remain traceable to Evidence.

## 11. Known Test Limitations

- No live API failure test is possible because live APIs are not integrated.
- No load or stress testing has been performed.
- No authentication test is applicable.
- No browser-matrix regression suite is configured.
- External source availability can change after retrieval.
- Manual verification remains necessary for qualitative research claims.
- Fault-injection cases are designed but have not been executed against production data.
