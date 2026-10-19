"use client";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  FileText,
  Globe2,
  GraduationCap,
  Quote,
  Sparkles,
} from "lucide-react";
import { modules } from "@/lib/content";
import { useProgress } from "./progress";
import { Count, NetworkArt, Reveal } from "./visuals";
import ModuleCard from "./module-card";
export default function Home() {
  const { progress } = useProgress();
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <Reveal>
            <div className="exam-label">
              <span className="live-dot" /> YOUR NEXT CHAPTER STARTS HERE{" "}
              <span className="label-divider" /> CIMA SCS
            </div>
            <h1>
              Master the
              <br />
              <span>Vennlisk</span>
              <br />
              Case Study<span className="headline-dot">.</span>
            </h1>
            <p className="hero-copy">
              Understand the business. Think strategically.
              <br className="desktop-break" /> Walk into your CIMA SCS exam
              prepared.
            </p>
            <div className="hero-buttons">
              <Link className="button primary" href={`/learn/${progress.last}`}>
                {progress.visited.length
                  ? "Continue learning"
                  : "Start learning"}
                <ArrowUpRight size={18} />
              </Link>
              <Link className="button secondary" href="/tutor">
                <Sparkles size={17} />
                Ask your AI tutor
              </Link>
            </div>
            <Link className="hero-financial-link" href="/financials">
              Explore the financials <ArrowRight size={14} />
            </Link>
            <div className="hero-footnote">
              <span className="check-circle">
                <Check size={11} />
              </span>{" "}
              Grounded in the official pre-seen <span>·</span> Built for
              understanding
            </div>
          </Reveal>
        </div>
        <div className="hero-visual">
          <NetworkArt />
          <div className="floating-note">
            <span className="note-icon">
              <BookOpen size={17} />
            </span>
            <div>
              <strong>
                A complex case.
                <br />A clearer perspective.
              </strong>
              <small>12 connected learning modules</small>
            </div>
            <ArrowUpRight size={17} />
          </div>
        </div>
        <div className="hero-index">
          01 — THE BIG PICTURE<span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>
      <section className="facts-strip" aria-label="Case at a glance">
        <div>
          <span className="stat-icon">
            <FileText size={20} />
          </span>
          <div>
            <strong>
              <Count value={28} />
              <small> pages</small>
            </strong>
            <p>One case. Every detail covered.</p>
          </div>
        </div>
        <div>
          <span className="stat-icon">
            <GraduationCap size={21} />
          </span>
          <div>
            <strong>
              <Count value={5000} />
              <small> agents</small>
            </strong>
            <p>People at the heart of the business.</p>
          </div>
        </div>
        <div>
          <span className="stat-icon">
            <Globe2 size={20} />
          </span>
          <div>
            <strong>
              5<small> call centres</small>
            </strong>
            <p>Vennlisk, Westland · Source p. 11</p>
          </div>
        </div>
        <div className="exam-date">
          <span className="tiny-eyebrow">YOUR EXAM WINDOW</span>
          <strong>Nov 2026 — Feb 2027</strong>
          <p>Strategic level. A new perspective.</p>
        </div>
      </section>
      <section className="section journey-section" id="journey">
        <Reveal className="section-heading">
          <div>
            <div className="eyebrow">
              <span /> A CLEAR PATH FORWARD
            </div>
            <h2>
              Your learning journey<span>.</span>
            </h2>
            <p>
              From your first look to your final revision. Build confidence, one
              chapter at a time.
            </p>
          </div>
          <Link className="text-link" href="/learn">
            Explore all 12 modules <ArrowUpRight size={16} />
          </Link>
        </Reveal>
        <div className="module-grid">
          {modules.slice(0, 6).map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 0.06}>
              <ModuleCard module={m} index={i} />
            </Reveal>
          ))}
        </div>
        <Link className="view-all" href="/learn">
          There’s more to the story. Explore all 12 modules{" "}
          <ArrowRight size={16} />
        </Link>
      </section>
      <section
        className="leadership-feature section"
        aria-labelledby="leadership-feature-heading"
      >
        <Reveal>
          <span className="eyebrow">
            MEET THE BOARD. THINK LIKE AN ADVISER.
          </span>
          <h2 id="leadership-feature-heading">
            Who leads?
            <br />
            <span>Who asks the difficult questions?</span>
          </h2>
          <p>
            Explore Vennlisk’s directors, separate management from oversight,
            and turn apparent discrepancies into balanced exam analysis.
          </p>
          <Link className="button ink" href="/leadership">
            Explore leadership & exam triggers <ArrowUpRight size={17} />
          </Link>
        </Reveal>
        <Reveal className="leadership-feature-numbers">
          <div>
            <strong>5</strong>
            <span>Executive directors</span>
            <p>Delivery, decisions and day-to-day leadership.</p>
          </div>
          <div>
            <strong>4</strong>
            <span>Non-executive directors</span>
            <p>Challenge, oversight and independent judgement.</p>
          </div>
          <Link className="text-link" href="/leadership#exam-triggers">
            9 source-linked exam-practice triggers <ArrowRight size={15} />
          </Link>
        </Reveal>
      </section>
      <section className="financial-feature section">
        <Reveal className="financial-feature-copy">
          <span className="eyebrow">BEYOND THE NUMBERS</span>
          <h2>
            Don’t just learn the figures.
            <br />
            <span>Find the story.</span>
          </h2>
          <p>
            Two companies. Two years. See what the financials reveal about
            performance, risk and strategic choices.
          </p>
          <Link className="button ink" href="/financials">
            Open the financial explorer <ArrowUpRight size={17} />
          </Link>
          <small>Actual pre-seen figures · W$ million · pp. 18–21</small>
        </Reveal>
        <Reveal className="mini-financial">
          <div className="mini-chart-head">
            <span>
              <ChartNoAxesCombined size={17} /> Vennlisk revenue
            </span>
            <span className="growth">↗ 6.38%</span>
          </div>
          <strong>
            W$
            <Count value={12370} />
            <small>m</small>
          </strong>
          <div className="mini-bars">
            <div>
              <i style={{ height: "84%" }} />
              <span>2025</span>
              <small>11,627.8</small>
            </div>
            <div>
              <i style={{ height: "94%" }} />
              <span>2026</span>
              <small>12,370.0</small>
            </div>
          </div>
          <div className="mini-chart-foot">
            <span>Growth is only the beginning.</span>
            <ArrowUpRight size={17} />
          </div>
        </Reveal>
      </section>
      <section className="tutor-banner section">
        <Reveal>
          <span className="ai-badge">
            <Sparkles size={15} /> YOUR STUDY PARTNER
          </span>
          <h2>
            A little stuck?
            <br />
            Let’s think it through.
          </h2>
          <p>
            Ask a question. Unpack a concept. Practise your reasoning.
            <br />A source-grounded tutor, at your pace.
          </p>
          <Link className="button primary" href="/tutor">
            Meet your AI tutor <Sparkles size={17} />
          </Link>
          <small>
            AI requires server configuration. Clear citations. No invented case
            facts.
          </small>
        </Reveal>
        <div className="tutor-preview">
          <span className="preview-question">
            Why does Vennlisk focus on quality?
          </span>
          <div className="preview-answer">
            <span className="preview-spark">
              <Sparkles size={19} />
            </span>
            <div>
              <span className="tiny-eyebrow">A QUESTION WORTH EXPLORING</span>
              <p>
                When overseas competitors can charge less, what makes a client
                stay?
              </p>
              <div className="source-chips">
                <span>Quality differentiation</span>
                <span>Pre-seen p. 27</span>
              </div>
            </div>
          </div>
          <span className="preview-caption">
            Explore the evidence. Build your own judgement.
          </span>
        </div>
      </section>
      <section className="closing section">
        <Quote size={29} />
        <h2>
          Understand the case.
          <br />
          Own the conversation.
        </h2>
        <p>
          Your preparation starts with curiosity. Your confidence grows with
          practice.
        </p>
        <Link className="text-link" href="/exam">
          Put your knowledge into practice <ChevronRight size={17} />
        </Link>
      </section>
    </main>
  );
}
