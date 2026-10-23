"use client";
import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  RotateCcw,
} from "lucide-react";
import type {
  Checkpoint,
  CheckpointAnswer,
  Lesson,
  MockProgress,
} from "@/lib/mock-exams/types";
import { evaluateCheckpoint } from "@/lib/mock-exams";
export function TheoryCards({ lesson }: { lesson: Lesson }) {
  const [index, setIndex] = useState(0),
    [flipped, setFlipped] = useState(false);
  const card = lesson.theory[index];
  const move = (n: number) => {
    setIndex((index + n + lesson.theory.length) % lesson.theory.length);
    setFlipped(false);
  };
  return (
    <div className="ma-flashcards">
      <div className="ma-flashcard-toolbar">
        <h3>Theory, in your own words.</h3>
        <span>
          {index + 1} / {lesson.theory.length}
        </span>
      </div>
      <button
        className={`ma-flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
        aria-label={
          flipped
            ? `Explanation: ${card.term}. ${card.simple} Vennlisk: ${card.application} Flip card.`
            : `Theory card: ${card.term}. Flip card.`
        }
      >
        <span className="ma-kicker">
          {flipped
            ? "EXPLANATION & VENNLISK APPLICATION"
            : "CAN YOU EXPLAIN THIS CONCEPT?"}
        </span>
        <strong>{card.term}</strong>
        {flipped ? (
          <>
            <p>{card.simple}</p>
            <p>
              <b>Vennlisk:</b> {card.application}
            </p>
          </>
        ) : (
          <p>Explain it simply, then connect it to the case.</p>
        )}
        <span>
          <RotateCcw size={13} /> Click or press Enter to flip
        </span>
      </button>
      <div className="ma-flashcard-nav">
        <button className="button secondary" onClick={() => move(-1)}>
          <ArrowLeft size={14} /> Previous card
        </button>
        <button className="button secondary" onClick={() => move(1)}>
          Next card <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
export function DecisionSimulator({ lesson }: { lesson: Lesson }) {
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <div className="ma-decision">
      <span className="ma-kicker">BUSINESS DECISION SIMULATOR</span>
      <h3>{lesson.decision.prompt}</h3>
      <div>
        {lesson.decision.options.map((o) => (
          <button
            key={o.id}
            className={choice === o.id ? "selected" : ""}
            aria-pressed={choice === o.id}
            onClick={() => setChoice(o.id)}
          >
            {o.title}
            <ArrowRight size={15} />
          </button>
        ))}
      </div>
      {choice && (
        <div className="ma-decision-feedback" role="status">
          <strong>Evaluate the choice, not just its label.</strong>
          {lesson.decision.options.map((o) => (
            <p key={o.id}>
              <b>{o.title}:</b> {o.explanation}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
export function WritingExercise({
  lesson,
  progress,
  update,
}: {
  lesson: Lesson;
  progress: MockProgress;
  update: (fn: (p: MockProgress) => MockProgress) => void;
}) {
  const [revealed, setRevealed] = useState(false),
    [notice, setNotice] = useState("");
  const draft = progress.drafts[lesson.slug] || "",
    checklist = progress.selfReview[lesson.slug] || [
      false,
      false,
      false,
      false,
    ];
  const save = () => {
    if (draft.trim().length < 40) {
      setNotice(
        "Write at least 40 characters so there is some reasoning to review. This is not an exam word-count rule.",
      );
      return;
    }
    update((p) => ({
      ...p,
      writingAttempts: [...new Set([...p.writingAttempts, lesson.slug])],
    }));
    setNotice(
      "Practice attempt saved. Review your reasoning below; no official mark is awarded.",
    );
  };
  return (
    <div className="ma-writing">
      <div className="ma-writing-issue">
        <span className="ma-kicker">ONE SMALL BUSINESS ISSUE</span>
        <h3>{lesson.writing.issue}</h3>
      </div>
      <label htmlFor={`writing-${lesson.slug}`}>
        Your examination paragraph
      </label>
      <textarea
        id={`writing-${lesson.slug}`}
        rows={7}
        maxLength={6000}
        value={draft}
        onChange={(e) => {
          const value = e.target.value;
          update((p) => ({
            ...p,
            drafts: { ...p.drafts, [lesson.slug]: value },
          }));
          setNotice("");
        }}
        placeholder="Start with a case fact. Explain its consequence. Weigh the uncertainty. Recommend an action…"
      />
      <div className="ma-writing-actions">
        <small>
          {draft.length}/6,000 characters · Draft saved in this browser
        </small>
        <button className="button primary" onClick={save}>
          <Check size={15} />
          {progress.writingAttempts.includes(lesson.slug)
            ? "Save updated attempt"
            : "Save practice attempt"}
        </button>
      </div>
      {notice && (
        <p role="status" className="ma-writing-notice">
          {notice}
        </p>
      )}
      <button
        className="ma-reveal-answer"
        aria-expanded={revealed}
        onClick={() => setRevealed(!revealed)}
      >
        {revealed ? "Hide Suggested Answer" : "Reveal Suggested Answer"}{" "}
        <ArrowDown size={15} />
      </button>
      {revealed && (
        <div className="ma-suggested">
          <span className="ma-kicker">ONE POSSIBLE ORIGINAL RESPONSE</span>
          <p>{lesson.writing.suggested}</p>
          <small>
            Your phrasing can differ. Look for applied reasoning and a justified
            recommendation.
          </small>
        </div>
      )}
      <fieldset className="ma-self-review">
        <legend>Guided self-review</legend>
        {[
          "Did I use a Vennlisk fact and identify its source correctly?",
          "Did I explain the business consequence?",
          "Did I demonstrate balanced judgement?",
          "Did I recommend a relevant action?",
        ].map((label, i) => (
          <label key={label}>
            <input
              type="checkbox"
              checked={!!checklist[i]}
              onChange={(e) => {
                const checked = e.target.checked;
                update((p) => {
                  const next = [
                    ...(p.selfReview[lesson.slug] || [
                      false,
                      false,
                      false,
                      false,
                    ]),
                  ];
                  next[i] = checked;
                  return {
                    ...p,
                    selfReview: { ...p.selfReview, [lesson.slug]: next },
                  };
                });
              }}
            />
            {label}
          </label>
        ))}
      </fieldset>
    </div>
  );
}
export function CheckpointExercise({
  checkpoint: q,
  saved,
  onSave,
}: {
  checkpoint: Checkpoint;
  saved?: CheckpointAnswer;
  onSave: (answer: CheckpointAnswer) => void;
}) {
  const initialOrder =
    q.type === "sequence"
      ? q.items
          .map((i) => i.id)
          .filter((_, i) => i % 2 === 1)
          .reverse()
          .concat(q.items.map((i) => i.id).filter((_, i) => i % 2 === 0))
      : [];
  const [choice, setChoice] = useState(
      typeof saved?.answer === "string" ? saved.answer : "",
    ),
    [order, setOrder] = useState<string[]>(
      Array.isArray(saved?.answer) ? saved.answer : initialOrder,
    ),
    [pairs, setPairs] = useState<Record<string, string>>(
      saved?.answer &&
        typeof saved.answer === "object" &&
        !Array.isArray(saved.answer)
        ? saved.answer
        : {},
    ),
    [submitted, setSubmitted] = useState(!!saved),
    [correct, setCorrect] = useState(saved?.correct || false);
  useEffect(() => {
    if (!saved) return;
    if (typeof saved.answer === "string") setChoice(saved.answer);
    else if (Array.isArray(saved.answer)) setOrder(saved.answer);
    else setPairs(saved.answer);
    setSubmitted(true);
    setCorrect(saved.correct);
  }, [saved]);
  const submit = () => {
    const answer =
      q.type === "choice" ? choice : q.type === "sequence" ? order : pairs;
    const result = evaluateCheckpoint(q, answer);
    setCorrect(result);
    setSubmitted(true);
    onSave({ answer, correct: result });
  };
  const move = (i: number, d: number) => {
    setSubmitted(false);
    setOrder((p) => {
      const next = [...p];
      [next[i], next[i + d]] = [next[i + d], next[i]];
      return next;
    });
  };
  const enabled =
    q.type === "choice"
      ? !!choice
      : q.type === "match"
        ? q.pairs.every((p) => !!pairs[p.id])
        : true;
  return (
    <article className="ma-checkpoint">
      <div className="ma-checkpoint-type">
        {q.type === "choice"
          ? "MULTIPLE CHOICE"
          : q.type === "sequence"
            ? "BUILD THE ARGUMENT"
            : "FACT → IMPLICATION"}
      </div>
      <h3>{q.prompt}</h3>
      {q.type === "choice" && (
        <fieldset className="ma-choice">
          <legend className="sr-only">{q.prompt}</legend>
          {q.options.map((o) => (
            <label key={o.id} className={choice === o.id ? "selected" : ""}>
              <input
                type="radio"
                name={`checkpoint-${q.id}`}
                value={o.id}
                checked={choice === o.id}
                onChange={() => {
                  setChoice(o.id);
                  setSubmitted(false);
                }}
              />
              {o.text}
            </label>
          ))}
        </fieldset>
      )}
      {q.type === "sequence" && (
        <ol className="ma-sequence">
          {order.map((id, i) => (
            <li key={id}>
              <span className="ma-order-number">{i + 1}</span>
              <p>{q.items.find((t) => t.id === id)?.text}</p>
              <div>
                <button
                  disabled={i === 0}
                  aria-label={`Move step ${i + 1} up`}
                  onClick={() => move(i, -1)}
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  disabled={i === order.length - 1}
                  aria-label={`Move step ${i + 1} down`}
                  onClick={() => move(i, 1)}
                >
                  <ArrowDown size={16} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
      {q.type === "match" && (
        <div className="ma-match">
          {q.pairs.map((p) => (
            <label key={p.id}>
              <span>{p.fact}</span>
              <select
                value={pairs[p.id] || ""}
                onChange={(e) => {
                  setPairs({ ...pairs, [p.id]: e.target.value });
                  setSubmitted(false);
                }}
              >
                <option value="">Choose the connection…</option>
                {[...q.pairs].reverse().map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.match}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}
      <button
        className="button secondary ma-check-answer"
        onClick={submit}
        disabled={!enabled}
      >
        Check{" "}
        {q.type === "sequence"
          ? "sequence"
          : q.type === "match"
            ? "connections"
            : "answer"}{" "}
        <Check size={14} />
      </button>
      {submitted && (
        <div
          className={`ma-feedback ${correct ? "correct" : "review"}`}
          role="status"
        >
          <strong>
            {correct ? "That connection works." : "A useful point to revisit."}
          </strong>
          <p>{q.explanation}</p>
          {!correct && q.type === "choice" && (
            <p>
              <b>Suggested choice:</b>{" "}
              {q.options.find((o) => o.id === q.correct)?.text}
            </p>
          )}
          {!correct && q.type === "sequence" && (
            <ol>
              {q.items.map((i) => (
                <li key={i.id}>{i.text}</li>
              ))}
            </ol>
          )}
          {!correct && q.type === "match" && (
            <ul>
              {q.pairs.map((p) => (
                <li key={p.id}>
                  {p.fact} → {p.match}
                </li>
              ))}
            </ul>
          )}
          <button className="text-link" onClick={() => setSubmitted(false)}>
            Try the reasoning again <RotateCcw size={13} />
          </button>
        </div>
      )}
    </article>
  );
}
