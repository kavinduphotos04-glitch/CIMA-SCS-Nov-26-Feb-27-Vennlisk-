import type { MockProgress } from "./types";
export function normaliseMockProgress(value: unknown): MockProgress {
  const p = (
    value && typeof value === "object" ? value : {}
  ) as Partial<MockProgress>;
  const strings = (x: unknown) =>
    Array.isArray(x) ? x.filter((s): s is string => typeof s === "string") : [];
  const records = <T>(x: unknown): Record<string, T> =>
    x && typeof x === "object" && !Array.isArray(x)
      ? (x as Record<string, T>)
      : {};
  return {
    opened: strings(p.opened),
    completed: strings(p.completed),
    writingAttempts: strings(p.writingAttempts),
    lastLesson: typeof p.lastLesson === "string" ? p.lastLesson : "",
    checkpoints: records(p.checkpoints),
    drafts: Object.fromEntries(
      Object.entries(records<unknown>(p.drafts)).filter(
        ([, v]) => typeof v === "string",
      ),
    ) as Record<string, string>,
    selfReview: records(p.selfReview),
  };
}
