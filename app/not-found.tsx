import Link from "next/link";
export default function NotFound() {
  return (
    <main className="page narrow">
      <span className="eyebrow">A SMALL DETOUR · 404</span>
      <h1>Let’s find your way back.</h1>
      <p className="lede">This chapter or page does not exist.</p>
      <Link className="button primary" href="/learn">
        Explore the learning journey →
      </Link>
    </main>
  );
}
