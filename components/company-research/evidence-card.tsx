import { Badge } from "@/components/badge";
import type { Evidence } from "@/data/types";

function hasUsableSourceUrl(value: string | undefined): value is string {
  if (!value?.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function EvidenceCard({ evidence, referenceId }: { evidence?: Evidence; referenceId: string }) {
  if (!evidence) {
    return (
      <article className="rounded-md border border-amber-300 bg-amber-50 p-4">
        <p className="data-label text-amber-800">Missing evidence reference</p>
        <p className="mt-2 font-mono text-xs text-amber-900">{referenceId}</p>
        <p className="mt-2 text-xs text-amber-800">This Evidence ID could not be resolved. The claim remains visibly incomplete.</p>
      </article>
    );
  }

  const sourceAvailable = hasUsableSourceUrl(evidence.sourceUrl);

  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-slate-50/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone="info">{evidence.sourceType}</Badge>
        {evidence.verified ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
            <span aria-hidden="true">✓</span> Verified
          </span>
        ) : (
          <Badge tone="warning">Not verified</Badge>
        )}
      </div>

      <h4 className="mt-4 text-sm font-semibold leading-5 text-ink">{evidence.sourceName}</h4>
      <dl className="mt-3 grid grid-cols-2 gap-3 border-y border-line py-3 text-[10px]">
        <div>
          <dt className="data-label">Published</dt>
          <dd className="mt-1 font-mono text-slate-700">{evidence.publishedAt ?? "Date unavailable"}</dd>
        </div>
        <div>
          <dt className="data-label">Retrieved</dt>
          <dd className="mt-1 font-mono text-slate-700">{evidence.retrievedAt}</dd>
        </div>
      </dl>

      <div className="mt-3 flex-1">
        <p className="data-label">Fact / Finding</p>
        <p className="mt-2 text-xs leading-5 text-slate-700">{evidence.quoteOrFact}</p>
      </div>

      <div className="mt-4 border-t border-line pt-3">
        {sourceAvailable ? (
          <a href={evidence.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
            Open source <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className="cursor-not-allowed text-xs font-semibold text-slate-400" aria-disabled="true">
            Source unavailable / URL unavailable
          </span>
        )}
      </div>
    </article>
  );
}
