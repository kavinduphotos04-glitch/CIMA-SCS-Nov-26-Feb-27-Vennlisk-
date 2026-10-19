"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";
import {
  ArrowDownRight,
  Check,
  Headphones,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  Waypoints,
} from "lucide-react";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}
export function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null),
    visible = useInView(ref, { once: true }),
    reduced = useReducedMotion();
  const [n, setN] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    const start = performance.now();
    let frame = 0;
    const tick = (t: number) => {
      const x = Math.min(1, (t - start) / 1100);
      setN(Math.round(value * (1 - Math.pow(1 - x, 3))));
      if (x < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, reduced, value]);
  return <span ref={ref}>{n.toLocaleString("en-US")}</span>;
}
export function NetworkArt() {
  return (
    <div
      className="network-art"
      aria-label="Illustration of callers, agents and technology connected through Vennlisk"
      role="img"
    >
      <div className="orb-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <svg className="network-lines" viewBox="0 0 560 480" aria-hidden="true">
        <path d="M110 125 Q280 60 330 205 T470 350 M80 340 Q210 400 280 240 T465 110 M100 130 L280 240 L465 110 M80 340 L280 240 L470 350" />
        <circle r="4" fill="#8656ef">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M110 125 Q280 60 330 205 T470 350"
          />
        </circle>
      </svg>
      <div className="art-node node-call">
        <Phone size={25} />
        <span>
          Every call.<small>A human connection.</small>
        </span>
        <i className="live-dot" />
      </div>
      <div className="art-node node-ai">
        <Sparkles size={24} />
        <span>
          Technology<small>New possibilities</small>
        </span>
      </div>
      <div className="art-node node-trust">
        <ShieldCheck size={24} />
        <span>
          Built on trust<small>Quality at the core</small>
        </span>
      </div>
      <div className="art-node node-people">
        <div className="tiny-avatars">
          <UserRound />
          <UserRound />
          <UserRound />
        </div>
        <span>
          5,000 agents<small>One shared ambition</small>
        </span>
      </div>
      <div className="central-platform">
        <div className="platform-shadow" />
        <div className="platform-base" />
        <div className="platform-mid" />
        <div className="platform-top">
          <Headphones strokeWidth={1.3} />
          <div className="soundwave">
            {[18, 28, 39, 25, 16, 34, 45, 26, 18].map((n, i) => (
              <i
                key={i}
                style={{ height: n, animationDelay: `${i * 0.12}s` }}
              />
            ))}
          </div>
        </div>
        <span className="platform-badge">
          <Check size={13} /> CONNECTED
        </span>
      </div>
      <span className="art-caption">PEOPLE × TECHNOLOGY × STRATEGY</span>
    </div>
  );
}
export function CallJourney() {
  const [step, setStep] = useState(0);
  const steps = [
    [
      "The caller",
      "A customer needs support with a policy, purchase or problem.",
    ],
    [
      "Identify & route",
      "The system identifies the caller and directs the request to the right queue.",
    ],
    [
      "Connect & resolve",
      "An available trained agent uses client records to help.",
    ],
    [
      "Record & learn",
      "After-call work updates the file; balanced metrics inform coaching.",
    ],
  ];
  return (
    <div className="journey-visual">
      <div className="journey-steps">
        {steps.map(([title], i) => (
          <button
            key={title}
            className={step === i ? "selected" : ""}
            onClick={() => setStep(i)}
          >
            <span>
              {i === 0 ? (
                <Phone />
              ) : i === 1 ? (
                <Waypoints />
              ) : i === 2 ? (
                <Headphones />
              ) : (
                <Check />
              )}
            </span>
            <small>0{i + 1}</small>
            {title}
            <ArrowDownRight size={15} />
          </button>
        ))}
      </div>
      <div className="journey-description" aria-live="polite">
        <span className="tag">CUSTOMER JOURNEY · P. 5</span>
        <h3>{steps[step][0]}</h3>
        <p>{steps[step][1]}</p>
        <button className="text-link" onClick={() => setStep((step + 1) % 4)}>
          Follow the next step →
        </button>
      </div>
    </div>
  );
}
