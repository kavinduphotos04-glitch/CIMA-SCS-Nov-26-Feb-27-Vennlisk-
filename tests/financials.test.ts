import test from "node:test";
import assert from "node:assert/strict";
import { statements, ratios } from "../lib/financials";
import { cosine, retrieve } from "../lib/retrieval";
import { modules, directors } from "../lib/content";
const near = (a: number, b: number) =>
  assert.ok(Math.abs(a - b) < 0.11, `${a} should equal ${b}`);
test("all four statements reconcile from profit to the balance sheet", () => {
  for (const years of Object.values(statements))
    for (const s of Object.values(years)) {
      near(s.revenue - s.cost, s.gross);
      near(s.gross - s.admin, s.operating);
      near(s.operating - s.interest - s.tax, s.net);
      near(s.ppe + s.goodwill + s.intangibles + s.current, s.assets);
      near(s.assets, s.equity + s.debt + s.liabilities);
      near(s.current, s.receivables + s.cash);
      near(s.equity, s.capital + s.retained);
    }
});
test("2026 equity movements reconcile to actual disclosed dividends", () => {
  for (const years of Object.values(statements)) {
    near(
      years["2025"].equity + years["2026"].net - years["2026"].dividend!,
      years["2026"].equity,
    );
  }
});
test("ratios use source figures and leave unavailable historical inputs missing", () => {
  const r = ratios("Vennlisk", "2026");
  near(r.find((v) => v.name === "Gearing")!.value!, 39.8174);
  near(r.find((v) => v.name === "Interest cover")!.value!, 3.3219);
  near(r.find((v) => v.name === "Revenue growth")!.value!, 6.383);
  near(r.find((v) => v.name === "Dividend payout")!.value!, 66.112);
  assert.equal(ratios("Ringcoll", "2025")[0].value, null);
  assert.equal(ratios("Vennlisk", "2025").at(-1)!.value, null);
});
test("semantic ranking returns matching page-aware evidence", () => {
  const chunks = [
    { id: "a", page: 18, text: "finance", embedding: [1, 0] },
    { id: "b", page: 24, text: "training", embedding: [0, 1] },
    { id: "c", page: 4, text: "unindexed" },
  ];
  assert.equal(retrieve(chunks, [0, 1], 1)[0].page, 24);
  assert.equal(cosine([0, 0], [1, 0]), 0);
  assert.equal(cosine([1], [1, 2]), 0);
});
test("all substantive source pages have educational coverage and all directors are present", () => {
  const pages = new Set(
    modules.flatMap((m) => m.lessons.flatMap((l) => l.pages)),
  );
  for (let i = 4; i <= 27; i++) assert.ok(pages.has(i), `Missing page ${i}`);
  assert.equal(directors.length, 9);
  assert.equal(directors.filter((d) => d.type === "Executive").length, 5);
  for (const m of modules) {
    assert.ok(m.lessons.length >= 4);
    assert.ok(m.options[m.correct]);
    assert.ok(m.explanation);
  }
});
