"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  GraduationCap,
  Lightbulb,
  PanelLeftClose,
  PanelLeftOpen,
  Trophy,
} from "lucide-react";
import {
  allLessons,
  canComplete,
  completion,
  getMockExam,
  lessonHref,
} from "@/lib/mock-exams";
import type {
  AnswerParagraph,
  FunctionKind,
  Lesson,
} from "@/lib/mock-exams/types";
import { useMockProgress } from "./use-mock-progress";
import { SourceLabels, SourceNotice } from "./shared";
import {
  CheckpointExercise,
  DecisionSimulator,
  TheoryCards,
  WritingExercise,
} from "./exercises";
const stages = [
  ["question", "Understand the question"],
  ["theory", "Learn the theory"],
  ["apply", "Apply it to Vennlisk"],
  ["anatomy", "Unpack the answer"],
  ["compare", "Weak vs strong"],
  ["try", "Let me try"],
  ["checkpoint", "Knowledge checkpoint"],
  ["full-answer", "Full descriptive answer"],
];
const functionLabels: Record<FunctionKind, string> = {
  evidence: "Case evidence",
  analysis: "Analysis",
  implication: "Business implication",
  recommendation: "Recommendation",
};
function Step({
  number,
  id,
  title,
  intro,
  children,
}: {
  number: number;
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="ma-step" id={id}>
      <div className="ma-step-heading">
        <span>{String(number).padStart(2, "0")}</span>
        <div>
          <span className="ma-kicker">STEP {number} OF 8</span>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
function Application({ lesson }: { lesson: Lesson }) {
  const [active, setActive] = useState(0);
  const parts = [
    ["Theory", lesson.application.theory],
    ["Vennlisk evidence", lesson.application.evidence],
    ["Business implication", lesson.application.implication],
    ["Recommended action", lesson.application.action],
  ];
  return (
    <>
      <div className="ma-application">
        {parts.map(([title, body], i) => (
          <button
            className={`ma-application-stage stage-${i} ${active === i ? "selected" : ""}`}
            key={title}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>
              {i + 1} / {title}
            </span>
            <p>{body}</p>
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <div className="ma-application-note" role="status">
        <Lightbulb size={20} />
        <p>
          <b>{parts[active][0]}:</b>{" "}
          {active === 0
            ? "Name the idea before applying it."
            : active === 1
              ? "Use a concrete fact and keep the mock brief distinct from the pre-seen."
              : active === 2
                ? "Explain what could happen to the business and why."
                : "Make the action respond to the opportunity, risk and available evidence."}{" "}
          {lesson.application.explanation}
        </p>
      </div>
      {lesson.financing && (
        <div
          className="ma-financing-flow"
          aria-label="Forty million pilot, evaluate performance, then two hundred forty million rollout if justified"
        >
          <div>
            <span>INITIAL COMMITMENT</span>
            <strong>W${lesson.financing.pilot}m</strong>
            <p>Pilot</p>
          </div>
          <ArrowRight />
          <div>
            <span>THE DECISION GATE</span>
            <strong>Evaluate</strong>
            <p>Accuracy · customer outcomes · finance</p>
          </div>
          <ArrowRight />
          <div>
            <span>CONDITIONAL COMMITMENT</span>
            <strong>W${lesson.financing.rollout}m</strong>
            <p>Rollout only if justified</p>
          </div>
        </div>
      )}
    </>
  );
}
export function AnnotatedParagraph({
  paragraph,
  expanded = false,
}: {
  paragraph: AnswerParagraph;
  expanded?: boolean;
}) {
  const [active, setActive] = useState<FunctionKind | null>(null);
  return (
    <details className="ma-answer-paragraph" open={expanded}>
      <summary>
        <span>
          <span className="ma-kicker">ANSWER PARAGRAPH</span>
          <h3>{paragraph.title}</h3>
        </span>
        <ChevronDown size={18} />
      </summary>
      <div className="ma-answer-body">
        <p className="ma-paragraph-text">
          {paragraph.sentences.map((s, i) => (
            <span key={i}>
              <button
                className={`ma-sentence ${s.kind} ${active === s.kind ? "highlighted" : ""}`}
                aria-label={`${functionLabels[s.kind]}: ${s.text}`}
                aria-pressed={active === s.kind}
                onClick={() => setActive(active === s.kind ? null : s.kind)}
              >
                {s.text}
              </button>{" "}
            </span>
          ))}
        </p>
        <div className="ma-anatomy-legend">
          {Object.entries(functionLabels).map(([kind, label]) => (
            <button
              key={kind}
              className={kind}
              aria-pressed={active === kind}
              onClick={() =>
                setActive(active === kind ? null : (kind as FunctionKind))
              }
            >
              {label}
            </button>
          ))}
        </div>
        <p className="ma-anatomy-hint" aria-live="polite">
          {active
            ? `${functionLabels[active]} highlighted: ${active === "evidence" ? "grounds the point in the case." : active === "analysis" ? "explains how or why the fact matters." : active === "implication" ? "shows the consequence for the business or stakeholders." : "responds to that consequence with a justified action."}`
            : "Click a sentence or function label to see how the argument works."}
        </p>
        <div className="ma-lecturer-notes">
          <details className="lecturer">
            <summary>
              <BookOpen size={14} /> Lecturer’s explanation{" "}
              <ChevronDown size={14} />
            </summary>
            <p>{paragraph.explanation}</p>
          </details>
          <details className="significance">
            <summary>
              <Lightbulb size={14} /> Why this point matters{" "}
              <ChevronDown size={14} />
            </summary>
            <p>{paragraph.significance}</p>
          </details>
          <details className="evidence">
            <summary>
              <BookOpen size={14} /> Case-study evidence{" "}
              <ChevronDown size={14} />
            </summary>
            <SourceLabels sources={paragraph.evidence} />
          </details>
          <details className="technique">
            <summary>
              <GraduationCap size={14} /> Writing technique{" "}
              <ChevronDown size={14} />
            </summary>
            <p>{paragraph.technique}</p>
          </details>
        </div>
      </div>
    </details>
  );
}
function FullAnswer({ lesson }: { lesson: Lesson }) {
  const [annotated, setAnnotated] = useState(false),
    [notice, setNotice] = useState("");
  const copy = async () => {
    const text = lesson.paragraphs
      .map((p) => p.sentences.map((s) => s.text).join(" "))
      .join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setNotice(
        "Answer copied. This is an original practice response, not official marking guidance.",
      );
    } catch {
      setNotice(
        "Copy is unavailable in this browser. You can select the answer text and copy it manually.",
      );
    }
  };
  return (
    <div className="ma-full-answer">
      <div className="ma-full-toolbar">
        <div className="segmented">
          <button
            className={!annotated ? "selected" : ""}
            aria-pressed={!annotated}
            onClick={() => setAnnotated(false)}
          >
            Clean Exam Answer
          </button>
          <button
            className={annotated ? "selected" : ""}
            aria-pressed={annotated}
            onClick={() => setAnnotated(true)}
          >
            Annotated Lecturer Version
          </button>
        </div>
        <button className="button secondary" onClick={copy}>
          <Copy size={14} /> Copy Answer
        </button>
      </div>
      <p className="ma-answer-disclaimer">
        Original descriptive response to a reconstructed question. Always
        available for revision; no exercise completion is required to read it.
      </p>
      {annotated ? (
        <div>
          {lesson.paragraphs.map((p) => (
            <AnnotatedParagraph key={p.id} paragraph={p} expanded />
          ))}
        </div>
      ) : (
        <div className="ma-clean-answer">
          {lesson.paragraphs.map((p) => (
            <p key={p.id}>{p.sentences.map((s) => s.text).join(" ")}</p>
          ))}
        </div>
      )}
      {notice && (
        <p className="ma-copy-notice" role="status">
          {notice}
        </p>
      )}
    </div>
  );
}
export default function MockLesson({
  examId,
  lessonSlug,
}: {
  examId: string;
  lessonSlug: string;
}) {
  const exam = getMockExam(examId)!,
    lessons = allLessons(exam),
    lesson = lessons.find((l) => l.slug === lessonSlug)!,
    index = lessons.indexOf(lesson);
  const { progress, updateMock, ready } = useMockProgress(examId);
  const [sidebar, setSidebar] = useState(true),
    [active, setActive] = useState("question"),
    [celebration, setCelebration] = useState(false);
  const done = progress.completed.includes(lesson.slug),
    eligible = canComplete(lesson, progress),
    stats = completion(exam, progress),
    answers = Object.keys(progress.checkpoints[lesson.slug] || {}).length;
  useEffect(() => {
    if (!ready) return;
    updateMock((p) => ({
      ...p,
      opened: [...new Set([...p.opened, lessonSlug])],
      lastLesson: lessonSlug,
    }));
  }, [ready, lessonSlug, updateMock]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-12% 0px -65% 0px" },
    );
    document.querySelectorAll(".ma-step").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lessonSlug]);
  function toggleComplete() {
    if (!done && !eligible) return;
    updateMock((p) => ({
      ...p,
      completed: done
        ? p.completed.filter((s) => s !== lesson.slug)
        : [...new Set([...p.completed, lesson.slug])],
    }));
    setCelebration(!done);
  }
  return (
    <main className="academy ma-lesson-layout">
      <aside className={`ma-sidebar ${sidebar ? "" : "collapsed"}`}>
        <div className="ma-sidebar-top">
          <Link href={`/mock-exams/${exam.id}`}>
            {sidebar ? exam.title : "M1"}
          </Link>
          <button
            aria-label={
              sidebar
                ? "Collapse mock lesson navigation"
                : "Expand mock lesson navigation"
            }
            onClick={() => setSidebar(!sidebar)}
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
            <p>
              {stats.count} of {stats.total} lessons completed
            </p>
            <div className="ma-mini-progress">
              <i style={{ width: `${stats.percent}%` }} />
            </div>
            <nav aria-label="Mock Exam 1 lessons">
              {exam.sections.map((s) => (
                <div key={s.id}>
                  <span className="ma-kicker">{s.title}</span>
                  {s.lessons.map((l) => (
                    <Link
                      key={l.slug}
                      href={lessonHref(exam.id, l.slug)}
                      className={l.slug === lesson.slug ? "selected" : ""}
                      aria-current={l.slug === lesson.slug ? "page" : undefined}
                    >
                      <span>
                        {progress.completed.includes(l.slug) ? (
                          <Check size={14} />
                        ) : (
                          l.number
                        )}
                      </span>
                      {l.title}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
            <div className="ma-sidebar-note">
              Understanding is the goal.
              <br />
              Completion records participation, not mastery or an official
              examination mark.
            </div>
          </>
        )}
      </aside>
      <div className="ma-lesson-main">
        <div className="ma-breadcrumbs">
          <Link href="/mock-exams">Academy</Link>
          <span>/</span>
          <Link href={`/mock-exams/${exam.id}`}>{exam.title}</Link>
          <span>/</span>
          <span>Lesson {lesson.number}</span>
        </div>
        <header className="ma-lesson-heading">
          <span className="ma-kicker">
            LESSON {lesson.number} · APPROX. {lesson.minutes} MINUTES
          </span>
          <h1>
            {lesson.title}
            <span>.</span>
          </h1>
          <p>{lesson.summary}</p>
          <div>
            <span className="ma-status">
              {done
                ? "Completed"
                : ready
                  ? "In progress"
                  : "Loading study record…"}
            </span>
            <a className="text-link" href="#full-answer">
              Go to full descriptive answer <ArrowRight size={14} />
            </a>
          </div>
        </header>
        <div className="ma-scenario">
          <span className="ma-kicker">
            MOCK SCENARIO · SUPPLIED TEACHING BRIEF
          </span>
          <p>{lesson.scenario}</p>
        </div>
        <div className="ma-step-nav" aria-label="Lesson steps">
          {stages.map(([id, title], i) => (
            <a
              key={id}
              className={active === id ? "active" : ""}
              href={`#${id}`}
              aria-current={active === id ? "step" : undefined}
            >
              <span>{i + 1}</span>
              {title}
            </a>
          ))}
        </div>
        <Step
          number={1}
          id="question"
          title="What is the examiner really asking?"
          intro="Before writing anything, decide what your answer must do."
        >
          <div className="ma-question-focus">
            <span className="ma-kicker">RECONSTRUCTED QUESTION FOCUS</span>
            <h3>{lesson.question.focus}</h3>
          </div>
          <div className="ma-plain">
            <span className="ma-kicker">IN SIMPLE ENGLISH</span>
            <p>{lesson.question.plain}</p>
          </div>
          <div className="ma-question-grid">
            <article>
              <h3>What to analyse</h3>
              <p>{lesson.question.analyse}</p>
            </article>
            <article>
              <h3>What knowledge helps?</h3>
              <p>{lesson.question.knowledge}</p>
            </article>
          </div>
          <div className="ma-facts">
            <h3>The facts to keep in view</h3>
            <ul>
              {lesson.question.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <SourceLabels sources={lesson.sources} />
          </div>
          <div className="ma-question-grid">
            <article className="ma-watch">
              <h3>What a weak answer overlooks</h3>
              <p>{lesson.question.weak}</p>
            </article>
            <article className="ma-aim">
              <h3>What a strong answer demonstrates</h3>
              <p>{lesson.question.strong}</p>
            </article>
          </div>
        </Step>
        <Step
          number={2}
          id="theory"
          title="Learn the underlying theory."
          intro="Start with an everyday example, then apply the concept to Vennlisk."
        >
          <div className="ma-theory-list">
            {lesson.theory.map((t, i) => (
              <details key={t.term} open={i === 0}>
                <summary>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t.term}</h3>
                  <ChevronDown size={17} />
                </summary>
                <div>
                  <span className="ma-kicker">A SIMPLE EXPLANATION</span>
                  <p>{t.simple}</p>
                  <div className="ma-everyday">
                    <strong>Think of it this way</strong>
                    <p>{t.example}</p>
                  </div>
                  <strong>Now apply it to Vennlisk</strong>
                  <p>{t.application}</p>
                </div>
              </details>
            ))}
          </div>
          <TheoryCards lesson={lesson} />
        </Step>
        <Step
          number={3}
          id="apply"
          title="Build the connection."
          intro="Theory gives you a lens. Case evidence makes it useful. Follow the four stages."
        >
          <Application lesson={lesson} />
          <DecisionSimulator lesson={lesson} />
        </Step>
        <Step
          number={4}
          id="anatomy"
          title="Unpack the descriptive answer."
          intro="Open one paragraph at a time. Click its sentences, then explore each lecturer note independently."
        >
          <div className="ma-paragraphs">
            {lesson.paragraphs.map((p, i) => (
              <AnnotatedParagraph key={p.id} paragraph={p} expanded={i === 0} />
            ))}
          </div>
        </Step>
        <Step
          number={5}
          id="compare"
          title="Weak answer. Stronger reasoning."
          intro="The difference is the quality of the connection, not the number of technical words."
        >
          <div className="ma-comparison">
            <article className="weak">
              <span className="ma-kicker">A GENERIC RESPONSE</span>
              <blockquote>{lesson.comparison.weak}</blockquote>
              <h3>What is missing?</h3>
              <p>{lesson.comparison.whyWeak}</p>
            </article>
            <article className="strong">
              <span className="ma-kicker">AN APPLIED RESPONSE</span>
              <blockquote>{lesson.comparison.strong}</blockquote>
              <h3>Why it works</h3>
              <p>{lesson.comparison.whyStrong}</p>
            </article>
          </div>
        </Step>
        <Step
          number={6}
          id="try"
          title="Let me try."
          intro="Write a short paragraph before revealing the suggested response. Your own words matter."
        >
          <WritingExercise
            lesson={lesson}
            progress={progress}
            update={updateMock}
          />
        </Step>
        <Step
          number={7}
          id="checkpoint"
          title="Check the connection."
          intro="Three short exercises: choose, sequence and match. Feedback is for learning, not official marks."
        >
          <div className="ma-checkpoint-progress">
            {answers}/{lesson.checkpoints.length} checkpoints attempted
          </div>
          {lesson.checkpoints.map((q) => (
            <CheckpointExercise
              key={q.id}
              checkpoint={q}
              saved={progress.checkpoints[lesson.slug]?.[q.id]}
              onSave={(result) =>
                updateMock((p) => ({
                  ...p,
                  checkpoints: {
                    ...p.checkpoints,
                    [lesson.slug]: {
                      ...p.checkpoints[lesson.slug],
                      [q.id]: result,
                    },
                  },
                }))
              }
            />
          ))}
        </Step>
        <Step
          number={8}
          id="full-answer"
          title="Full Descriptive Model Answer"
          intro="Read the connected response, then switch to the lecturer version to inspect how it works."
        >
          <FullAnswer lesson={lesson} />
        </Step>
        <section className="ma-completion">
          <div>
            <span className="ma-kicker">YOUR LEARNING RECORD</span>
            <h2>
              {done
                ? "A completed step in your journey."
                : "Ready to record this lesson?"}
            </h2>
            <p>
              {done
                ? "Revisit any explanation or exercise whenever you need it. Completion is not a claim of examination mastery."
                : `Save a writing attempt and check all three checkpoints, then mark the lesson complete. ${progress.writingAttempts.includes(lesson.slug) ? "Writing saved." : "Writing not saved yet."} ${answers}/3 checkpoints attempted.`}
            </p>
          </div>
          <button
            className={`button ${done ? "secondary" : "primary"}`}
            disabled={!ready || (!done && !eligible)}
            onClick={toggleComplete}
          >
            {done ? <Check size={16} /> : <Trophy size={16} />}{" "}
            {done ? "Mark as in progress" : "Mark lesson complete"}
          </button>
          {celebration && (
            <div className="ma-completion-reward" role="status">
              <Trophy size={19} /> Lesson complete. You’ve practised turning
              evidence into a reasoned answer.
            </div>
          )}
        </section>
        <div className="ma-lesson-pagination">
          {index > 0 ? (
            <Link href={lessonHref(exam.id, lessons[index - 1].slug)}>
              <ArrowLeft size={16} />
              <span>
                <small>PREVIOUS LESSON</small>
                {lessons[index - 1].title}
              </span>
            </Link>
          ) : (
            <Link href={`/mock-exams/${exam.id}`}>
              <ArrowLeft size={16} /> Learning plan
            </Link>
          )}
          {index < lessons.length - 1 ? (
            <Link href={lessonHref(exam.id, lessons[index + 1].slug)}>
              <span>
                <small>NEXT LESSON</small>
                {lessons[index + 1].title}
              </span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link href={`/mock-exams/${exam.id}`}>
              Review your learning plan <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
        <SourceNotice compact />
      </div>
    </main>
  );
}
