"use client";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  GraduationCap,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import {
  mockExams,
  completion,
  continueLesson,
  lessonHref,
} from "@/lib/mock-exams";
import type { MockExam } from "@/lib/mock-exams/types";
import { useMockProgress } from "./use-mock-progress";
import { ExamMeta, ProgressRing, SourceNotice } from "./shared";
import { Reveal } from "@/components/visuals";
function ExamCard({
  exam,
  expanded = false,
}: {
  exam: MockExam;
  expanded?: boolean;
}) {
  const { progress, ready } = useMockProgress(exam.id);
  const { count, total, percent } = completion(exam, progress),
    next = continueLesson(exam, progress);
  return (
    <div className="ma-exam-card">
      <div className="ma-exam-card-top">
        <span className="ma-kicker">
          <BookOpen size={14} /> THE GUIDED LEARNING JOURNEY
        </span>
        <span className="ma-independent">Independent practice</span>
      </div>
      <div className="ma-exam-card-main">
        <div>
          <h2>{exam.title}</h2>
          <p>{exam.description}</p>
          <ExamMeta exam={exam} />
        </div>
        <ProgressRing count={count} total={total} percent={percent} />
      </div>
      <div className="ma-exam-card-footer">
        <div>
          <strong>
            {count} of {total} lessons completed
          </strong>
          <span>
            {!ready
              ? "Loading your study record…"
              : count === total
                ? "Your journey is complete. Revisit any lesson to keep practising."
                : progress.opened.length
                  ? `Next: ${next.number} ${next.title}`
                  : "Begin with the question. Build towards a reasoned answer."}
          </span>
        </div>
        <div className="ma-card-buttons">
          {!expanded && (
            <Link className="button secondary" href={`/mock-exams/${exam.id}`}>
              View learning plan <ArrowUpRight size={16} />
            </Link>
          )}
          <Link
            className="button primary"
            href={lessonHref(exam.id, next.slug)}
          >
            {count === total
              ? "Review lessons"
              : progress.opened.length
                ? "Continue Learning"
                : "Start Learning"}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
function ExamPlan({ exam }: { exam: MockExam }) {
  const { progress } = useMockProgress(exam.id);
  return (
    <section className="ma-plan" aria-labelledby="ma-plan-heading">
      <div className="ma-section-heading">
        <span className="ma-kicker">
          THREE SECTIONS. SIX WAYS TO THINK BETTER.
        </span>
        <h2 id="ma-plan-heading">Your learning plan.</h2>
        <p>
          Open a section, choose a lesson and work through it at your own pace.
          Full descriptive answers are always available.
        </p>
      </div>
      {exam.sections.map((s, i) => {
        const completed = s.lessons.filter((l) =>
          progress.completed.includes(l.slug),
        ).length;
        return (
          <details
            className="ma-section"
            key={s.id}
            open={
              i === 0 || s.lessons.some((l) => l.slug === progress.lastLesson)
            }
          >
            <summary>
              <span className="ma-section-number">{s.number}</span>
              <div>
                <span className="ma-kicker">EXAMINATION SECTION {i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
              <span className="ma-section-count">
                {completed}/{s.lessons.length} complete
              </span>
              <ChevronDown size={20} />
            </summary>
            <div className="ma-lesson-cards">
              {s.lessons.map((l) => {
                const done = progress.completed.includes(l.slug),
                  answers = Object.keys(
                    progress.checkpoints[l.slug] || {},
                  ).length,
                  attempted = progress.writingAttempts.includes(l.slug);
                return (
                  <Link
                    className="ma-lesson-card"
                    key={l.slug}
                    href={lessonHref(exam.id, l.slug)}
                  >
                    <div>
                      <span className="ma-lesson-id">LESSON {l.number}</span>
                      <span className={`ma-status ${done ? "complete" : ""}`}>
                        {done ? (
                          <>
                            <Check size={12} /> Completed
                          </>
                        ) : progress.opened.includes(l.slug) ? (
                          "Opened · in progress"
                        ) : (
                          "Not started"
                        )}
                      </span>
                    </div>
                    <h4>{l.title}</h4>
                    <p>{l.summary}</p>
                    <div className="ma-lesson-card-meta">
                      <span>
                        <Clock3 size={13} /> {l.minutes} min
                      </span>
                      <ArrowUpRight size={18} />
                    </div>
                    <div className="ma-mini-progress">
                      <i
                        style={{
                          width: `${done ? 100 : ((answers + (attempted ? 1 : 0)) / (l.checkpoints.length + 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <small>
                      {answers}/{l.checkpoints.length} checkpoints attempted ·
                      Writing {attempted ? "saved" : "not yet saved"}
                    </small>
                  </Link>
                );
              })}
            </div>
          </details>
        );
      })}
    </section>
  );
}
export default function AcademyDashboard({ examId }: { examId?: string }) {
  const selected = mockExams.find((e) => e.id === examId);
  return (
    <main className="academy ma-dashboard">
      <div className="ma-hero">
        <div className="ma-hero-copy">
          {selected ? (
            <Link className="ma-back" href="/mock-exams">
              ← Mock Exam Academy
            </Link>
          ) : (
            <span className="ma-kicker">
              <GraduationCap size={16} /> THINK. APPLY. WRITE.
            </span>
          )}
          <h1>
            {selected ? (
              selected.title
            ) : (
              <>
                Mock Exam
                <br />
                <span>Academy.</span>
              </>
            )}
          </h1>
          <p>
            {selected
              ? "Six guided lessons. One connected approach to strategic case-study answers."
              : "Don’t just memorise answers. Learn how to think, analyse, and write like a CIMA Strategic Case Study professional."}
          </p>
          <div className="ma-hero-points">
            <span>
              <Compass size={15} /> Decode the question
            </span>
            <span>
              <PenLine size={15} /> Build the argument
            </span>
            <span>
              <ShieldCheck size={15} /> Check your reasoning
            </span>
          </div>
        </div>
        <div className="ma-hero-art" aria-hidden="true">
          <span className="ma-art-orbit" />
          <div className="ma-art-sheet">
            <span>CASE EVIDENCE</span>
            <i />
            <i />
            <strong>
              What does this
              <br />
              mean for Vennlisk?
            </strong>
            <span className="ma-art-teal">Evidence → judgement → action</span>
          </div>
          <span className="ma-art-seal">
            <GraduationCap size={28} />
          </span>
        </div>
      </div>
      <div className="ma-content">
        {(selected ? [selected] : mockExams).map((e) => (
          <Reveal key={e.id}>
            <ExamCard exam={e} expanded={!!selected} />
          </Reveal>
        ))}
        {selected ? (
          <ExamPlan exam={selected} />
        ) : (
          <section className="ma-method">
            <div className="ma-section-heading">
              <span className="ma-kicker">MORE THAN A MODEL ANSWER</span>
              <h2>
                A lecturer’s guidance.
                <br />
                Your own understanding.
              </h2>
            </div>
            <div>
              {[
                [
                  "01",
                  "Understand",
                  "Translate the question and learn the theory with simple examples.",
                ],
                [
                  "02",
                  "Analyse",
                  "Connect evidence to business consequences and balanced recommendations.",
                ],
                [
                  "03",
                  "Practise",
                  "Write, check your reasoning, compare answers and track meaningful progress.",
                ],
              ].map(([n, t, p]) => (
                <article key={n}>
                  <span>{n}</span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </article>
              ))}
            </div>
            <Link className="text-link" href="/mock-exams/mock-1">
              Explore all six lessons <ArrowRight size={16} />
            </Link>
          </section>
        )}
        <SourceNotice />
      </div>
    </main>
  );
}
