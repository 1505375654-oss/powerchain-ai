import { RELATIONSHIP_CONFIDENCE, type RelationshipConfidenceLevel } from "@/data/types";

const chineseDefinitions: Record<RelationshipConfidenceLevel, string> = {
  A: "相关收入、订单或收入占比得到正式披露。",
  B: "官方材料确认存在相关产品或业务，但没有独立收入披露。",
  C: "存在项目、客户或部署案例，但业务规模无法确认。",
  D: "公司或管理层表示布局该方向，但缺少实际业务结果证据。",
  E: "未找到足够可靠的证据支持该关系。",
};

export function ConfidenceFramework({ activeLevels }: { activeLevels: Set<RelationshipConfidenceLevel> }) {
  return (
    <aside className="rounded-md border border-line bg-white shadow-panel">
      <div className="border-b border-line px-4 py-3">
        <p className="data-label mb-1">Methodology</p>
        <h2 className="text-sm font-semibold text-ink">A–E Confidence Framework</h2>
      </div>
      <ol className="divide-y divide-line px-4">
        {(Object.keys(RELATIONSHIP_CONFIDENCE) as RelationshipConfidenceLevel[]).map((level) => {
          const item = RELATIONSHIP_CONFIDENCE[level];
          const active = activeLevels.has(level);
          return (
            <li key={level} className={`grid grid-cols-[28px_1fr] gap-3 py-3 ${active ? "text-ink" : "text-slate-500"}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded border text-[11px] font-bold ${active ? "border-cyan-600 bg-cyan-50 text-cyan-800" : "border-slate-200 bg-slate-50"}`}>
                {level}
              </span>
              <div>
                <p className="text-xs font-semibold">{item.label}</p>
                <p className="mt-1 text-[11px] leading-4">{chineseDefinitions[level]}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="border-t border-line px-4 py-3 text-[10px] leading-4 text-slate-500">
        This legend explains methodology only. It does not alter any relationship rating.
      </p>
    </aside>
  );
}
