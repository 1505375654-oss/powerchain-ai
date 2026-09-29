import Link from "next/link";
import { AssessmentBadge } from "@/components/compare/assessment-badge";
import { EvidenceReferences } from "@/components/compare/evidence-references";
import { comparablePairs, companyById, segmentById } from "@/data/mock";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ pair?: string }> }) {
  const { pair: requestedPairId } = await searchParams;
  const selectedPair = comparablePairs.find((pair) => pair.id === requestedPairId) ?? comparablePairs[0];

  if (!selectedPair) {
    return (
      <div className="rounded-md border border-amber-300 bg-amber-50 p-6">
        <h1 className="text-lg font-bold text-amber-900">No comparison data</h1>
        <p className="mt-2 text-sm text-amber-800">No ComparablePair records are available.</p>
      </div>
    );
  }

  const companyA = companyById.get(selectedPair.companyAId);
  const companyB = companyById.get(selectedPair.companyBId);
  const dimensions = [...selectedPair.comparableDimensions, ...selectedPair.nonComparableDimensions];
  const productBoundary = dimensions.find((dimension) => dimension.dimension === "Product category");
  const sharedSegmentLabel = selectedPair.sharedSegmentIds.map((id) => segmentById.get(id)?.name ?? id).join(" · ");

  return (
    <div className="space-y-5">
      <header className="border-b border-slate-300 pb-5">
        <p className="data-label mb-2 text-accent">Cross-market Framework</p>
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-ink">Cross-market Comparables</h1>
            <p className="mt-2 text-sm text-slate-600">Compare business exposure without assuming full company equivalence.</p>
          </div>
          <p className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-panel">
            Comparable does not mean equivalent.
          </p>
        </div>
      </header>

      <nav className="grid gap-2 rounded-md border border-line bg-white p-2 shadow-panel md:grid-cols-3" aria-label="Comparison pairs">
        {comparablePairs.map((pair) => {
          const left = companyById.get(pair.companyAId);
          const right = companyById.get(pair.companyBId);
          const active = pair.id === selectedPair.id;
          return (
            <Link key={pair.id} href={`/compare?pair=${pair.id}`} className={`rounded px-4 py-3 text-left text-xs font-semibold transition-colors ${active ? "bg-terminal text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-ink"}`}>
              {left?.name ?? pair.companyAId} <span className={active ? "text-cyan-400" : "text-slate-400"}>↔</span> {right?.name ?? pair.companyBId}
            </Link>
          );
        })}
      </nav>

      {(!companyA || !companyB) ? (
        <section className="rounded-md border border-amber-300 bg-amber-50 p-5">
          <p className="data-label text-amber-800">Comparison data error</p>
          <h2 className="mt-2 text-base font-bold text-amber-900">ComparablePair contains an invalid company reference.</h2>
          <p className="mt-2 font-mono text-xs text-amber-800">Pair: {selectedPair.id} · companyAId: {selectedPair.companyAId} · companyBId: {selectedPair.companyBId}</p>
        </section>
      ) : (
        <>
          <section className="rounded-md border border-line bg-white shadow-panel">
            <div className="grid border-b border-line lg:grid-cols-[1fr_120px_1fr]">
              <div className="p-5">
                <p className="data-label">China Company</p>
                <h2 className="mt-2 text-xl font-bold text-ink">{companyA.name}</h2>
                <p className="mt-1 font-mono text-xs text-slate-500">{companyA.exchange}: {companyA.ticker}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div><dt className="data-label">Market</dt><dd className="mt-1 text-slate-700">{companyA.exchange} · {companyA.region}</dd></div>
                  <div><dt className="data-label">Relevant Segment</dt><dd className="mt-1 text-slate-700">{sharedSegmentLabel || productBoundary?.companyA || "Insufficient Evidence"}</dd></div>
                </dl>
              </div>
              <div className="hidden items-center justify-center border-x border-line bg-slate-50 text-2xl text-slate-400 lg:flex">↔</div>
              <div className="p-5">
                <p className="data-label">Global Company</p>
                <h2 className="mt-2 text-xl font-bold text-ink">{companyB.name}</h2>
                <p className="mt-1 font-mono text-xs text-slate-500">{companyB.exchange}: {companyB.ticker}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div><dt className="data-label">Market</dt><dd className="mt-1 text-slate-700">{companyB.exchange} · {companyB.region}</dd></div>
                  <div><dt className="data-label">Relevant Segment</dt><dd className="mt-1 text-slate-700">{sharedSegmentLabel || productBoundary?.companyB || "Insufficient Evidence"}</dd></div>
                </dl>
              </div>
            </div>
            <p className="px-5 py-3 text-xs leading-5 text-slate-600">{selectedPair.summary}</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-md border border-cyan-200 bg-cyan-50/40 p-4">
              <p className="data-label text-cyan-800">Why Comparable</p>
              {selectedPair.comparableDimensions.length > 0 ? (
                <ul className="mt-3 space-y-3 text-xs leading-5 text-slate-700">
                  {selectedPair.comparableDimensions.map((item) => <li key={item.dimension}><span className="font-semibold text-ink">{item.dimension}:</span> {item.reason}</li>)}
                </ul>
              ) : <p className="mt-3 text-xs font-semibold text-amber-700">No verified comparison dimensions</p>}
            </div>
            <div className="rounded-md border border-slate-300 bg-slate-50 p-4">
              <p className="data-label">Not Directly Comparable</p>
              {selectedPair.nonComparableDimensions.length > 0 ? (
                <ul className="mt-3 space-y-3 text-xs leading-5 text-slate-700">
                  {selectedPair.nonComparableDimensions.map((item) => <li key={item.dimension}><span className="font-semibold text-ink">{item.dimension}:</span> {item.reason}</li>)}
                </ul>
              ) : <p className="mt-3 text-xs font-semibold text-amber-700">No verified comparison dimensions</p>}
            </div>
          </section>

          <section className="overflow-hidden rounded-md border border-line bg-white shadow-panel">
            <div className="border-b border-line px-4 py-3">
              <p className="data-label mb-1">Evidence-led Matrix</p>
              <h2 className="text-sm font-semibold text-ink">Comparison Dimensions</h2>
            </div>
            {dimensions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1040px] text-left text-xs">
                  <thead className="border-b border-line bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                    <tr><th className="px-4 py-3">Dimension</th><th className="px-4 py-3">{companyA.name}</th><th className="px-4 py-3">{companyB.name}</th><th className="px-4 py-3">Comparable?</th><th className="px-4 py-3">Why</th><th className="px-4 py-3">Evidence</th></tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {dimensions.map((dimension) => (
                      <tr key={`${dimension.dimension}-${dimension.assessment}`} className="align-top">
                        <td className="px-4 py-4 font-semibold text-ink">{dimension.dimension}</td>
                        <td className="px-4 py-4 leading-5 text-slate-600">{dimension.companyA}</td>
                        <td className="px-4 py-4 leading-5 text-slate-600">{dimension.companyB}</td>
                        <td className="px-4 py-4"><AssessmentBadge assessment={dimension.assessment} /></td>
                        <td className="px-4 py-4 leading-5 text-slate-600">{dimension.reason}</td>
                        <td className="px-4 py-4"><EvidenceReferences evidenceIds={dimension.evidenceIds} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-6 text-sm font-semibold text-slate-600">No verified comparison dimensions</p>
            )}
          </section>

          <section className="rounded-md border border-line bg-white shadow-panel">
            <div className="border-b border-line px-4 py-3">
              <p className="data-label mb-1">Research Boundary</p>
              <h2 className="text-sm font-semibold text-ink">AI Comparison Note</h2>
            </div>
            <div className="grid gap-3 p-4 lg:grid-cols-3">
              <div className="rounded border-l-4 border-cyan-400 bg-cyan-50/50 p-4"><p className="data-label text-cyan-800">Shared Exposure</p><p className="mt-3 text-xs leading-5 text-slate-700">{selectedPair.comparableDimensions[0]?.reason ?? "Insufficient Evidence"}</p></div>
              <div className="rounded border-l-4 border-slate-400 bg-slate-50 p-4"><p className="data-label">Structural Differences</p><p className="mt-3 text-xs leading-5 text-slate-700">{selectedPair.nonComparableDimensions.map((item) => item.reason).join(" ") || "Insufficient Evidence"}</p></div>
              <div className="rounded border-l-4 border-indigo-400 bg-indigo-50/50 p-4"><p className="data-label text-indigo-800">Comparison Boundary</p><p className="mt-3 text-xs leading-5 text-slate-700">{selectedPair.summary} This is a research boundary, not investment advice.</p></div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
