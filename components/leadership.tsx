"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import { directors } from "@/lib/content";
import { committeeGuides, examTriggers, roleGuides } from "@/lib/leadership";
import { Reveal } from "./visuals";
const categories = [
  "All triggers",
  "People",
  "Governance",
  "Technology",
  "Finance & ESG",
];
function Sources({ pages }: { pages: number[] }) {
  return (
    <div className="source-links">
      {pages.map((p) => (
        <a
          key={p}
          href={`/documents/vennlisk-preseen.pdf#page=${p}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pre-seen p. {p} ↗
        </a>
      ))}
    </div>
  );
}
export function LeadershipProfiles() {
  const [filter, setFilter] = useState("All directors");
  const visible = directors.filter(
    (d) =>
      filter === "All directors" ||
      d.type ===
        (filter === "Executive directors" ? "Executive" : "Non-executive"),
  );
  return (
    <section
      className="leadership-profiles"
      id="directors"
      aria-labelledby="directors-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE PEOPLE · SOURCE PP. 13–16</span>
          <h2 id="directors-heading">Who does what?</h2>
          <p>
            Explore each director’s background, disclosed remit and a practical
            application.
          </p>
        </div>
      </div>
      <div className="segmented" aria-label="Filter directors">
        {[
          "All directors",
          "Executive directors",
          "Non-executive directors",
        ].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            className={filter === f ? "selected" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
            {f === "Executive directors"
              ? " · 5"
              : f === "Non-executive directors"
                ? " · 4"
                : " · 9"}
          </button>
        ))}
      </div>
      <p className="director-count" aria-live="polite">
        Showing {visible.length} {filter.toLowerCase()}
      </p>
      <div className="leadership-profile-grid">
        {visible.map((d) => (
          <details key={d.name} className="director leadership-profile">
            <summary>
              <span
                className={`director-avatar ${d.type === "Executive" ? "exec" : ""}`}
              >
                {d.name
                  .replace("Dr ", "")
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </span>
              <span>
                <strong>{d.name}</strong>
                <small>{d.role}</small>
              </span>
              <ChevronDown size={16} />
            </summary>
            <div className="profile-body">
              <span className="tag">Source facts</span>
              <p>{d.bio}</p>
              <h3>Disclosed role & responsibilities</h3>
              <p>{roleGuides[d.name].responsibility}</p>
              <small>Board appointment / current role: {d.year}</small>
              <h3>Applied governance interpretation</h3>
              <p>{roleGuides[d.name].application}</p>
              {d.committees.length > 0 && (
                <p className="committee-list">
                  Committees: {d.committees.join(" · ")}
                </p>
              )}
              <Sources pages={roleGuides[d.name].pages} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
function Committees() {
  return (
    <section
      id="committees"
      className="leadership-committees"
      aria-labelledby="committees-heading"
    >
      <span className="eyebrow">OVERSIGHT · SOURCE P. 16</span>
      <h2 id="committees-heading">Four committees. Shared accountability.</h2>
      <p className="lede">
        Membership is a source fact. The oversight explanations below are study
        interpretations of typical committee functions.
      </p>
      <div className="table-scroll">
        <table>
          <caption>
            Disclosed non-executive committee membership. Conveners are not
            identified in the source.
          </caption>
          <thead>
            <tr>
              <th scope="col">Director</th>
              {committeeGuides.map((c) => (
                <th key={c.name} scope="col">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {directors
              .filter((d) => d.type === "Non-executive")
              .map((d) => (
                <tr key={d.name}>
                  <th scope="row">{d.name}</th>
                  {committeeGuides.map((c) => (
                    <td key={c.name}>
                      {d.committees.includes(c.name) ? "Member" : "—"}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="committee-guide-grid">
        {committeeGuides.map((c) => (
          <article key={c.name}>
            <span className="tag analysis">Governance interpretation</span>
            <h3>{c.name}</h3>
            <p>{c.focus}</p>
          </article>
        ))}
      </div>
      <div className="notice">
        <ShieldCheck size={18} />
        <div>
          <strong>Internal audit’s independent reporting route</strong>
          <p>
            The Chief Internal Auditor reports to the Audit Committee convener.
            No convener is named. Do not assume Alaor chairs or sits on Audit
            simply because of his finance background.
          </p>
        </div>
      </div>
    </section>
  );
}
export function LeadershipTriggers() {
  const [category, setCategory] = useState("All triggers");
  const visible = examTriggers.filter(
    (t) => category === "All triggers" || t.category === category,
  );
  return (
    <section
      id="exam-triggers"
      className="leadership-triggers"
      aria-labelledby="triggers-heading"
    >
      <span className="eyebrow">THE EXAMINATION LENS · ORIGINAL ANALYSIS</span>
      <h2 id="triggers-heading">Spot the tension. Test the evidence.</h2>
      <p className="lede">
        Nine possible angles for practising Board advice. These are study
        scenarios, not predictions or confirmed exam questions.
      </p>
      <div className="notice">
        A case tension is an apparent mismatch or trade-off worth investigating.
        A hypothetical development is invented for practice. Neither label
        establishes fraud, a breach or management failure.
      </div>
      <div className="segmented" aria-label="Filter exam triggers">
        {categories.map((c) => (
          <button
            key={c}
            className={category === c ? "selected" : ""}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="director-count" aria-live="polite">
        {visible.length} exam triggers
      </p>
      <div className="trigger-list">
        {visible.map((t) => (
          <details className="leadership-trigger" id={t.id} key={t.id}>
            <summary>
              <div>
                <span
                  className={`tag ${t.kind === "Hypothetical development" ? "example" : "analysis"}`}
                >
                  {t.kind}
                </span>
                <h3>{t.title}</h3>
                <small>
                  {t.category} · Evidence, responsibility & response
                </small>
              </div>
              <ChevronDown size={19} />
            </summary>
            <div className="trigger-body">
              <h4>What the pre-seen actually says</h4>
              <p>{t.evidence}</p>
              <Sources pages={t.pages} />
              <div className="evidence-boundary">
                <strong>The distinction to protect</strong>
                <p>{t.distinction}</p>
              </div>
              <h4>Possible fictional exam development</h4>
              <p>{t.development}</p>
              <h4>
                Who should lead and challenge?{" "}
                <span className="tag analysis">Suggested response</span>
              </h4>
              <p>{t.owners}</p>
              <h4>How to approach your answer</h4>
              <ol>
                {t.response.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
              <div className="exam-question">
                <span className="eyebrow">ORIGINAL PRACTICE PROMPT</span>
                <p>{t.question}</p>
                <Link
                  className="text-link"
                  href={`/tutor?topic=${encodeURIComponent(t.question)}`}
                >
                  Discuss this with the tutor <ArrowRight size={14} />
                </Link>
                <small>
                  AI requires configuration. The evidence and response guide
                  above work without AI.
                </small>
              </div>
            </div>
          </details>
        ))}
      </div>
      <div className="answer-framework">
        <span className="eyebrow">A REUSABLE ANSWER STRUCTURE</span>
        <h3>Evidence → implication → judgement → action</h3>
        <p>
          Identify the mismatch, consider alternative explanations, explain the
          business and ethical consequences, name an accountable owner and
          recommend evidence-based action with follow-up. State what information
          is missing before reaching a conclusion.
        </p>
      </div>
    </section>
  );
}
export default function LeadershipPage() {
  return (
    <main className="page leadership-page">
      <div className="eyebrow">THE LEADERSHIP ROOM</div>
      <h1>
        Know the people.
        <br />
        Challenge the decision<span>.</span>
      </h1>
      <p className="lede">
        Meet Vennlisk’s executive and non-executive directors, follow their
        responsibilities, and practise spotting governance issues before
        advising the Board.
      </p>
      <div className="leadership-jumps">
        <a href="#directors">Meet the directors ↓</a>
        <a href="#committees">Board committees ↓</a>
        <a href="#exam-triggers">Exam triggers & discrepancies ↓</a>
      </div>
      <div className="leadership-split">
        <Reveal className="leadership-role executive">
          <Users size={26} />
          <span className="eyebrow">5 EXECUTIVE DIRECTORS</span>
          <h2>Manage and deliver.</h2>
          <p>
            Executives lead the business day to day. Chen Yue heads the
            executive structure; HR, Operations, Finance and Marketing have
            distinct disclosed responsibilities.
          </p>
          <small>
            Source facts: pp. 13–15. The management explanation is a study
            interpretation.
          </small>
        </Reveal>
        <Reveal className="leadership-role nonexecutive">
          <ShieldCheck size={26} />
          <span className="eyebrow">4 NON-EXECUTIVE DIRECTORS</span>
          <h2>Scrutinise and challenge.</h2>
          <p>
            The Chair, Senior Independent Director and two independent
            non-executives bring oversight and challenge. They share Board
            accountability without taking over executive operations.
          </p>
          <small>
            Roles and membership: pp. 13–16. The oversight explanation is
            governance interpretation.
          </small>
        </Reveal>
      </div>
      <div className="org-line">
        <Network size={17} />
        <span>
          Full Board · Murat Mutlu, Chair → Chen Yue, CEO → HR / Operations /
          Finance / Marketing
        </span>
      </div>
      <p className="leadership-caveat">
        Chairing the Board and managing the business are different roles. The
        source does not state the Chair’s independence or identify committee
        conveners. Five executives and four non-executives is a disclosed
        composition, not proof of compliance or non-compliance with an
        unspecified governance code.
      </p>
      <LeadershipProfiles />
      <Committees />
      <LeadershipTriggers />
      <Link className="continue-card" href="/learn/leadership-and-governance">
        <div>
          <span className="tiny-eyebrow">CONNECT THE DOTS</span>
          <h3>Continue the leadership learning chapter</h3>
          <p>
            Review the source facts and complete the chapter knowledge check.
          </p>
        </div>
        <ArrowRight />
      </Link>
    </main>
  );
}
