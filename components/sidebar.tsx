import Link from "next/link";
import { companies, segments } from "@/data/mock";

const navItems = [
  { href: "/", label: "Overview", code: "OV" },
  { href: "/compare", label: "Cross-market Comparison", code: "CM" },
  { href: "/transmission", label: "Impact Transmission", code: "IT" },
];

export function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-14 z-30 hidden w-64 overflow-y-auto border-r border-slate-800 bg-[#111c2c] text-slate-300 lg:block">
      <nav className="p-3">
        <p className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Workspace
        </p>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded px-3 py-2 text-xs font-medium transition hover:bg-slate-800 hover:text-white"
            >
              <span className="w-6 font-mono text-[10px] text-cyan-500">{item.code}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <p className="mt-6 px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Coverage
        </p>
        <div className="space-y-1">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/company/${company.id}`}
              className="flex items-center justify-between rounded px-3 py-2 text-xs transition hover:bg-slate-800 hover:text-white"
            >
              <span>{company.name}</span>
              <span className="font-mono text-[10px] text-slate-500">{company.ticker}</span>
            </Link>
          ))}
        </div>

        <div className="mx-3 mt-6 border-t border-slate-800 pt-4">
          <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-slate-500">Segments</p>
          <div className="flex flex-wrap gap-1.5">
            {segments.map((segment) => (
              <span key={segment} className="rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-400">
                {segment}
              </span>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
