"use client";
import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  LoaderCircle,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { modules, scenarios, directors, glossary } from "@/lib/content";
import { KnowledgeCheck } from "./learning";
import { useProgress } from "./progress";
const cards = [
  ...modules.map((m) => ({
    front: m.question,
    back: m.options[m.correct] + " — " + m.explanation,
  })),
  ...directors.map((d) => ({
    front: `Who is ${d.name}?`,
    back: `${d.role}. ${d.bio}`,
  })),
  ...glossary.map(([a, b]) => ({ front: a, back: b })),
];
export default function ExamPrep() {
  const [tab, setTab] = useState("Knowledge checks"),
    [chapter, setChapter] = useState(modules[0].slug),
    [card, setCard] = useState(0),
    [flipped, setFlipped] = useState(false),
    [scenario, setScenario] = useState(0),
    [answer, setAnswer] = useState(""),
    [feedback, setFeedback] = useState(""),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  const { progress, update } = useProgress(),
    m = modules.find((m) => m.slug === chapter)!;
  const answered = Object.values(progress.scores),
    correct = answered.filter(Boolean).length;
  async function evaluate() {
    if (answer.trim().length < 50) {
      setError(
        "Write at least 50 characters so there is enough reasoning to review.",
      );
      return;
    }
    setLoading(true);
    setError("");
    setFeedback("");
    update((p) => ({ ...p, attempts: p.attempts + 1 }));
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Fictional practice scenario: ${scenarios[scenario].prompt}\nStudent answer: ${answer}\nProvide qualitative feedback on relevance, case application, depth, balance, recommendations and improvements. Do not award official marks.`,
          mode: "Feedback",
          level: "Advanced",
          history: [],
        }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setFeedback(d.answer);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Feedback request failed.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="page exam-page">
      <div className="eyebrow">THE PRACTICE STUDIO</div>
      <h1>
        Turn understanding
        <br />
        into confidence<span>.</span>
      </h1>
      <p className="lede">
        Retrieve the facts. Apply your judgement. Practise the conversation.
      </p>
      <Link className="continue-card" href="/mock-exams">
        <div>
          <span className="tiny-eyebrow">A GUIDED WAY TO PREPARE</span>
          <h3>Mock Exam Academy</h3>
          <p>
            Understand the question, unpack descriptive answers and practise six
            Mock Exam 1 lessons.
          </p>
        </div>
        <ArrowRight size={20} />
      </Link>
      <div className="practice-stats">
        <div>
          <BookOpen size={18} />
          <strong>
            {answered.length}
            <small>/12</small>
          </strong>
          <span>chapter quizzes attempted</span>
        </div>
        <div>
          <Target size={18} />
          <strong>{correct}</strong>
          <span>latest correct answers</span>
        </div>
        <div>
          <Check size={18} />
          <strong>{progress.attempts}</strong>
          <span>scenario feedback attempts</span>
        </div>
      </div>
      <div className="segmented exam-tabs">
        {[
          "Knowledge checks",
          "Flashcards",
          "Scenario practice",
          "My study record",
        ].map((t) => (
          <button
            key={t}
            className={tab === t ? "selected" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Knowledge checks" && (
        <section className="practice-section">
          <div className="section-heading">
            <div>
              <h2>Small checks. Lasting knowledge.</h2>
              <p>One case-applied question for each of the twelve chapters.</p>
            </div>
            <label className="select-label">
              Select chapter
              <select
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
              >
                {modules.map((m, i) => (
                  <option key={m.slug} value={m.slug}>
                    {i + 1}. {m.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <KnowledgeCheck key={chapter} module={m} />
          <button
            className="text-link"
            onClick={() =>
              setChapter(
                modules[(modules.findIndex((c) => c.slug === chapter) + 1) % 12]
                  .slug,
              )
            }
          >
            Next chapter check <ArrowRight size={16} />
          </button>
        </section>
      )}
      {tab === "Flashcards" && (
        <section className="flashcard-section">
          <div className="section-heading">
            <div>
              <h2>Make it stick.</h2>
              <p>Case facts, directors and essential concepts.</p>
            </div>
            <span className="tag">
              {card + 1} / {cards.length}
            </span>
          </div>
          <button
            className={`flashcard ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
            aria-label={`${flipped ? "Answer" : "Question"}: ${flipped ? cards[card].back : cards[card].front}. Click to flip.`}
          >
            <span className="eyebrow">
              {flipped ? "THE ANSWER" : "THE QUESTION"}
            </span>
            <strong>{flipped ? cards[card].back : cards[card].front}</strong>
            <span>
              <RotateCcw size={14} /> Click or press Enter to flip
            </span>
          </button>
          <div className="flashcard-nav">
            <button
              className="button secondary"
              onClick={() => {
                setCard((card - 1 + cards.length) % cards.length);
                setFlipped(false);
              }}
            >
              <ArrowLeft size={16} /> Previous
            </button>
            <button
              className="button primary"
              onClick={() => {
                setCard((card + 1) % cards.length);
                setFlipped(false);
              }}
            >
              Next card <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}
      {tab === "Scenario practice" && (
        <section className="scenario-section">
          <div className="notice">
            Original fictional scenarios for independent practice. Feedback is
            qualitative and does not award official CIMA marks.
          </div>
          <label className="select-label">
            Choose a scenario
            <select
              value={scenario}
              onChange={(e) => {
                setScenario(Number(e.target.value));
                setAnswer("");
                setFeedback("");
                setError("");
              }}
            >
              {scenarios.map((s, i) => (
                <option key={i} value={i}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>
          <div className="scenario-prompt">
            <span className="eyebrow">YOUR BOARD BRIEFING</span>
            <h2>{scenarios[scenario].title}</h2>
            <p>{scenarios[scenario].prompt}</p>
          </div>
          <label className="answer-label">
            Your response
            <textarea
              maxLength={4500}
              rows={10}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Consider the evidence, explore both sides, and give a practical recommendation…"
            />
          </label>
          <div className="answer-toolbar">
            <span>
              {answer.length}/4,500 characters · Draft held on this page
            </span>
            <button
              className="button primary"
              disabled={loading}
              onClick={evaluate}
            >
              {loading ? (
                <LoaderCircle className="spin" size={16} />
              ) : (
                <Sparkles size={16} />
              )}
              Get qualitative feedback
            </button>
          </div>
          {error && (
            <div role="alert" className="chat-error">
              {error}
            </div>
          )}
          {feedback && (
            <div className="panel markdown">
              <ReactMarkdown>
                {feedback.replace(
                  /\[p\.\s*(\d+)\]/g,
                  (_s, n) => `[p. ${n}](/sources/${n})`,
                )}
              </ReactMarkdown>
            </div>
          )}
          <details className="self-review">
            <summary>
              Self-review guide <ChevronDown size={16} />
            </summary>
            <p>Available without AI. Check whether your answer:</p>
            <ul>
              {scenarios[scenario].points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p>
              Does it explain consequences, acknowledge trade-offs and specify
              ownership and follow-up?
            </p>
          </details>
        </section>
      )}
      {tab === "My study record" && (
        <section className="study-record">
          <h2>Your progress, in one place.</h2>
          <p>Saved locally in this browser. No account required.</p>
          <div className="record-grid">
            {modules.map((m, i) => (
              <Link
                className="record-row"
                href={`/learn/${m.slug}`}
                key={m.slug}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{m.title}</strong>
                <span>
                  {progress.bookmarks.includes(m.slug) ? "★ " : ""}
                  {progress.completed.includes(m.slug)
                    ? "Complete"
                    : progress.visited.includes(m.slug)
                      ? "Visited"
                      : "Not started"}
                </span>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
