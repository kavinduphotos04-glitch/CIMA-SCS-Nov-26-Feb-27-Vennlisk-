import { Suspense } from "react";
import Tutor from "@/components/tutor";
export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="page">
          <div className="skeleton" />
          Loading your study partner…
        </main>
      }
    >
      <Tutor />
    </Suspense>
  );
}
