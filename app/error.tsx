"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="page narrow">
      <h1>A little interruption.</h1>
      <p>
        The page could not load. Your saved browser progress remains available.
      </p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
