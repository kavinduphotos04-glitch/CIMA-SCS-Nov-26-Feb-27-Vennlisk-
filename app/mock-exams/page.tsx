import type { Metadata } from "next";
import AcademyDashboard from "@/components/mock-academy/dashboard";
export const metadata: Metadata = {
  title: "Mock Exam Academy",
  description:
    "Learn to understand, analyse and construct a Vennlisk strategic case-study response through six guided Mock Exam 1 lessons.",
};
export default function Page() {
  return <AcademyDashboard />;
}
