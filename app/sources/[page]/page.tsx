import Link from "next/link";
import { notFound } from "next/navigation";
import { modules } from "@/lib/content";
export default async function SourcePage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const n = Number(page);
  if (!Number.isInteger(n) || n < 1 || n > 28) notFound();
  const lessons = modules.flatMap((m) =>
    m.lessons
      .filter((l) => l.pages.includes(n))
      .map((l) => ({ ...l, slug: m.slug })),
  );
  return (
    <main className="page narrow">
      <div className="eyebrow">SOURCE REFERENCE · PAGE {n}</div>
      <h1>Follow the evidence.</h1>
      <p className="lede">
        CIMA Strategic Case Study · November 2026–February 2027 · Vennlisk
      </p>
      <div className="notice">
        These are original educational notes linked to page {n}.{" "}
        <a
          className="text-link"
          href={`/documents/vennlisk-preseen.pdf#page=${n}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open page {n} in the original pre-seen ↗
        </a>
      </div>
      {lessons.map((l, i) => (
        <article className="panel" key={i}>
          <span className="tag">{l.kind || "Source fact"}</span>
          <h2>{l.title}</h2>
          <p>{l.body}</p>
          <Link className="text-link" href={`/learn/${l.slug}`}>
            Study this topic →
          </Link>
        </article>
      ))}
    </main>
  );
}
