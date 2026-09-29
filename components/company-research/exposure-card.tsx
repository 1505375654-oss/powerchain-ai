import { RELATIONSHIP_CONFIDENCE, type ConceptRelationship } from "@/data/types";

export function ExposureCard({
  relationship,
  segmentName,
  verifiedEvidenceCount,
  missingEvidenceCount,
}: {
  relationship: ConceptRelationship;
  segmentName: string;
  verifiedEvidenceCount: number;
  missingEvidenceCount: number;
}) {
  const confidence = RELATIONSHIP_CONFIDENCE[relationship.confidenceLevel];
  const hasEvidence = relationship.evidenceIds.length > 0;

  return (
    <a href={`#evidence-${relationship.id}`} className="group block rounded-md border border-line bg-white p-4 shadow-panel transition-colors hover:border-slate-400">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="data-label">Segment</p>
          <h3 className="mt-1 text-base font-bold text-ink">{segmentName}</h3>
        </div>
        <span className="rounded border border-cyan-200 bg-cyan-50 px-2.5 py-1 font-mono text-xs font-bold text-cyan-800">
          {relationship.confidenceLevel}
        </span>
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-700">
        {relationship.confidenceLevel} — {confidence.label}
      </p>
      <p className="mt-2 min-h-10 text-sm leading-5 text-slate-700">{relationship.claim}</p>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px]">
        {hasEvidence ? (
          <span className="font-semibold text-slate-600">{verifiedEvidenceCount} verified source{verifiedEvidenceCount === 1 ? "" : "s"}</span>
        ) : (
          <span className="font-semibold text-amber-700">Insufficient Evidence</span>
        )}
        <span className={missingEvidenceCount > 0 ? "text-amber-700" : "text-slate-400"}>
          {missingEvidenceCount > 0 ? `${missingEvidenceCount} missing reference${missingEvidenceCount === 1 ? "" : "s"}` : "View evidence ↓"}
        </span>
      </div>
    </a>
  );
}
