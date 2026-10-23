import { notFound } from "next/navigation";
import AcademyDashboard from "@/components/mock-academy/dashboard";
import { getMockExam, mockExams } from "@/lib/mock-exams";
export function generateStaticParams() {
  return mockExams.map((e) => ({ examId: e.id }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  if (!getMockExam(examId)) notFound();
  return <AcademyDashboard examId={examId} />;
}
