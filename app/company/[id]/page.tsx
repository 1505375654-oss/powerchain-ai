import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { ConfidenceFramework } from "@/components/company-research/confidence-framework";
import { EvidenceCard } from "@/components/company-research/evidence-card";
import { ExposureCard } from "@/components/company-research/exposure-card";
import { ResearchNote } from "@/components/company-research/research-note";
import {
  companies,
  conceptRelationships,
  evidenceById,
  segmentById,
} from "@/data/mock";
import { RELATIONSHIP_CONFIDENCE, type RelationshipConfidenceLevel } from "@/data/types";

export function generateStaticParams() {
  return companies.map((company) => ({ id: company.id }));
}

export default async function CompanyResearchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = companies.find((item) => item.id === id);
  if (!company) notFound();

  const relationships = conceptRelationships.filter((relationship) => relationship.companyId === company.id);
  const activeLevels = new Set<RelationshipConfidenceLevel>(relationships.map((relationship) => relationship.confidenceLevel));
  const uniqueSegments = relationships
    .map((relationship) => segmentById.get(relationship.segmentId)?.name)
    .filter((segment): segment is NonNullable<typeof segment> => Boolean(segment));

  const known = relationships.length > 0
    ? relationships.map((relationship) => relationship.claim)
    : ["No verified industry relationship is currently recorded for this company."];
  const inference = relationships.length > 0
    ? [`Confirmed product exposure to ${uniqueSegments.join(" and ")} may connect the company to data-center infrastructure demand. The magnitude of that exposure is not established by the current evidence.`]
    : ["No company-specific inference should be drawn until a supported relationship is recorded."];
  const unknown = relationships.length > 0
    ? Array.from(new Set(relationships.map((relationship) => relationship.whyNotHigher)))
    : ["The company's relationship to the covered segments remains unconfirmed."];

  return (
    <div className="space-y-5">
      <header className="rounded-md border border-slate-300 bg-white shadow-panel">
        <div className="flex flex-col justify-between gap-5 px-5 py-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge tone="neutral">Company Research</Badge>
              <span className="text-[11px] font-medium text-slate-500">Evidence-led coverage</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-ink">{company.name}</h1>
            <p className="mt-1 text-sm text-slate-500">{company.legalName}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs sm:grid-cols-4 lg:text-right">
            {company.ticker && (
              <div><dt className="data-label">Ticker</dt><dd className="mt-1 font-mono font-semibold text-ink">{company.exchange ? `${company.exchange}: ` : ""}{company.ticker}</dd></div>
            )}
            {company.exchange && (
              <div><dt className="data-label">Market</dt><dd className="mt-1 font-semibold text-ink">{company.exchange}</dd></div>
            )}
            <div><dt className="data-label">Country / Region</dt><dd className="mt-1 font-semibold text-ink">{company.headquartersCountry || company.region}</dd></div>
            <div><dt className="data-label">Last Updated</dt><dd className="mt-1 font-mono font-semibold text-ink">{company.lastUpdated}</dd></div>
          </dl>
        </div>
        <div className="border-t border-line bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600">
          <span className="mr-2 text-accent" aria-hidden="true">◆</span>
          Every material claim should be traceable to evidence.
        </div>
      </header>

      <section>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="data-label mb-1">01 / Classification</p>
            <h2 className="text-lg font-bold text-ink">Industry Exposure</h2>
          </div>
          <p className="text-[11px] text-slate-500">Relationships are shown separately by segment.</p>
        </div>
        {relationships.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {relationships.map((relationship) => {
              const resolvedEvidence = relationship.evidenceIds.map((evidenceId) => evidenceById.get(evidenceId));
              return (
                <ExposureCard
                  key={relationship.id}
                  relationship={relationship}
                  segmentName={segmentById.get(relationship.segmentId)?.name ?? `Unknown segment (${relationship.segmentId})`}
                  verifiedEvidenceCount={resolvedEvidence.filter((item) => item?.verified).length}
                  missingEvidenceCount={resolvedEvidence.filter((item) => !item).length}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">No verified industry relationships</p>
            <p className="mt-2 text-xs text-slate-500">No relationship will be inferred or auto-completed without Evidence.</p>
          </div>
        )}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-3">
            <p className="data-label mb-1">02 / Method</p>
            <h2 className="text-lg font-bold text-ink">Confidence Explanation</h2>
          </div>
          <div className="space-y-4">
            {relationships.map((relationship) => {
              const segment = segmentById.get(relationship.segmentId);
              return (
                <Card
                  key={relationship.id}
                  eyebrow={segment?.name ?? relationship.segmentId}
                  title={`${relationship.confidenceLevel} — ${RELATIONSHIP_CONFIDENCE[relationship.confidenceLevel].label}`}
                  action={<span className="font-mono text-[10px] text-slate-500">{relationship.lastUpdated}</span>}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border-l-2 border-cyan-600 pl-4">
                      <p className="data-label">Why this level?</p>
                      <p className="mt-2 text-xs leading-5 text-slate-700">{relationship.reasoning}</p>
                    </div>
                    <div className="border-l-2 border-slate-400 pl-4">
                      <p className="data-label">Why not higher?</p>
                      <p className="mt-2 text-xs leading-5 text-slate-700">{relationship.whyNotHigher}</p>
                    </div>
                  </div>
                  {relationship.evidenceIds.length === 0 && (
                    <p className="mt-4 rounded border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">Insufficient Evidence</p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
        <div className="xl:pt-[52px]">
          <ConfidenceFramework activeLevels={activeLevels} />
        </div>
      </section>

      <section>
        <div className="mb-3">
          <p className="data-label mb-1">03 / Sources</p>
          <h2 className="text-lg font-bold text-ink">Evidence</h2>
        </div>
        <div className="space-y-4">
          {relationships.map((relationship) => (
            <div key={relationship.id} id={`evidence-${relationship.id}`} className="scroll-mt-20 rounded-md border border-line bg-white shadow-panel">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                <div>
                  <p className="data-label">Relationship Evidence</p>
                  <h3 className="mt-1 text-sm font-semibold text-ink">{segmentById.get(relationship.segmentId)?.name ?? relationship.segmentId}</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">{relationship.evidenceIds.length} source reference{relationship.evidenceIds.length === 1 ? "" : "s"}</span>
              </div>
              {relationship.evidenceIds.length > 0 ? (
                <div className="grid gap-3 p-4 lg:grid-cols-2">
                  {relationship.evidenceIds.map((evidenceId) => (
                    <EvidenceCard key={evidenceId} evidence={evidenceById.get(evidenceId)} referenceId={evidenceId} />
                  ))}
                </div>
              ) : (
                <div className="p-4"><p className="rounded border border-amber-300 bg-amber-50 p-4 text-xs font-semibold text-amber-800">Insufficient Evidence</p></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <ResearchNote known={known} inference={inference} unknown={unknown} />
    </div>
  );
}
