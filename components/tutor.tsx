"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowRight,
  Check,
  Copy,
  LoaderCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: { page: number; href: string }[];
};
const modes = [
  "Explain Simply",
  "Deep Dive",
  "Exam Answer",
  "Quiz Me",
  "Compare",
];
export default function Tutor() {
  const params = useSearchParams(),
    [mode, setMode] = useState("Explain Simply"),
    [level, setLevel] = useState("Beginner"),
    [question, setQuestion] = useState(""),
    [messages, setMessages] = useState<Message[]>([]),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(""),
    [status, setStatus] = useState<{
      ready: boolean;
      keyConfigured: boolean;
      semanticReady: boolean;
      sourceIndexed: boolean;
    } | null>(null),
    [copied, setCopied] = useState<number | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() =>
        setError("Could not check tutor configuration. Refresh to try again."),
      );
    const topic = params.get("topic");
    if (topic) setQuestion(`Explain ${topic} using the Vennlisk case.`);
  }, [params]);
  useEffect(() => {
    if (messages.length)
      bottom.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "nearest",
      });
  }, [messages, loading]);
  async function send(text = question) {
    if (!text.trim() || loading) return;
    setError("");
    const user: Message = { role: "user", content: text.trim() };
    const history = messages.slice(-6);
    setMessages((p) => [...p, user]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: user.content, mode, level, history }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "The tutor could not respond.");
      setMessages((p) => [
        ...p,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Connection failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }
  const suggestions = [
    "Explain Vennlisk’s business model like I’m a beginner.",
    "Compare Vennlisk and Ringcoll financially.",
    "How could AI affect Vennlisk?",
    "Quiz me on the pre-seen.",
  ];
  return (
    <main className="tutor-page page">
      <div className="tutor-heading">
        <span className="ai-badge">
          <Sparkles size={15} /> ASK VENNlISK AI
        </span>
        <h1>
          A clearer answer starts
          <br />
          with a better question<span>.</span>
        </h1>
        <p className="lede">
          Your patient study partner. Grounded in the case. Guided by curiosity.
        </p>
      </div>
      <div className="tutor-layout">
        <aside className="tutor-settings panel">
          <span className="eyebrow">HOW DO YOU WANT TO LEARN?</span>
          <div className="mode-list">
            {modes.map((m) => (
              <button
                key={m}
                className={mode === m ? "selected" : ""}
                onClick={() => setMode(m)}
              >
                <Sparkles size={15} />
                {m}
                {mode === m && <Check size={15} />}
              </button>
            ))}
          </div>
          <label>
            Explanation level
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              {["Beginner", "Intermediate", "Advanced"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <div className="tutor-trust">
            <ShieldCheck size={22} />
            <strong>Evidence before confidence.</strong>
            <p>
              Source references connect answers to the official pre-seen.
              Analysis and examples are labelled separately.
            </p>
            <small>
              AI can make mistakes. Verify important figures against your
              authorised PDF.
            </small>
          </div>
        </aside>
        <section className="chat-panel">
          <div className="chat-header">
            <span>
              <i className={status?.ready ? "live-dot" : "status-dot"} />
              {status === null
                ? "Checking configuration…"
                : status.ready
                  ? "Tutor configured · semantic retrieval"
                  : "AI setup required"}
            </span>
            <button
              className="icon-button"
              onClick={() => {
                setMessages([]);
                setError("");
              }}
              disabled={loading}
              aria-label="Clear conversation"
            >
              <Trash2 size={16} />
            </button>
          </div>
          {status && !status.ready && (
            <div className="setup-notice">
              <Sparkles size={20} />
              <div>
                <strong>Your tutor is waiting for its connection.</strong>
                <p>
                  The site owner needs to set <code>OPENAI_API_KEY</code> on the
                  server and run <code>npm run ingest</code> to build semantic
                  embeddings. No AI answers are generated until both are ready.
                </p>
                <span>
                  Source extraction:{" "}
                  {status.sourceIndexed ? "complete" : "missing"} · API key:{" "}
                  {status.keyConfigured ? "configured" : "missing"} ·
                  Embeddings: {status.semanticReady ? "ready" : "missing"}
                </span>
              </div>
            </div>
          )}
          <div className="chat-messages" aria-live="polite">
            {!messages.length ? (
              <div className="chat-empty">
                <span className="large-spark">
                  <Sparkles size={31} />
                </span>
                <h2>Let’s make it make sense.</h2>
                <p>Start with what you’re curious about.</p>
                <div className="question-grid">
                  {suggestions.map((q) => (
                    <button key={q} onClick={() => setQuestion(q)}>
                      {q}
                      <ArrowRight size={16} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`message ${m.role}`}>
                  <span className="message-role">
                    {m.role === "user"
                      ? "YOU"
                      : `VENNLISK AI · ${mode.toUpperCase()}`}
                  </span>
                  <div className="markdown">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      urlTransform={(url) => (url.startsWith("/") ? url : "")}
                    >
                      {m.content.replace(
                        /\[p\.\s*(\d+)\]/g,
                        (_s, n) => `[p. ${n}](/sources/${n})`,
                      )}
                    </ReactMarkdown>
                  </div>
                  {m.sources && (
                    <div className="message-sources">
                      {m.sources.length > 0 && (
                        <>
                          <span>REFERENCED PAGES</span>
                          {m.sources.map((s) => (
                            <Link key={s.page} href={s.href}>
                              Pre-seen p. {s.page} ↗
                            </Link>
                          ))}
                        </>
                      )}
                      <button
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(m.content);
                            setCopied(i);
                          } catch {
                            setError(
                              "Copy is unavailable in this browser. Select the answer text to copy it.",
                            );
                          }
                        }}
                      >
                        {copied === i ? (
                          <Check size={13} />
                        ) : (
                          <Copy size={13} />
                        )}{" "}
                        {copied === i ? "Copied" : "Copy answer"}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="thinking">
                <LoaderCircle className="spin" size={18} /> Finding the relevant
                evidence…
              </div>
            )}
            <div ref={bottom} />
          </div>
          {error && (
            <div className="chat-error" role="alert">
              {error}
            </div>
          )}
          {messages.some((m) => m.role === "assistant") && !loading && (
            <div className="followups">
              {[
                "Explain the strategic implications.",
                "Give me a related practice question.",
              ].map((q) => (
                <button key={q} onClick={() => setQuestion(q)}>
                  {q} ↗
                </button>
              ))}
            </div>
          )}
          <form
            className="chat-compose"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <label className="sr-only" htmlFor="question">
              Ask about the Vennlisk case
            </label>
            <textarea
              id="question"
              value={question}
              maxLength={6000}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to understand?"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (status?.ready) send();
                }
              }}
            />
            <div>
              <span>
                {mode} · {level}
              </span>
              <button
                className="send-button"
                disabled={loading || !question.trim() || !status?.ready}
                aria-label="Send question"
              >
                {loading ? (
                  <LoaderCircle className="spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </form>
          <p className="chat-footnote">
            Private source · No official CIMA marks · Conversation kept for this
            page session
          </p>
        </section>
      </div>
    </main>
  );
}
