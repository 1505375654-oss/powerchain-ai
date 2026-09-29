import Link from "next/link";
import { TransmissionNodeCard } from "@/components/transmission/transmission-node-card";
import { companyById, segmentById, transmissionPaths, transmissionScenarios } from "@/data/mock";

export default async function TransmissionPage({ searchParams }: { searchParams: Promise<{ scenario?: string; path?: string }> }) {
  const { scenario: requestedScenarioId, path: requestedPathId } = await searchParams;
  const scenario = transmissionScenarios.find((item) => item.id === requestedScenarioId) ?? transmissionScenarios[0];

  if (!scenario) {
    return <div className="rounded-md border border-amber-300 bg-amber-50 p-6 text-sm font-semibold text-amber-900">No transmission scenarios available.</div>;
  }

  const scenarioPaths = scenario.pathIds
    .map((pathId) => transmissionPaths.find((path) => path.id === pathId))
    .filter((path): path is NonNullable<typeof path> => Boolean(path));
  const selectedPath = scenarioPaths.find((path) => path.id === requestedPathId) ?? scenarioPaths[0];

  return (
    <div className="space-y-5">
      <header className="border-b border-slate-300 pb-5">
        <p className="data-label mb-2 text-accent">Impact Transmission</p>
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-ink">From External Change to Financial Metrics</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">A traceable six-stage research framework. Intermediate mechanisms are explicit; financial outcomes are not assumed.</p>
          </div>
          <p className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-panel">Directional research hypothesis, not a financial forecast.</p>
        </div>
      </header>

      <nav className="grid gap-2 rounded-md border border-line bg-white p-2 shadow-panel md:grid-cols-2" aria-label="Transmission scenarios">
        {transmissionScenarios.map((item) => {
          const active = item.id === scenario.id;
          return (
            <Link key={item.id} href={`/transmission?scenario=${item.id}`} className={`rounded px-4 py-3 text-xs font-semibold transition-colors ${active ? "bg-terminal text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-ink"}`}>
              {item.shortLabel}
            </Link>
          );
        })}
      </nav>

      <section className="rounded-md border border-line bg-white shadow-panel">
        <div className="border-b border-line px-5 py-4">
          <p className="data-label">Scenario Analysis</p>
          <h2 className="mt-1 text-xl font-bold text-ink">{scenario.title}</h2>
          <p className="mt-2 text-xs font-semibold text-accent">{scenario.framing}</p>
        </div>
        <div className="grid gap-3 p-4 lg:grid-cols-3">
          <div className="rounded border-l-4 border-sky-400 bg-sky-50/60 p-4"><p className="data-label text-sky-800">Known</p><p className="mt-2 text-xs leading-5 text-slate-700">{scenario.known}</p></div>
          <div className="rounded border-l-4 border-violet-400 bg-violet-50/60 p-4"><p className="data-label text-violet-800">Mechanism</p><p className="mt-2 text-xs leading-5 text-slate-700">{scenario.mechanism}</p></div>
          <div className="rounded border-l-4 border-slate-400 bg-slate-50 p-4"><p className="data-label">Uncertainty</p><p className="mt-2 text-xs leading-5 text-slate-700">{scenario.uncertainty}</p></div>
        </div>
      </section>

      {scenarioPaths.length > 0 ? (
        <>
          <section>
            <div className="mb-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
              <div><p className="data-label mb-1">Verified Company Exposure</p><h2 className="text-lg font-bold text-ink">Select a company path</h2></div>
              <div className="flex flex-wrap gap-2">
                {scenarioPaths.map((path) => {
                  const active = path.id === selectedPath?.id;
                  return <Link key={path.id} href={`/transmission?scenario=${scenario.id}&path=${path.id}`} className={`rounded border px-3 py-2 text-[11px] font-semibold ${active ? "border-cyan-700 bg-cyan-50 text-cyan-900" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>{path.name}</Link>;
                })}
              </div>
            </div>

            {selectedPath ? (
              <div className="rounded-md border border-line bg-slate-100/60 p-3">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
                  <div><p className="data-label">Active Path</p><p className="mt-1 text-sm font-semibold text-ink">{companyById.get(selectedPath.companyId)?.name ?? selectedPath.companyId} · {segmentById.get(selectedPath.segmentId)?.name ?? selectedPath.segmentId}</p></div>
                  <p className="font-mono text-[10px] text-slate-500">Last updated {selectedPath.lastUpdated}</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
                  {selectedPath.nodes.map((node, index) => <TransmissionNodeCard key={node.id} node={node} index={index} isLast={index === selectedPath.nodes.length - 1} />)}
                </div>
                <p className="mt-3 px-1 text-[10px] leading-4 text-slate-500">External change → industry mechanism → affected segment → company exposure → operating metric → financial metric</p>
              </div>
            ) : <div className="rounded border border-amber-300 bg-amber-50 p-4 text-xs font-semibold text-amber-800">Missing TransmissionPath reference.</div>}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
            <div className="rounded-md border border-line bg-white shadow-panel">
              <div className="border-b border-line px-4 py-3"><p className="data-label mb-1">Reverse Factors</p><h2 className="text-sm font-semibold text-ink">Transmission Breakers</h2></div>
              <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {scenario.breakers.map((breaker) => <div key={breaker} className="rounded border border-slate-300 bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-700">{breaker}</div>)}
              </div>
              <p className="border-t border-line px-4 py-3 text-[11px] leading-5 text-slate-500">Even if the external variable changes, company financial results do not mechanically follow.</p>
            </div>
            <aside className="rounded-md border border-line bg-white shadow-panel">
              <div className="border-b border-line px-4 py-3"><p className="data-label mb-1">Methodology</p><h2 className="text-sm font-semibold text-ink">Two Different Confidence Systems</h2></div>
              <div className="space-y-4 p-4 text-[11px] leading-5 text-slate-600">
                <div><p className="font-bold text-ink">Relationship Confidence · A–E</p><p className="mt-1">Tests whether a company genuinely belongs to an industry segment.</p></div>
                <div><p className="font-bold text-ink">Transmission Confidence · High / Medium / Low</p><p className="mt-1">Tests the evidence strength of a mechanism between stages. It does not indicate investment quality.</p></div>
                <dl className="space-y-2 border-t border-line pt-3"><div><dt className="font-semibold text-cyan-800">High</dt><dd>Direct industry or company evidence supports the mechanism.</dd></div><div><dt className="font-semibold text-indigo-800">Medium</dt><dd>Reasonable mechanism with partial evidence and important variables.</dd></div><div><dt className="font-semibold text-slate-700">Low</dt><dd>Research hypothesis requiring further verification.</dd></div></dl>
              </div>
            </aside>
          </section>
        </>
      ) : (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-5 text-sm font-semibold text-amber-900">No valid TransmissionPath records for this scenario.</div>
      )}
    </div>
  );
}
