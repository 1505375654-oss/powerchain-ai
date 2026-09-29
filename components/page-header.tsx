import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-300 pb-5 md:flex-row md:items-end">
      <div>
        <p className="data-label mb-2 text-accent">{eyebrow}</p>
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {meta && <div className="shrink-0 text-right">{meta}</div>}
    </div>
  );
}
