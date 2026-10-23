import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MockLesson from "@/components/mock-academy/lesson";
import { getMockExam, mockExams, allLessons } from "@/lib/mock-exams";
export function generateStaticParams() {
  return mockExams.flatMap((e) =>
    allLessons(e).map((l) => ({ examId: e.id, lessonSlug: l.slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ examId: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { examId, lessonSlug } = await params;
  const exam = getMockExam(examId);
  const lesson = exam && allLessons(exam).find((l) => l.slug === lessonSlug);
  return {
    title: lesson
      ? `${lesson.number} ${lesson.title} · ${exam!.title}`
      : "Mock lesson not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ examId: string; lessonSlug: string }>;
}) {
  const { examId, lessonSlug } = await params;
  const exam = getMockExam(examId);
  if (!exam || !allLessons(exam).some((l) => l.slug === lessonSlug)) notFound();
  return (
    <MockLesson
      key={`${examId}/${lessonSlug}`}
      examId={examId}
      lessonSlug={lessonSlug}
    />
  );
}
