import { Badge } from "./badge";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-slate-700 bg-terminal text-white">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-cyan-600 text-xs font-black">
            P
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold tracking-wide">PowerChain AI</span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:inline">
              Research Terminal
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-slate-400 md:inline">AI Data Center Infrastructure</span>
          <Badge tone="positive">MVP</Badge>
        </div>
      </div>
    </header>
  );
}
