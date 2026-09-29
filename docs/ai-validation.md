# AI Usage & Validation Record

## Validation Principle

**AI-generated claims are treated as hypotheses until supported by Evidence.**

The research workflow follows four core rules:

- Evidence before confidence.
- No source → no verified claim.
- Inference must be labelled.
- Missing information stays unknown.

The purpose of validation is not to make every relationship appear strong. It is to preserve the exact boundary between what a source establishes, what can reasonably be inferred, and what remains unsupported.

## Validation Cases

### Case 1 — Product exists, but revenue is not disclosed

**Example:** Vertiv — Liquid Cooling

**AI candidate**

> A — Revenue Confirmed

**Validation**

Official Vertiv product sources confirm that the company offers liquid-cooling systems and solutions for data-center applications. The reviewed materials do not separately disclose liquid-cooling revenue, orders, or revenue share.

**Correction**

> B — Business Confirmed

**Lesson**

Product existence does not equal disclosed revenue. A relationship cannot be upgraded to A using product pages alone.

### Case 2 — A company is widely associated with a concept

**Example:** Any covered company–segment combination

**AI candidate**

> High-confidence concept exposure because the company is commonly associated with the market theme.

**Validation**

Common market association is not an accepted source. The relationship must be supported by annual reports, regulatory disclosures, Investor Relations materials, official product pages, or other attributable company materials.

**Correction**

> Confidence is assigned from Evidence, not market labels. If no reliable source supports the relationship, it remains unverified or E — No Reliable Evidence.

**Lesson**

Concept popularity is not Evidence.

### Case 3 — Cross-market peer overgeneralization

**Example:** 科华数据 vs Vertiv

**AI candidate**

> They are direct equivalents because both provide UPS products.

**Validation**

The current Evidence supports shared UPS and data-center critical-power exposure. It also shows different portfolio boundaries and disclosure granularity. The current dataset does not establish company-wide equivalence or a normalized financial denominator.

**Correction**

> Comparable for selected UPS exposure; Partially Comparable or Not Directly Comparable for broader portfolio and disclosure dimensions.

**Lesson**

Comparable does not mean equivalent. A shared product category is only one comparison dimension.

### Case 4 — Adjacent segment mistaken for the same segment

**Example:** 科士达 vs Eaton

**AI candidate**

> Direct product peers in the same segment.

**Validation**

Current Evidence confirms 科士达's UPS exposure and Eaton's power-distribution exposure. Both participate in data-center critical electrical infrastructure, but the supported product categories are adjacent rather than identical.

**Correction**

> Partially Comparable for data-center end-market exposure and demand drivers; Not Directly Comparable for product category.

**Lesson**

Industry adjacency must not be converted into identical segment exposure. The pair's `sharedSegmentIds` remains empty.

### Case 5 — Macro shortcut

**AI candidate**

> AI data-center capex rises → company revenue rises.

**Validation**

The statement omits the mechanisms and uncertainties between external spending and reported revenue, including project construction, infrastructure content, supplier eligibility, project wins, orders, shipment timing, pricing, delivery, and accounting recognition.

**Correction**

```text
Capex scenario
→ construction / expansion requirements
→ segment opportunity
→ verified company exposure
→ orders / backlog / shipments
→ possible financial impact
```

**Lesson**

Transmission requires explicit intermediate nodes. A macro variable does not mechanically determine a company result.

### Case 6 — Financial inference presented as fact

**AI candidate**

> Higher rack power density will improve liquid-cooling company margins.

**Validation**

Current sources establish liquid-cooling product exposure, not the magnitude or direction of margin effects. Pricing, product mix, ramp costs, competition, project timing, working capital, and payment terms remain unresolved.

**Correction**

> Potential product-mix, revenue, gross-margin, working-capital, and cash-flow effects remain directional hypotheses.

**Lesson**

Directional exposure is not a financial forecast.

## AI Validation Workflow

1. AI proposes a classification, comparison, or transmission mechanism.
2. Retrieve official or regulatory Evidence.
3. Check whether the Evidence supports the exact claim—not merely an adjacent claim.
4. Assign the appropriate relationship or transmission confidence.
5. Separate Known, Inference, and Unknown.
6. Run typed and runtime data-integrity validation.
7. Surface uncertainty, missing references, and unavailable sources in the UI.

The sequence is intentionally Evidence-first. A plausible conclusion is not accepted merely because it fits an industry narrative.

## Failure Handling

| Failure condition | Product behavior |
|---|---|
| Evidence is missing | Display `Insufficient Evidence` |
| An Evidence ID cannot be resolved | Display `Missing evidence reference` and the affected ID |
| A source URL is unavailable or invalid | Display `Source unavailable / URL unavailable` and disable the source action |
| A relationship is not verified | Do not silently infer or auto-complete it |
| A financial effect cannot be supported | Keep it as a labelled directional hypothesis |
| A data reference breaks validation | Log the entity ID, field, and exact integrity error in development |

## Boundaries

AI is used to structure research, not to replace source verification.

The current system does not treat AI output as Evidence, does not upgrade confidence without source support, does not convert comparison into equivalence, and does not convert a transmission scenario into an investment recommendation or financial forecast.
