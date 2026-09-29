import type { ReactNode } from "react";

export function Card({
  title,
  eyebrow,
  action,
  children,
  className = "",
}: {
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-md border border-line bg-white shadow-panel ${className}`}>
      {(title || eyebrow || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-3">
          <div>
            {eyebrow && <p className="data-label mb-1">{eyebrow}</p>}
            {title && <h2 className="text-sm font-semibold text-ink">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}
