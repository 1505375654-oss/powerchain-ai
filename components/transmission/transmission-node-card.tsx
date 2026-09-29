import { EvidenceReferences } from "@/components/compare/evidence-references";
import type { TransmissionNode } from "@/data/types";

const confidenceStyles = {
  High: "border-cyan-300 bg-cyan-50 text-cyan-800",
  Medium: "border-indigo-300 bg-indigo-50 text-indigo-800",
  Low: "border-slate-300 bg-slate-100 text-slate-700",
} as const;

export function TransmissionNodeCard({ node, index, isLast }: { node: TransmissionNode; index: number; isLast: boolean }) {
  return (
    <div className="relative min-w-0">
      <article className="h-full rounded-md border border-line bg-white shadow-panel">
        <div className="border-b border-line px-3 py-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-500">{node.stage}</p>
            <span className="font-mono text-[9px] text-slate-400">0{index + 1}</span>
          </div>
          <h3 className="mt-2 text-xs font-bold leading-5 text-ink">{node.label}</h3>
        </div>
        <div className="p-3">
          <p className="min-h-16 text-[11px] leading-5 text-slate-600">{node.explanation}</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
            <span className={`rounded border px-2 py-1 text-[9px] font-bold ${confidenceStyles[node.confidence]}`}>
              {node.confidence}
            </span>
            <span className="text-[9px] font-semibold text-slate-500">{node.evidenceIds.length} Evidence</span>
          </div>
          <details className="mt-3 border-t border-line pt-3">
            <summary className="cursor-pointer list-none text-[10px] font-semibold text-accent hover:underline">Why / Evidence / Caveat ▾</summary>
            <div className="mt-3 space-y-3">
              <div><p className="data-label">Why this node matters</p><p className="mt-1 text-[10px] leading-4 text-slate-600">{node.whyItMatters}</p></div>
              <div><p className="data-label">Evidence</p><div className="mt-1"><EvidenceReferences evidenceIds={node.evidenceIds} /></div></div>
              <div><p className="data-label">Uncertainty / Caveat</p><p className="mt-1 text-[10px] leading-4 text-slate-600">{node.caveat}</p></div>
            </div>
          </details>
        </div>
      </article>
      {!isLast && <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-slate-300 bg-canvas px-1 text-xs text-slate-500 xl:block" aria-hidden="true">→</span>}
    </div>
  );
}
