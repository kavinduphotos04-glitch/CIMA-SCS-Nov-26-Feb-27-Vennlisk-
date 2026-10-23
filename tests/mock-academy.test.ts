import test from "node:test";
import assert from "node:assert/strict";
import {
  allLessons,
  canComplete,
  completion,
  continueLesson,
  evaluateCheckpoint,
  getMockExam,
  mockExams,
  normaliseMockProgress,
} from "../lib/mock-exams";
import { emptyMockProgress } from "../lib/mock-exams/types";
import { statements } from "../lib/financials";
const exam = getMockExam("mock-1")!;
test("only Mock 1 exists and all six lessons contain a complete guided teaching journey", () => {
  assert.equal(mockExams.length, 1);
  assert.equal(getMockExam("mock-2"), undefined);
  assert.equal(exam.sections.length, 3);
  const lessons = allLessons(exam);
  assert.equal(lessons.length, 6);
  assert.equal(new Set(lessons.map((l) => l.slug)).size, 6);
  for (const l of lessons) {
    assert.ok(
      l.question.focus &&
        l.question.plain &&
        l.question.weak &&
        l.question.strong,
    );
    assert.ok(l.theory.length >= 4);
    assert.ok(l.paragraphs.length >= 4);
    assert.equal(l.checkpoints.length, 3);
    assert.deepEqual(
      new Set(l.checkpoints.map((q) => q.type)),
      new Set(["choice", "sequence", "match"]),
    );
    assert.ok(l.sources.some((s) => s.kind === "brief"));
    assert.ok(l.sources.some((s) => s.kind === "preseen"));
    for (const p of l.paragraphs) {
      assert.ok(p.sentences.map((s) => s.text).join(" ").length > 450);
      assert.deepEqual(
        p.sentences.map((s) => s.kind),
        ["evidence", "analysis", "implication", "recommendation"],
      );
      assert.ok(
        p.explanation && p.significance && p.technique && p.evidence.length,
      );
    }
  }
});
test("checkpoint feedback distinguishes correct, wrong and incomplete reasoning for every lesson", () => {
  for (const l of allLessons(exam))
    for (const q of l.checkpoints) {
      if (q.type === "choice") {
        assert.equal(evaluateCheckpoint(q, q.correct), true);
        assert.equal(evaluateCheckpoint(q, "not-an-option"), false);
      } else if (q.type === "sequence") {
        assert.equal(
          evaluateCheckpoint(
            q,
            q.items.map((i) => i.id),
          ),
          true,
        );
        assert.equal(
          evaluateCheckpoint(q, q.items.map((i) => i.id).reverse()),
          false,
        );
        assert.equal(evaluateCheckpoint(q, []), false);
      } else {
        assert.equal(
          evaluateCheckpoint(
            q,
            Object.fromEntries(q.pairs.map((p) => [p.id, p.id])),
          ),
          true,
        );
        assert.equal(evaluateCheckpoint(q, {}), false);
      }
    }
});
test("opening a lesson never completes it, and writing plus attempted checks only permits explicit completion", () => {
  const l = allLessons(exam)[0],
    p = emptyMockProgress();
  p.opened = [l.slug];
  p.lastLesson = l.slug;
  assert.equal(canComplete(l, p), false);
  assert.equal(completion(exam, p).percent, 0);
  p.writingAttempts = [l.slug];
  assert.equal(canComplete(l, p), false);
  p.checkpoints[l.slug] = Object.fromEntries(
    l.checkpoints.map((q) => [q.id, { answer: "attempted", correct: false }]),
  );
  assert.equal(canComplete(l, p), true);
  assert.equal(completion(exam, p).count, 0);
  p.completed = [l.slug, "unknown-future-lesson"];
  assert.deepEqual(completion(exam, p), { count: 1, total: 6, percent: 17 });
  assert.equal(continueLesson(exam, p).number, "1.2");
  p.lastLesson = "debt-financing";
  assert.equal(continueLesson(exam, p).slug, "debt-financing");
});
test("legacy or absent mock progress gets safe defaults without inventing completion", () => {
  const p = normaliseMockProgress(undefined);
  assert.deepEqual(p, emptyMockProgress());
  const restored = normaliseMockProgress({
    opened: ["competitor-analysis", 4],
    drafts: { "competitor-analysis": "A saved draft", bad: 42 },
  });
  assert.deepEqual(restored.opened, ["competitor-analysis"]);
  assert.equal(restored.drafts["competitor-analysis"], "A saved draft");
  assert.equal(restored.drafts.bad, undefined);
  assert.equal(restored.completed.length, 0);
});
test("financial comparison and pilot stages agree with the supplied brief and pre-seen conventions", () => {
  const v = statements.Vennlisk["2026"],
    r = statements.Ringcoll["2026"];
  assert.ok(Math.abs((v.debt / (v.debt + v.equity)) * 100 - 39.8) < 0.1);
  assert.ok(Math.abs((r.debt / (r.debt + r.equity)) * 100 - 19) < 0.1);
  assert.ok(Math.abs(v.operating / v.interest - 3.32) < 0.01);
  assert.ok(r.operating / r.interest > 10);
  const stage = allLessons(exam).find(
    (l) => l.slug === "debt-financing",
  )!.financing!;
  assert.equal(stage.pilot, 40);
  assert.equal(stage.rollout, 240);
  assert.equal(stage.pilot + stage.rollout, 280);
});
