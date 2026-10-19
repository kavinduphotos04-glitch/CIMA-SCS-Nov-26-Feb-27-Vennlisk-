"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Headphones,
  Activity,
  Users,
  Sparkles,
  Compass,
  Network,
  ShieldCheck,
  ChartNoAxesCombined,
  TrendingUp,
  Leaf,
  Newspaper,
  Check,
  Clock3,
} from "lucide-react";
import { Module } from "@/lib/content";
import { useProgress } from "./progress";
const icons = [
  Building2,
  Headphones,
  Activity,
  Users,
  Sparkles,
  Compass,
  Network,
  ShieldCheck,
  ChartNoAxesCombined,
  TrendingUp,
  Leaf,
  Newspaper,
];
export default function ModuleCard({
  module: m,
  index,
}: {
  module: Module;
  index: number;
}) {
  const { progress } = useProgress(),
    done = progress.completed.includes(m.slug),
    visited = progress.visited.includes(m.slug);
  const Icon = icons[index];
  return (
    <Link className={`module-card ${m.color}`} href={`/learn/${m.slug}`}>
      <div className="card-top">
        <span className="module-icon">
          <Icon size={23} />
        </span>
        <span className="module-num">{String(index + 1).padStart(2, "0")}</span>
        <ArrowUpRight size={19} className="card-arrow" />
      </div>
      <span className="module-category">{m.title}</span>
      <h3>{m.short}</h3>
      <p>{m.description}</p>
      <div className="card-meta">
        <span>
          <Clock3 size={13} /> {m.minutes} min
        </span>
        <span className={done ? "done" : ""}>
          {done ? (
            <>
              <Check size={13} /> Completed
            </>
          ) : visited ? (
            "In progress"
          ) : (
            "Not started"
          )}
        </span>
      </div>
      <div className="card-progress">
        <i style={{ width: done ? "100%" : visited ? "25%" : "0%" }} />
      </div>
    </Link>
  );
}
