import type { Metadata } from "next";
import LeadershipPage from "@/components/leadership";
export const metadata: Metadata = {
  title: "Leadership & Exam Triggers",
  description:
    "Vennlisk’s nine directors, executive and non-executive responsibilities, committees and source-referenced exam practice triggers.",
};
export default function Page() {
  return <LeadershipPage />;
}
