"use client";
import type { Source, MockExam } from "@/lib/mock-exams/types";
import { BookOpen, ShieldCheck } from "lucide-react";
export function SourceLabels({ sources }: { sources: Source[] }) {
  return (
    <div className="ma-sources">
      {sources.map((s, i) =>
        s.kind === "preseen" ? (
          <span key={i} className="ma-source preseen">
            <BookOpen size={12} />
            {s.label}
            {s.pages?.map((n) => (
              <a
                key={n}
                target="_blank"
                rel="noopener noreferrer"
                href={`/documents/vennlisk-preseen.pdf#page=${n}`}
              >
                p. {n} ↗
              </a>
            ))}
          </span>
        ) : (
          <span className={`ma-source ${s.kind}`} key={i}>
            {s.label}
          </span>
        ),
      )}
    </div>
  );
}
export function ProgressRing({
  percent,
  count,
  total,
}: {
  percent: number;
  count: number;
  total: number;
}) {
  const circumference = 2 * Math.PI * 37;
  return (
    <div
      className="ma-ring"
      role="img"
      aria-label={`${count} of ${total} lessons completed, ${percent}%`}
    >
      <svg viewBox="0 0 90 90" aria-hidden="true">
        <circle cx="45" cy="45" r="37" className="ma-ring-track" />
        <circle
          cx="45"
          cy="45"
          r="37"
          className="ma-ring-value"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percent / 100)}
        />
      </svg>
      <span>
        {percent}
        <small>%</small>
      </span>
    </div>
  );
}
export function SourceNotice({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="ma-source-notice">
      <ShieldCheck size={18} />
      <div>
        <strong>Independent practice. Clear source boundaries.</strong>
        <p>
          {compact
            ? "Questions are reconstructed. Mock scenario facts come from your supplied teaching brief; pre-seen facts have page references. These are original learning answers, not official CIMA marking guidance."
            : "Mock 1 Answer.pdf and Activity A–E workbooks were not available in this workspace. This academy uses your supplied teaching brief, the official pre-seen and independently written theory explanations. Every question is labelled “Reconstructed question focus”. AI incidents, project costs and pilot developments belong to the mock scenario, not the pre-seen. No official marks or exam predictions are provided."}
        </p>
      </div>
    </aside>
  );
}
export function ExamMeta({ exam }: { exam: MockExam }) {
  return (
    <div className="ma-exam-meta">
      <span>{exam.window}</span>
      <span>{exam.caseName}</span>
      <span>{exam.sections.length} examination sections</span>
      <span>
        {exam.sections.flatMap((s) => s.lessons).length} learning modules
      </span>
    </div>
  );
}
