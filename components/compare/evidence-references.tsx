import { evidenceById } from "@/data/mock";

function hasUsableUrl(value: string | undefined): value is string {
  if (!value?.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function EvidenceReferences({ evidenceIds }: { evidenceIds: string[] }) {
  if (evidenceIds.length === 0) {
    return <span className="text-[11px] font-semibold text-amber-700">Insufficient Evidence</span>;
  }

  return (
    <details className="group min-w-[130px]">
      <summary className="cursor-pointer list-none text-[11px] font-semibold text-accent hover:underline">
        {evidenceIds.length} source{evidenceIds.length === 1 ? "" : "s"} <span aria-hidden="true">▾</span>
      </summary>
      <div className="mt-2 space-y-2 rounded border border-line bg-white p-3 shadow-panel">
        {evidenceIds.map((evidenceId) => {
          const evidence = evidenceById.get(evidenceId);
          if (!evidence) {
            return (
              <div key={evidenceId} className="rounded border border-amber-300 bg-amber-50 p-2">
                <p className="text-[10px] font-bold text-amber-800">Missing evidence reference</p>
                <p className="mt-1 break-all font-mono text-[9px] text-amber-800">{evidenceId}</p>
              </div>
            );
          }

          const sourceAvailable = hasUsableUrl(evidence.sourceUrl);
          return (
            <div key={evidence.id} className="border-b border-line pb-2 last:border-0 last:pb-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">{evidence.sourceType}</p>
              {sourceAvailable ? (
                <a href={evidence.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 block text-[11px] font-semibold leading-4 text-accent hover:underline">
                  {evidence.sourceName} ↗
                </a>
              ) : (
                <p className="mt-1 text-[11px] font-semibold text-slate-500">{evidence.sourceName}</p>
              )}
              <p className="mt-1 text-[10px] leading-4 text-slate-600">{evidence.quoteOrFact}</p>
              {!sourceAvailable && <p className="mt-1 text-[10px] text-slate-400">Source unavailable / URL unavailable</p>}
            </div>
          );
        })}
      </div>
    </details>
  );
}
