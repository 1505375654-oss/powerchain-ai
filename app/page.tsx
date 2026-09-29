import Link from "next/link";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { ConfidenceFramework } from "@/components/company-research/confidence-framework";
import {
  comparablePairs,
  companies,
  conceptRelationships,
  evidence,
  evidenceById,
  industrySegments,
  researchDataset,
  transmissionPaths,
  transmissionScenarios,
} from "@/data/mock";
import type { RelationshipConfidenceLevel } from "@/data/types";

const workflow = [
  { title: "Industry Segment", description: "Define the precise infrastructure category under review." },
  { title: "Company Relationship", description: "Link a company only to segments supported by current research." },
  { title: "Evidence", description: "Every material claim must trace back to a source." },
  { title: "Confidence", description: "Separate verified business exposure from weaker concept association." },
  { title: "Cross-market Comparison", description: "Comparable does not mean equivalent." },
  { title: "Transmission Analysis", description: "Map external changes through business mechanisms before financial metrics." },
];

export default function OverviewPage() {
  const verifiedEvidence = evidence.filter((item) => item.verified);
  const verifiedRelationships = conceptRelationships.filter(
    (relationship) => relationship.evidenceIds.length > 0
      && relationship.evidenceIds.every((evidenceId) => evidenceById.get(evidenceId)?.verified),
  );
  const activeLevels = new Set<RelationshipConfidenceLevel>(verifiedRelationships.map((relationship) => relationship.confidenceLevel));
  const chinaCompanies = companies.filter((company) => company.region === "China");
  const globalCompanies = companies.filter((company) => company.region === "Overseas");
  const featuredCompany = [...companies].sort((companyA, companyB) => {
    const countA = verifiedRelationships.filter((relationship) => relationship.companyId === companyA.id).length;
    const countB = verifiedRelationships.filter((relationship) => relationship.companyId === companyB.id).length;
    return countB - countA;
  })[0];

  const lastUpdated = [
    researchDataset.asOf,
    ...industrySegments.map((segment) => segment.lastUpdated),
    ...companies.map((company) => company.lastUpdated),
    ...evidence.map((item) => item.retrievedAt),
    ...conceptRelationships.map((relationship) => relationship.lastUpdated),
    ...comparablePairs.map((pair) => pair.lastUpdated),
    ...transmissionScenarios.map((scenario) => scenario.lastUpdated),
    ...transmissionPaths.map((path) => path.lastUpdated),
  ].filter(Boolean).sort().at(-1) ?? "Unavailable";

  const capabilities = [
    { code: "01", title: "Company Evidence", description: "See why a company belongs to a segment and inspect every supporting source.", href: featuredCompany ? `/company/${featuredCompany.id}` : "#coverage" },
    { code: "02", title: "Cross-market Compare", description: "Compare shared exposure while preserving structural differences and research boundaries.", href: "/compare" },
    { code: "03", title: "Impact Transmission", description: "Trace external scenarios through industry, operating and financial mechanisms.", href: "/transmission" },
  ];

  return (
    <div className="space-y-6">
      <header className="rounded-md border border-slate-300 bg-white shadow-panel">
        <div className="grid gap-6 px-5 py-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div>
            <p className="data-label mb-2 text-accent">AI Data-center Infrastructure Research</p>
            <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">PowerChain AI</h1>
            <p className="mt-3 text-base font-semibold text-slate-700">Evidence-led AI infrastructure research</p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Trace company–concept relationships, compare China and global peers, and map external changes to business and financial exposure.</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
            <div className="rounded border border-line bg-slate-50 p-3"><dt className="data-label">Research Snapshot</dt><dd className="mt-2 font-semibold text-ink">Verified MVP</dd></div>
            <div className="rounded border border-line bg-slate-50 p-3"><dt className="data-label">Coverage</dt><dd className="mt-2 font-semibold text-ink">China + Global</dd></div>
            <div className="rounded border border-line bg-slate-50 p-3"><dt className="data-label">Last Updated</dt><dd className="mt-2 font-mono font-semibold text-ink">{lastUpdated}</dd></div>
          </dl>
        </div>
        <div className="grid border-t border-line md:grid-cols-3">
          {capabilities.map((capability, index) => (
            <Link key={capability.title} href={capability.href} className={`group p-5 hover:bg-slate-50 ${index > 0 ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
              <div className="flex items-center justify-between"><span className="font-mono text-[10px] font-bold text-cyan-700">{capability.code}</span><span className="text-slate-400 group-hover:text-accent">→</span></div>
              <h2 className="mt-3 text-sm font-bold text-ink">{capability.title}</h2>
              <p className="mt-2 text-xs leading-5 text-slate-600">{capability.description}</p>
            </Link>
          ))}
        </div>
      </header>

      <section id="coverage">
        <div className="mb-3 flex items-end justify-between gap-4"><div><p className="data-label mb-1">Current Research Universe</p><h2 className="text-lg font-bold text-ink">Coverage Snapshot</h2></div><p className="font-mono text-[10px] text-slate-500">As of {lastUpdated}</p></div>
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1.4fr]">
          <Card eyebrow="Industry Scope" title={`${industrySegments.length} Industry Segments`}>
            <div className="flex flex-wrap gap-2">{industrySegments.map((segment) => <Badge key={segment.id} tone="info">{segment.name}</Badge>)}</div>
          </Card>
          <Card eyebrow="Company Coverage" title={`${companies.length} Companies`}>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div><p className="data-label mb-2">China</p><div className="space-y-1.5">{chinaCompanies.map((company) => <Link key={company.id} href={`/company/${company.id}`} className="block font-semibold text-slate-700 hover:text-accent">{company.name}</Link>)}</div></div>
              <div><p className="data-label mb-2">Global</p><div className="space-y-1.5">{globalCompanies.map((company) => <Link key={company.id} href={`/company/${company.id}`} className="block font-semibold text-slate-700 hover:text-accent">{company.name}</Link>)}</div></div>
            </div>
          </Card>
          <Card eyebrow="Research Objects" title="Traceable Dataset">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 xl:grid-cols-5">
              {[
                { label: "Verified Relationships", value: verifiedRelationships.length, empty: "No verified relationships available." },
                { label: "Verified Evidence", value: verifiedEvidence.length, empty: "No verified evidence available." },
                { label: "Cross-market Pairs", value: comparablePairs.length, empty: "No comparison pairs available." },
                { label: "Scenarios", value: transmissionScenarios.length, empty: "No scenarios available." },
                { label: "Transmission Paths", value: transmissionPaths.length, empty: "No transmission paths available." },
              ].map((metric) => (
                <div key={metric.label} className="rounded border border-line bg-slate-50 p-3">
                  <p className="text-xl font-bold text-ink">{metric.value}</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase leading-4 tracking-wider text-slate-500">{metric.value > 0 ? metric.label : metric.empty}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section>
        <div className="mb-3"><p className="data-label mb-1">Company–Concept Map</p><h2 className="text-lg font-bold text-ink">Industry Chain Overview</h2></div>
        <div className="grid gap-4 lg:grid-cols-3">
          {industrySegments.map((segment) => {
            const relationships = verifiedRelationships.filter((relationship) => relationship.segmentId === segment.id);
            const confidenceCounts = relationships.reduce<Partial<Record<RelationshipConfidenceLevel, number>>>((counts, relationship) => {
              counts[relationship.confidenceLevel] = (counts[relationship.confidenceLevel] ?? 0) + 1;
              return counts;
            }, {});
            return (
              <Card key={segment.id} eyebrow="Industry Segment" title={segment.name}>
                {relationships.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between border-b border-line pb-3"><p className="text-xs font-semibold text-slate-700">{relationships.length} verified company relationship{relationships.length === 1 ? "" : "s"}</p><p className="font-mono text-[10px] text-slate-500">{Object.entries(confidenceCounts).map(([level, count]) => `${level} × ${count}`).join(" · ")}</p></div>
                    <div className="mt-3 space-y-2">
                      {relationships.map((relationship) => {
                        const company = companies.find((item) => item.id === relationship.companyId);
                        return company ? <Link key={relationship.id} href={`/company/${company.id}`} className="flex items-center justify-between rounded border border-line px-3 py-2 text-xs hover:border-slate-400 hover:bg-slate-50"><span className="font-semibold text-ink">{company.name}</span><span className="font-mono text-[10px] font-bold text-cyan-800">{relationship.confidenceLevel}</span></Link> : null;
                      })}
                    </div>
                  </>
                ) : <p className="text-xs font-semibold text-slate-500">No verified relationships available.</p>}
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[380px_1fr]">
        <ConfidenceFramework activeLevels={activeLevels} />
        <div className="rounded-md border border-line bg-white shadow-panel">
          <div className="border-b border-line px-4 py-3"><p className="data-label mb-1">Research Method</p><h2 className="text-sm font-semibold text-ink">Research Workflow</h2></div>
          <ol className="grid gap-0 p-4 md:grid-cols-2 xl:grid-cols-3">
            {workflow.map((step, index) => (
              <li key={step.title} className="relative border-b border-line p-4 last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0">
                <div className="flex items-center gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-slate-300 bg-slate-50 font-mono text-[10px] font-bold text-slate-600">{index + 1}</span><h3 className="text-xs font-bold text-ink">{step.title}</h3></div>
                <p className="mt-2 pl-9 text-[11px] leading-5 text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
          <p className="border-t border-line px-5 py-3 text-[11px] font-semibold text-slate-600">Current MVP relationships are rated based on available evidence, not concept popularity.</p>
        </div>
      </section>

      <section className="rounded-md border border-slate-300 bg-slate-50 shadow-panel">
        <div className="grid gap-5 p-5 lg:grid-cols-[220px_1fr]">
          <div><p className="data-label">Research Boundaries</p><h2 className="mt-2 text-lg font-bold text-ink">What this MVP does not claim</h2><p className="mt-3 font-mono text-xs font-semibold text-slate-600">Last Updated · {lastUpdated}</p></div>
          <ul className="grid gap-x-6 gap-y-3 text-xs leading-5 text-slate-700 md:grid-cols-2 xl:grid-cols-3">
            <li>Current MVP uses a verified research snapshot.</li><li>Coverage is intentionally limited.</li><li>Relationship confidence is evidence-based.</li><li>Transmission is a directional research hypothesis.</li><li>No investment recommendation.</li><li>No automatic financial forecast.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
