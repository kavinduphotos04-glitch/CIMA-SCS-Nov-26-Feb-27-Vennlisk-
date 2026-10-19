"use client";
import Link from "next/link";
import { useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChartNoAxesCombined,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { money, statements, ratios, Statement } from "@/lib/financials";
const fields: [keyof Statement, string][] = [
  ["revenue", "Revenue"],
  ["cost", "Cost of sales"],
  ["gross", "Gross profit"],
  ["admin", "Selling & administration"],
  ["operating", "Operating profit"],
  ["interest", "Finance costs"],
  ["tax", "Tax expense"],
  ["net", "Profit for the year"],
  ["ppe", "Property, plant & equipment"],
  ["goodwill", "Goodwill"],
  ["intangibles", "Other intangible assets"],
  ["receivables", "Trade receivables"],
  ["cash", "Bank"],
  ["current", "Current assets"],
  ["assets", "Total assets"],
  ["capital", "Share capital"],
  ["retained", "Retained earnings"],
  ["equity", "Total equity"],
  ["debt", "Borrowings"],
  ["payables", "Trade payables"],
  ["taxLiability", "Tax liability"],
  ["liabilities", "Current liabilities"],
  ["dividend", "Dividend"],
];
export default function FinancialExplorer() {
  const reducedMotion = useReducedMotion();
  const [company, setCompany] = useState("Vennlisk"),
    [year, setYear] = useState("2026"),
    [metric, setMetric] = useState<keyof Statement>("revenue");
  const s = statements[company][year],
    r = ratios(company, year),
    prior = statements[company]["2025"],
    growth = year === "2026" ? (s.revenue / prior.revenue - 1) * 100 : null;
  const data = ["2025", "2026"].map((y) => ({
    year: y,
    Vennlisk: statements.Vennlisk[y][metric],
    Ringcoll: statements.Ringcoll[y][metric],
  }));
  return (
    <main className="page financial-page">
      <div className="eyebrow">THE FINANCIAL EXPLORER</div>
      <div className="page-heading">
        <div>
          <h1>
            Numbers, with perspective<span>.</span>
          </h1>
          <p className="lede">
            Go beyond the headline. Compare performance, position and
            possibility.
          </p>
        </div>
        <span className="source-badge">
          <ChartNoAxesCombined size={16} /> VERIFIED SOURCE FIGURES
          <br />
          <small>W$ million · Years ended 30 September</small>
        </span>
      </div>
      <div className="explorer-toolbar">
        <div className="segmented">
          {["Vennlisk", "Ringcoll"].map((c) => (
            <button
              key={c}
              className={c === company ? "selected" : ""}
              onClick={() => setCompany(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="segmented">
          {["2025", "2026"].map((y) => (
            <button
              key={y}
              className={y === year ? "selected" : ""}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      <div className="metric-cards">
        {[
          [
            "Revenue",
            money(s.revenue),
            growth === null
              ? "Prior-year growth unavailable"
              : `${growth.toFixed(2)}% year-on-year`,
          ],
          [
            "Operating profit",
            money(s.operating),
            `${((s.operating / s.revenue) * 100).toFixed(2)}% operating margin`,
          ],
          [
            "Net profit",
            money(s.net),
            `${((s.net / s.revenue) * 100).toFixed(2)}% net margin`,
          ],
          [
            "Borrowings",
            money(s.debt),
            `${((s.debt / (s.equity + s.debt)) * 100).toFixed(2)}% book-value gearing`,
          ],
        ].map(([label, value, note]) => (
          <div key={label} className="metric-card">
            <span>{label}</span>
            <strong>
              {value}
              <small>m</small>
            </strong>
            <p>
              {label === "Revenue" ? (
                <ArrowUpRight size={15} />
              ) : (
                <ArrowDownRight size={15} />
              )}{" "}
              {note}
            </p>
          </div>
        ))}
      </div>
      <div className="financial-chart panel">
        <div className="chart-heading">
          <div>
            <span className="eyebrow">SIDE BY SIDE · 2025 & 2026</span>
            <h2>{fields.find(([k]) => k === metric)?.[1]}</h2>
          </div>
          <label className="select-label">
            Compare metric
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as keyof Statement)}
            >
              {fields.map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div
          className="chart-container"
          role="img"
          aria-label={`${fields.find(([k]) => k === metric)?.[1]} comparison. Exact figures appear in the table below.`}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              barGap={10}
              margin={{ top: 15, right: 15, left: 5, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 6"
                vertical={false}
                stroke="#e8e8f1"
              />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#73758a", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#73758a", fontSize: 11 }}
                width={65}
              />
              <Tooltip
                formatter={(v) =>
                  v == null ? "Not supplied" : `W$ ${money(Number(v))}m`
                }
                contentStyle={{ borderRadius: 12, border: "1px solid #e8e8f1" }}
              />
              <Legend iconType="circle" />
              <Bar
                dataKey="Vennlisk"
                fill="#7954da"
                radius={[5, 5, 0, 0]}
                maxBarSize={65}
                isAnimationActive={!reducedMotion}
                animationDuration={650}
              />
              <Bar
                dataKey="Ringcoll"
                fill="#9ab8f5"
                radius={[5, 5, 0, 0]}
                maxBarSize={65}
                isAnimationActive={!reducedMotion}
                animationDuration={650}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-insight">
          <Info size={17} />
          <p>
            Vennlisk’s 2026 operating profit is similar to Ringcoll’s, but its
            larger finance costs reduce net earnings. Higher revenue alone does
            not establish stronger shareholder returns.
          </p>
        </div>
      </div>
      <section className="ratio-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">UNDERSTAND THE CALCULATION</span>
            <h2>The ratios behind the story.</h2>
          </div>
          <span className="tag">
            {company} · {year}
          </span>
        </div>
        <div className="ratio-grid">
          {r.map((v) => (
            <details className="ratio-card" key={v.name}>
              <summary>
                <span>{v.name}</span>
                <strong>
                  {v.value === null ? "Not supplied" : v.value.toFixed(2)}
                  <small>{v.value === null ? "" : v.unit}</small>
                </strong>
                <span className="ratio-expand">Formula & interpretation +</span>
              </summary>
              <div>
                <code>{v.formula}</code>
                <p className="calculation">
                  {v.values}
                  {v.value === null ? "" : ` = ${v.value.toFixed(2)}${v.unit}`}
                </p>
                <p>{v.meaning}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="panel statements">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE SOURCE DATA</span>
            <h2>Every figure. Fully visible.</h2>
          </div>
          <Link className="text-link" href="/sources/18">
            Source notes ↗
          </Link>
        </div>
        <div className="table-scroll">
          <table>
            <caption>
              Financial statement extracts · W$ million. Expenses shown as
              positive magnitudes and subtracted in profit calculations.
            </caption>
            <thead>
              <tr>
                <th scope="col">Financial item</th>
                <th scope="col">Vennlisk 2025</th>
                <th scope="col">Vennlisk 2026</th>
                <th scope="col">Ringcoll 2025</th>
                <th scope="col">Ringcoll 2026</th>
              </tr>
            </thead>
            <tbody>
              {fields.map(([k, label]) => (
                <tr key={k}>
                  <th scope="row">{label}</th>
                  {["Vennlisk", "Ringcoll"].flatMap((c) =>
                    ["2025", "2026"].map((y) => (
                      <td key={c + y}>
                        {statements[c][y][k] === null
                          ? "Not supplied"
                          : money(statements[c][y][k]!)}
                      </td>
                    )),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fine-print">
          Vennlisk: pp. 18–19. Ringcoll: pp. 20–21. Closing retained earnings
          reconcile to opening earnings + profit − dividends. No 2025 dividends
          or 2024 revenue are supplied. Ratios use closing book balances and 365
          days; receivables assume all revenue is credit revenue.
        </p>
      </section>
    </main>
  );
}
