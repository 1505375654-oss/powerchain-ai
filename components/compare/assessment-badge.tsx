import type { ComparisonAssessment } from "@/data/types";

const styles: Record<ComparisonAssessment, string> = {
  Comparable: "border-cyan-300 bg-cyan-50 text-cyan-800",
  "Partially Comparable": "border-indigo-300 bg-indigo-50 text-indigo-800",
  "Not Directly Comparable": "border-slate-300 bg-slate-100 text-slate-700",
};

export function AssessmentBadge({ assessment }: { assessment: ComparisonAssessment }) {
  return (
    <span className={`inline-flex rounded border px-2 py-1 text-[10px] font-bold leading-4 ${styles[assessment]}`}>
      {assessment}
    </span>
  );
}
