"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Command,
  FileText,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { modules, glossary } from "@/lib/content";
import { examTriggers } from "@/lib/leadership";
import { ProgressProvider, useProgress } from "./progress";
const nav = [
  ["Overview", "/"],
  ["Learn", "/learn"],
  ["Leadership", "/leadership"],
  ["Financials", "/financials"],
  ["Risks", "/risks"],
  ["AI Tutor", "/tutor"],
  ["Exam Prep", "/exam"],
  ["Mock Exam Academy", "/mock-exams"],
];
function Frame({ children }: { children: React.ReactNode }) {
  const path = usePathname(),
    { progress, storageError } = useProgress();
  const [menu, setMenu] = useState(false),
    [search, setSearch] = useState(false),
    [q, setQ] = useState(""),
    [scroll, setScroll] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [path]);
  useEffect(() => {
    if (search) dialog.current?.showModal();
    else dialog.current?.close();
  }, [search]);
  const results = modules.filter((m) =>
    `${m.title} ${m.description} ${m.lessons.map((l) => l.title + " " + l.body).join(" ")}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  return (
    <>
      <div
        className="reading-line"
        style={{ transform: `scaleX(${scroll})` }}
      />
      <header className="header">
        <div className="nav-wrap">
          <Link href="/" className="logo" aria-label="Vennlisk Academy home">
            <span className="logo-symbol">
              v<span />
            </span>
            <span>
              vennlisk<span className="logo-sub">ACADEMY</span>
            </span>
          </Link>
          <nav
            className={menu ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            {nav.map(([label, href]) => (
              <Link
                key={href}
                className={
                  (href === "/" ? path === "/" : path.startsWith(href))
                    ? "active"
                    : ""
                }
                href={href}
              >
                {label}
                {label === "AI Tutor" && <Sparkles size={13} />}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <a
              className="preseen-link icon-button"
              href="/documents/vennlisk-preseen.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open pre-seen PDF (opens in a new tab)"
              title="Open pre-seen PDF in a new tab"
            >
              <FileText size={19} aria-hidden="true" />
            </a>
            <button
              className="search-trigger"
              onClick={() => setSearch(true)}
              aria-label="Search topics"
            >
              <Search size={17} />
              <kbd>⌘ K</kbd>
            </button>
            <Link href="/learn" className="progress-pill">
              <span className="progress-dot">
                <Check size={11} />
              </span>
              {Math.round((progress.completed.length / 12) * 100)}%{" "}
              <span className="hide-small">complete</span>
            </Link>
            <button
              className="mobile-toggle icon-button"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {storageError && (
        <div className="storage-warning" role="status">
          Browser storage is unavailable. Progress will last for this session
          only.
        </div>
      )}
      {children}
      <footer>
        <Link href="/" className="footer-brand">
          vennlisk academy<span>Think clearly. Answer confidently.</span>
        </Link>
        <p>
          Independent study companion · Not affiliated with or endorsed by CIMA.
          <br />
          Case facts reference the official Nov 2026–Feb 2027 pre-seen. © CIMA
          2026.
        </p>
        <Link href="/learn#glossary">
          Study glossary <ArrowUpRight size={14} />
        </Link>
      </footer>
      {scroll > 0.08 && (
        <button
          className="back-top icon-button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            })
          }
          aria-label="Back to top"
        >
          <ArrowUp size={19} />
        </button>
      )}
      <dialog
        ref={dialog}
        className="search-dialog"
        onCancel={() => setSearch(false)}
        onClick={(e) => {
          if (e.target === dialog.current) setSearch(false);
        }}
      >
        <div className="search-bar">
          <Search />
          <input
            autoFocus
            placeholder="Search the Vennlisk case…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search the case study"
          />
          <button onClick={() => setSearch(false)} aria-label="Close search">
            <X />
          </button>
        </div>
        <div className="search-results">
          <div className="eyebrow">
            {q ? "MATCHING TOPICS" : "JUMP INTO A CHAPTER"}
          </div>
          {(!q ||
            `leadership directors executive non-executive governance discrepancies ${examTriggers.map((t) => t.title + " " + t.evidence).join(" ")}`
              .toLowerCase()
              .includes(q.toLowerCase())) && (
            <Link href="/leadership" onClick={() => setSearch(false)}>
              <div>
                <strong>Leadership & exam triggers</strong>
                <span>
                  Executive roles, non-executive challenge and case
                  discrepancies.
                </span>
              </div>
              <ArrowUpRight size={17} />
            </Link>
          )}
          {(!q ||
            "mock exam academy competitor analysis non-financial capitals vision mission debt financing internal controls audit committee".includes(
              q.toLowerCase(),
            )) && (
            <Link href="/mock-exams" onClick={() => setSearch(false)}>
              <div>
                <strong>Mock Exam Academy</strong>
                <span>
                  Six guided lessons: understand, analyse, write and review Mock
                  Exam 1.
                </span>
              </div>
              <ArrowUpRight size={17} />
            </Link>
          )}
          {results.map((m) => (
            <Link
              key={m.slug}
              href={`/learn/${m.slug}`}
              onClick={() => setSearch(false)}
            >
              <div>
                <strong>{m.title}</strong>
                <span>{m.description}</span>
              </div>
              <ArrowUpRight size={17} />
            </Link>
          ))}
          {!results.length && (
            <p>No topics found. Try “AI”, “training” or “gearing”.</p>
          )}
          {q &&
            glossary
              .filter(([a, b]) =>
                (a + b).toLowerCase().includes(q.toLowerCase()),
              )
              .map(([a, b]) => (
                <p key={a}>
                  <strong>{a}</strong> — {b}
                </p>
              ))}
        </div>
        <div className="search-foot">
          <Command size={13} /> Navigate your learning · ESC to close
        </div>
      </dialog>
    </>
  );
}
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <Frame>{children}</Frame>
    </ProgressProvider>
  );
}
