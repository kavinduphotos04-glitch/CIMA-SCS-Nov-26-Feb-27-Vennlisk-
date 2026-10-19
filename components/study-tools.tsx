"use client";
import { useState } from "react";
import { ArrowRight, Headphones, MessageCircle, Sparkles } from "lucide-react";
export function KpiLab() {
  const [type, setType] = useState("FCR"),
    [a, setA] = useState("820"),
    [b, setB] = useState("1000"),
    [c, setC] = useState("500"),
    [d, setD] = useState("1000");
  const n = Number(a),
    den = Number(b),
    valid =
      a !== "" &&
      b !== "" &&
      den > 0 &&
      n >= 0 &&
      (type === "AHT" || n <= den) &&
      Number(c) >= 0 &&
      Number(d) >= 0;
  const result = valid
    ? type === "AHT"
      ? (n + Number(c) + Number(d)) / den
      : (n / den) * 100
    : null;
  return (
    <section className="interactive-lab">
      <span className="eyebrow">LEARN BY DOING · HYPOTHETICAL INPUTS</span>
      <h2>The KPI workbench.</h2>
      <div className="segmented">
        {["FCR", "CSAT", "AHT", "Service level", "Abandonment"].map((t) => (
          <button
            key={t}
            className={type === t ? "selected" : ""}
            onClick={() => {
              setType(t);
              setA(t === "AHT" ? "4000" : t === "Abandonment" ? "60" : "820");
              setB("1000");
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <label>
            {type === "AHT"
              ? "Talk time (minutes)"
              : type === "CSAT"
                ? "Satisfied responses"
                : type === "Service level"
                  ? "Answered within threshold"
                  : type === "Abandonment"
                    ? "Calls abandoned"
                    : "Resolved without transfer / repeat"}
            <input
              type="number"
              min="0"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </label>
          {type === "AHT" && (
            <>
              <label>
                Hold time (minutes)
                <input
                  type="number"
                  min="0"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                />
              </label>
              <label>
                After-call work (minutes)
                <input
                  type="number"
                  min="0"
                  value={d}
                  onChange={(e) => setD(e.target.value)}
                />
              </label>
            </>
          )}
          <label>
            {type === "CSAT"
              ? "Valid survey responses"
              : type === "AHT"
                ? "Calls handled"
                : "Total eligible calls"}
            <input
              type="number"
              min="1"
              value={b}
              onChange={(e) => setB(e.target.value)}
            />
          </label>
        </div>
        <div className="calculator-result" aria-live="polite">
          <span>{type}</span>
          <strong>
            {result === null ? "—" : result.toFixed(2)}
            <small>{type === "AHT" ? " min" : "%"}</small>
          </strong>
          <p>
            {result === null
              ? "Use valid counts and a positive denominator."
              : type === "AHT"
                ? `(${a} + ${c} + ${d}) ÷ ${b}`
                : `${a} ÷ ${b} × 100`}
          </p>
        </div>
      </div>
      <p className="fine-print">
        Teaching definitions: CSAT uses positive survey responses; service level
        and abandonment use all eligible offered calls. AHT includes hold and
        after-call work. Agree definitions before comparing performance. These
        inputs are examples, not Vennlisk results.
      </p>
    </section>
  );
}
export function CapmLab() {
  const [risk, setRisk] = useState(4),
    [premium, setPremium] = useState(6);
  return (
    <section className="interactive-lab">
      <span className="eyebrow">HYPOTHETICAL RATES · SOURCE BETA 0.48</span>
      <h2>What might equity cost?</h2>
      <div className="calculator-grid">
        <div className="calculator-inputs">
          <label>
            Risk-free rate: {risk}%
            <input
              aria-label="Risk-free rate"
              type="range"
              min="0"
              max="12"
              step=".25"
              value={risk}
              onChange={(e) => setRisk(Number(e.target.value))}
            />
          </label>
          <label>
            Market risk premium: {premium}%
            <input
              aria-label="Market risk premium"
              type="range"
              min="0"
              max="15"
              step=".25"
              value={premium}
              onChange={(e) => setPremium(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="calculator-result">
          <span>ILLUSTRATIVE COST OF EQUITY</span>
          <strong>
            {(risk + 0.48 * premium).toFixed(2)}
            <small>%</small>
          </strong>
          <p>
            {risk}% + 0.48 × {premium}%
          </p>
        </div>
      </div>
      <p className="fine-print">
        The pre-seen gives beta only (p. 22). The rates are hypothetical. This
        is a learning tool, not an investment recommendation.
      </p>
    </section>
  );
}
export function StrategyGrid() {
  const [active, setActive] = useState(0);
  const items = [
    [
      "Strengths",
      "Trained people. Trusted service.",
      "Vennlisk’s reputation for competent staff supports quality differentiation. Protect training quality as the business grows.",
    ],
    [
      "Weaknesses",
      "Labour intensity. Financing burden.",
      "High domestic labour costs and relatively large finance costs constrain price flexibility and investment headroom.",
    ],
    [
      "Opportunities",
      "Assist, then improve.",
      "Evaluate AI assistance and growing demand through staged pilots with clear service and financial outcomes.",
    ],
    [
      "Threats",
      "A global market. Fragile trust.",
      "Low-cost overseas competitors and privacy or service failures can undermine contracts and the quality premium.",
    ],
  ];
  return (
    <section className="interactive-lab">
      <span className="eyebrow">
        ORIGINAL ANALYSIS · NOT A COMPANY-DISCLOSED SWOT
      </span>
      <h2>Four lenses. One strategy.</h2>
      <div className="swot-grid">
        {items.map(([label, title], i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={active === i ? "selected" : ""}
          >
            <small>{label}</small>
            <strong>{title}</strong>
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <p className="swot-detail" aria-live="polite">
        {items[active][2]}
      </p>
    </section>
  );
}
export function AiModels() {
  const [i, setI] = useState(0);
  const data = [
    [
      "Human-led",
      "Current operating foundation",
      "Call management routes callers to trained agents who use client records and human judgement. IVR can complete some simple tasks.",
      "Source facts · pp. 5, 11, 17",
    ],
    [
      "AI-assisted",
      "Under evaluation at Vennlisk",
      "Potential summaries, recommendations, stress flags and performance-pattern analysis support an agent rather than remove human responsibility.",
      "Potential uses · p. 12",
    ],
    [
      "Chatbot-led",
      "General strategic option",
      "Automation handles suitable simpler queries, with human escalation for difficult or sensitive cases. This is not a disclosed Vennlisk deployment.",
      "News + suggested model · p. 26",
    ],
  ];
  return (
    <section className="interactive-lab">
      <span className="eyebrow">THREE OPERATING MODELS</span>
      <h2>Technology changes the conversation.</h2>
      <div className="segmented">
        {data.map(([t], n) => (
          <button
            key={t}
            className={n === i ? "selected" : ""}
            onClick={() => setI(n)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="ai-model-diagram">
        <MessageCircle />
        <span className="flow-dots">········</span>
        {i === 0 ? <Headphones size={50} /> : <Sparkles size={50} />}
        <span className="flow-dots">········</span>
        <Headphones />
      </div>
      <h3>{data[i][1]}</h3>
      <p>{data[i][2]}</p>
      <span className="tag">{data[i][3]}</span>
    </section>
  );
}
