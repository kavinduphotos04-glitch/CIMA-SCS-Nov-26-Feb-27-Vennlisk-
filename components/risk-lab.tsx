"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { risks } from "@/lib/content";
export default function RiskLab() {
  const [scores, setScores] = useState(
      risks.map((r) => ({ l: r.likelihood, i: r.impact })),
    ),
    [active, setActive] = useState(0);
  return (
    <main className="page">
      <div className="eyebrow">THE RISK LAB</div>
      <h1>
        Anticipate. Protect. Respond<span>.</span>
      </h1>
      <p className="lede">
        Five disclosed risks. Explore the controls, then challenge the residual
        exposure.
      </p>
      <div className="risk-layout">
        <section className="heatmap-panel panel">
          <div className="eyebrow">ILLUSTRATIVE · EDITABLE ASSESSMENTS</div>
          <h2>Where would you focus?</h2>
          <p>
            These scores are teaching assumptions, not Vennlisk’s own
            assessments.
          </p>
          <div className="heatmap-wrap">
            <span className="axis-y">IMPACT →</span>
            <div className="heatmap">
              {[5, 4, 3, 2, 1].flatMap((i) =>
                [1, 2, 3, 4, 5].map((l) => (
                  <div
                    key={`${i}-${l}`}
                    className={`heat-cell level-${i * l >= 15 ? "high" : i * l >= 8 ? "medium" : "low"}`}
                    role="group"
                    aria-label={`Impact ${i}, likelihood ${l}`}
                  >
                    {scores.map((s, n) =>
                      s.i === i && s.l === l ? (
                        <button
                          key={n}
                          onClick={() => setActive(n)}
                          className={active === n ? "active" : ""}
                          title={risks[n].title}
                        >
                          {n + 1}
                        </button>
                      ) : null,
                    )}
                  </div>
                )),
              )}
            </div>
            <span className="axis-x">LIKELIHOOD →</span>
          </div>
          <div className="heatmap-legend">
            <span>Low</span>
            <i />
            <span>High</span>
          </div>
          <div className="score-editor">
            <h3>
              {active + 1}. {risks[active].title}
            </h3>
            <label>
              Likelihood: {scores[active].l}
              <input
                type="range"
                min="1"
                max="5"
                value={scores[active].l}
                onChange={(e) =>
                  setScores((p) =>
                    p.map((s, n) =>
                      n === active ? { ...s, l: Number(e.target.value) } : s,
                    ),
                  )
                }
              />
            </label>
            <label>
              Impact: {scores[active].i}
              <input
                type="range"
                min="1"
                max="5"
                value={scores[active].i}
                onChange={(e) =>
                  setScores((p) =>
                    p.map((s, n) =>
                      n === active ? { ...s, i: Number(e.target.value) } : s,
                    ),
                  )
                }
              />
            </label>
            <strong>
              Illustrative score: {scores[active].l * scores[active].i} / 25
            </strong>
            <button
              className="text-link"
              onClick={() =>
                setScores(risks.map((r) => ({ l: r.likelihood, i: r.impact })))
              }
            >
              Reset assumptions →
            </button>
          </div>
        </section>
        <section className="risk-register">
          <span className="eyebrow">SOURCE RISK REGISTER · P. 17</span>
          {risks.map((r, i) => (
            <details
              className="risk-row"
              key={r.title}
              open={active === i}
              onToggle={(e) => {
                if (e.currentTarget.open) setActive(i);
              }}
            >
              <summary>
                <span className="risk-number">0{i + 1}</span>
                <div>
                  <h3>{r.title}</h3>
                  <small>Suggested ownership: {r.owner}</small>
                </div>
                <ChevronDown size={18} />
              </summary>
              <div className="risk-details">
                <h4>Cause & consequences</h4>
                <p>
                  {r.cause}. {r.effect}.
                </p>
                <div className="control existing">
                  <span className="tag">
                    <ShieldCheck size={12} /> Disclosed mitigation
                  </span>
                  <p>{r.existing}.</p>
                </div>
                <div className="control suggested">
                  <span className="tag analysis">
                    Suggested additional control
                  </span>
                  <p>{r.suggested}.</p>
                </div>
                <h4>Board-level question</h4>
                <p>
                  How effective are current controls against{" "}
                  {r.title.toLowerCase()}, and what evidence would justify
                  further investment?
                </p>
                <Link className="text-link" href="/sources/17">
                  Trace to the source ↗
                </Link>
              </div>
            </details>
          ))}
        </section>
      </div>
    </main>
  );
}
