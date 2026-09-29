const sections = [
  { key: "known", label: "KNOWN", hint: "Directly supported by Evidence", style: "border-sky-300 bg-sky-50/60" },
  { key: "inference", label: "INFERENCE", hint: "Reasoned interpretation, not a verified fact", style: "border-violet-300 bg-violet-50/60" },
  { key: "unknown", label: "UNKNOWN", hint: "Not established by current public evidence", style: "border-slate-300 bg-slate-50" },
] as const;

export function ResearchNote({ known, inference, unknown }: { known: string[]; inference: string[]; unknown: string[] }) {
  const content = { known, inference, unknown };
  return (
    <section className="rounded-md border border-line bg-white shadow-panel">
      <div className="border-b border-line px-4 py-3">
        <p className="data-label mb-1">Fact / Reasoning Boundary</p>
        <h2 className="text-sm font-semibold text-ink">AI Research Note</h2>
      </div>
      <div className="grid gap-3 p-4 lg:grid-cols-3">
        {sections.map((section) => (
          <div key={section.key} className={`rounded border-l-4 p-4 ${section.style}`}>
            <p className="text-[11px] font-bold tracking-[0.14em] text-slate-800">{section.label}</p>
            <p className="mt-1 text-[10px] text-slate-500">{section.hint}</p>
            <ul className="mt-4 space-y-3 text-xs leading-5 text-slate-700">
              {content[section.key].map((item, index) => <li key={`${section.key}-${index}`}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
