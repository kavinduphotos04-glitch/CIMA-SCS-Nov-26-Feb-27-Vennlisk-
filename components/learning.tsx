"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { modules, directors, glossary, Module } from "@/lib/content";
import { useProgress } from "./progress";
import ModuleCard from "./module-card";
import { CallJourney, Reveal } from "./visuals";
import { KpiLab, CapmLab, StrategyGrid, AiModels } from "./study-tools";
export function LearnIndex() {
  const { progress } = useProgress();
  return (
    <main className="page">
      <div className="eyebrow">YOUR LEARNING LIBRARY</div>
      <div className="page-heading">
        <div>
          <h1>
            See the whole picture<span>.</span>
          </h1>
          <p className="lede">
            Twelve connected chapters. One confident strategic thinker.
          </p>
        </div>
        <div className="large-progress">
          <strong>
            {progress.completed.length}
            <small> / 12</small>
          </strong>
          <span>modules completed</span>
        </div>
      </div>
      <Link className="continue-card" href={`/learn/${progress.last}`}>
        <span className="module-icon">↗</span>
        <div>
          <span className="tiny-eyebrow">PICK UP WHERE YOU LEFT OFF</span>
          <h3>
            {modules.find((m) => m.slug === progress.last)?.title ||
              modules[0].title}
          </h3>
        </div>
        <ArrowRight />
      </Link>
      <div className="module-grid">
        {modules.map((m, i) => (
          <Reveal key={m.slug} delay={(i % 3) * 0.04}>
            <ModuleCard module={m} index={i} />
          </Reveal>
        ))}
      </div>
      <section className="glossary" id="glossary">
        <div className="eyebrow">THE LANGUAGE OF STRATEGY</div>
        <h2>A little clarity goes a long way.</h2>
        <div className="glossary-grid">
          {glossary.map(([word, meaning]) => (
            <details key={word}>
              <summary>
                {word}
                <ChevronDown size={16} />
              </summary>
              <p>{meaning}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
export function KnowledgeCheck({ module: m }: { module: Module }) {
  const { progress, update } = useProgress();
  const [answer, setAnswer] = useState<number | null>(null);
  const choose = (i: number) => {
    if (answer !== null) return;
    setAnswer(i);
    update((p) => ({
      ...p,
      scores: { ...p.scores, [m.slug]: i === m.correct },
    }));
  };
  return (
    <section className="knowledge-check">
      <span className="eyebrow">A QUICK CONFIDENCE CHECK</span>
      <h3>{m.question}</h3>
      <div className="quiz-options">
        {m.options.map((o, i) => (
          <button
            key={o}
            disabled={answer !== null}
            onClick={() => choose(i)}
            className={
              answer !== null
                ? i === m.correct
                  ? "correct"
                  : i === answer
                    ? "incorrect"
                    : ""
                : ""
            }
          >
            <span>{String.fromCharCode(65 + i)}</span>
            {o}
            {answer !== null && i === m.correct && <Check size={17} />}
          </button>
        ))}
      </div>
      {answer !== null && (
        <div className="quiz-feedback" role="status">
          <strong>
            {answer === m.correct
              ? "That’s right."
              : "A useful distinction to remember."}
          </strong>
          <p>{m.explanation}</p>
          <button className="text-link" onClick={() => setAnswer(null)}>
            Try again →
          </button>
        </div>
      )}
      {answer === null && progress.scores[m.slug] !== undefined && (
        <small>
          Previous result:{" "}
          {progress.scores[m.slug] ? "correct" : "review recommended"}. Try
          again to refresh it.
        </small>
      )}
    </section>
  );
}
export function LessonPage({ slug }: { slug: string }) {
  const index = modules.findIndex((m) => m.slug === slug),
    m = modules[index],
    { progress, update } = useProgress();
  const [active, setActive] = useState("topic-0"),
    [sidebar, setSidebar] = useState(true);
  useEffect(() => {
    update((p) => ({
      ...p,
      last: slug,
      visited: [...new Set([...p.visited, slug])],
    }));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document.querySelectorAll(".lesson-topic").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [slug, update]);
  const completed = progress.completed.includes(slug),
    bookmarked = progress.bookmarks.includes(slug);
  return (
    <main className="learning-layout">
      <aside
        className={sidebar ? "chapter-sidebar" : "chapter-sidebar collapsed"}
      >
        <div className="sidebar-top">
          <Link href="/learn">THE LEARNING JOURNEY</Link>
          <button
            onClick={() => setSidebar(!sidebar)}
            aria-label={sidebar ? "Collapse chapters" : "Expand chapters"}
          >
            {sidebar ? (
              <PanelLeftClose size={18} />
            ) : (
              <PanelLeftOpen size={18} />
            )}
          </button>
        </div>
        {sidebar && (
          <>
            <div className="sidebar-progress">
              <span>{progress.completed.length} of 12 completed</span>
              <div className="card-progress">
                <i
                  style={{
                    width: `${(progress.completed.length / 12) * 100}%`,
                  }}
                />
              </div>
            </div>
            <nav aria-label="Chapters">
              {modules.map((c, i) => (
                <Link
                  href={`/learn/${c.slug}`}
                  key={c.slug}
                  className={slug === c.slug ? "selected" : ""}
                >
                  <span>
                    {progress.completed.includes(c.slug) ? (
                      <Check size={13} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  {c.title}
                </Link>
              ))}
            </nav>
            <div className="sidebar-help">
              <span>ONE CHAPTER AT A TIME.</span>
              <p>
                Understanding is progress.
                <br />
                You’re in the right place.
              </p>
            </div>
          </>
        )}
      </aside>
      <div className="lesson-main">
        <div className="breadcrumbs">
          <Link href="/learn">Learn</Link>
          <span>/</span>
          <span>Chapter {index + 1}</span>
        </div>
        <div className="lesson-heading">
          <span className="eyebrow">
            CHAPTER {String(index + 1).padStart(2, "0")} · {m.minutes} MIN READ
          </span>
          <h1>
            {m.title}
            <span>.</span>
          </h1>
          <p className="lede">{m.description}</p>
          <div className="lesson-toolbar">
            <span>
              <Clock3 size={14} /> Pre-seen pp. {m.pages.join(", ")}
            </span>
            <button
              className={bookmarked ? "bookmark saved" : "bookmark"}
              aria-pressed={bookmarked}
              onClick={() =>
                update((p) => ({
                  ...p,
                  bookmarks: bookmarked
                    ? p.bookmarks.filter((s) => s !== slug)
                    : [...p.bookmarks, slug],
                }))
              }
            >
              <Bookmark size={16} />
              {bookmarked ? "Bookmarked" : "Save chapter"}
            </button>
          </div>
        </div>
        <div className="lesson-columns">
          <article className="lesson-content">
            <div className="intro-note">
              Start with the facts. Explore what they mean. Then practise
              advising the Board.
            </div>
            {m.lessons.map((l, i) => (
              <Reveal key={l.title}>
                <section id={`topic-${i}`} className="lesson-topic">
                  <span
                    className={`tag ${l.kind === "Analysis" ? "analysis" : l.kind === "Worked example" ? "example" : ""}`}
                  >
                    {l.kind || "Source fact"}
                  </span>
                  <h2>{l.title}</h2>
                  <p>{l.body}</p>
                  <div className="source-links">
                    {l.pages.map((p) => (
                      <Link href={`/sources/${p}`} key={p}>
                        ↗ p. {p}
                      </Link>
                    ))}
                  </div>
                  {l.takeaway && (
                    <aside className="takeaway">
                      <strong>The takeaway</strong>
                      <p>{l.takeaway}</p>
                    </aside>
                  )}
                </section>
              </Reveal>
            ))}
            {slug === "call-centre-industry" && (
              <>
                <h2>Follow one call.</h2>
                <CallJourney />
                <ModelCompare />
              </>
            )}
            {slug === "operational-performance" && <KpiLab />}
            {slug === "ai-and-digital" && <AiModels />}
            {slug === "strategy-and-position" && <StrategyGrid />}
            {slug === "leadership-and-governance" && <DirectorChart />}
            {slug === "financial-analysis" && (
              <Link className="continue-card" href="/financials">
                <div>
                  <h3>Explore every number.</h3>
                  <p>
                    Interactive statements, comparisons and ten explained
                    ratios.
                  </p>
                </div>
                <ArrowRight />
              </Link>
            )}
            {slug === "principal-risks" && (
              <Link className="continue-card" href="/risks">
                <div>
                  <h3>Open the risk lab.</h3>
                  <p>Explore controls and build an illustrative heatmap.</p>
                </div>
                <ArrowRight />
              </Link>
            )}
            {slug === "investors-and-share-price" && <CapmLab />}
            {slug === "sustainability-and-esg" && <EsgTargets />}
            <div className="exam-insight">
              <span className="eyebrow">THINK LIKE A FINANCE LEADER</span>
              <h3>The examination lens</h3>
              <p>{m.exam}</p>
            </div>
            <KnowledgeCheck module={m} />
            <div className="completion-box">
              <div>
                <h3>
                  {completed
                    ? "Another piece of the picture."
                    : "Ready for the next chapter?"}
                </h3>
                <p>
                  {completed
                    ? "This chapter is marked complete. You can revisit it anytime."
                    : "Mark this chapter complete when you feel confident."}
                </p>
              </div>
              <button
                className={completed ? "button secondary" : "button primary"}
                onClick={() =>
                  update((p) => ({
                    ...p,
                    completed: completed
                      ? p.completed.filter((s) => s !== slug)
                      : [...p.completed, slug],
                  }))
                }
              >
                <Check size={17} />
                {completed ? "Completed · undo" : "Mark complete"}
              </button>
            </div>
            <div className="chapter-pagination">
              {index > 0 ? (
                <Link href={`/learn/${modules[index - 1].slug}`}>
                  <ArrowLeft size={16} />
                  <span>
                    <small>PREVIOUS</small>
                    {modules[index - 1].title}
                  </span>
                </Link>
              ) : (
                <Link href="/learn">
                  <ArrowLeft size={16} /> All chapters
                </Link>
              )}
              {index < 11 ? (
                <Link href={`/learn/${modules[index + 1].slug}`}>
                  <span>
                    <small>UP NEXT</small>
                    {modules[index + 1].title}
                  </span>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <Link href="/exam">
                  Practise what you’ve learned <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </article>
          <aside className="topic-toc">
            <span className="tiny-eyebrow">IN THIS CHAPTER</span>
            {m.lessons.map((l, i) => (
              <a
                key={i}
                href={`#topic-${i}`}
                className={active === `topic-${i}` ? "active" : ""}
              >
                {l.title}
              </a>
            ))}
            <Link
              href={`/tutor?topic=${encodeURIComponent(m.title)}`}
              className="toc-tutor"
            >
              A question on your mind?
              <br />
              <strong>Ask the tutor ↗</strong>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
function ModelCompare() {
  const [model, setModel] = useState("Shared");
  return (
    <div className="panel">
      <div className="segmented">
        {["Shared", "Dedicated"].map((s) => (
          <button
            className={model === s ? "selected" : ""}
            onClick={() => setModel(s)}
            key={s}
          >
            {s} inbound
          </button>
        ))}
      </div>
      <h3>
        {model === "Shared"
          ? "One pool. Multiple clients."
          : "One team. One client."}
      </h3>
      <p>
        {model === "Shared"
          ? "Pay per minute of actual agent time. Flexible for low or uneven demand, but sudden spikes increase the client’s bill. Agents switch between client contexts."
          : "Pay by agent-hour even during idle periods. Deeper client training supports complex calls; stable volume makes paid capacity easier to utilise."}
      </p>
      <span className="tag">Source p. 7</span>
    </div>
  );
}
function DirectorChart() {
  return (
    <section className="director-section">
      <div className="eyebrow">THE BOARD · PP. 13–16</div>
      <h2>People behind the decisions.</h2>
      <div className="org-line">
        Chair & independent challenge ↔ CEO → Functional executive directors
      </div>
      <div className="director-grid">
        {directors.map((d) => (
          <details className="director" key={d.name}>
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
            <p>{d.bio}</p>
            <small>Board appointment / current role: {d.year}</small>
            {d.committees.length > 0 && (
              <p className="committee-list">{d.committees.join(" · ")}</p>
            )}
          </details>
        ))}
      </div>
      <div className="notice">
        Internal audit → Audit Committee convener. The source does not identify
        committee conveners.
      </div>
    </section>
  );
}
function EsgTargets() {
  return (
    <div className="esg-targets">
      <div>
        <span className="eyebrow">TARGET · BY 2030</span>
        <strong>≥80%</strong>
        <h3>Renewable electricity</h3>
        <p>Actual current share is not disclosed.</p>
      </div>
      <div>
        <span className="eyebrow">TARGET · AFTER 2030</span>
        <strong>100%</strong>
        <h3>E-waste recycled or donated</h3>
        <p>Applies to electronic items disposed of after 2030.</p>
      </div>
      <div>
        <span className="eyebrow">AIM · NO DEADLINE GIVEN</span>
        <strong>Fewer cars</strong>
        <h3>Support better commutes</h3>
        <p>
          Interest-free season-ticket and bicycle loans. No achieved mode share
          is supplied.
        </p>
      </div>
    </div>
  );
}
