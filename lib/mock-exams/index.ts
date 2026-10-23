import { mock1 } from "./mock-1";
import type {
  MockExam,
  MockProgress,
  Lesson,
  Checkpoint,
  CheckpointAnswer,
} from "./types";
export const mockExams: MockExam[] = [mock1];
export const getMockExam = (id: string) => mockExams.find((e) => e.id === id);
export const allLessons = (exam: MockExam) =>
  exam.sections.flatMap((s) => s.lessons);
export const lessonHref = (examId: string, slug: string) =>
  `/mock-exams/${examId}/${slug}`;
export function continueLesson(exam: MockExam, progress: MockProgress): Lesson {
  const lessons = allLessons(exam);
  return (
    lessons.find(
      (l) =>
        l.slug === progress.lastLesson && !progress.completed.includes(l.slug),
    ) ||
    lessons.find((l) => !progress.completed.includes(l.slug)) ||
    lessons.find((l) => l.slug === progress.lastLesson) ||
    lessons[0]
  );
}
export function completion(exam: MockExam, progress: MockProgress) {
  const total = allLessons(exam).length,
    count = allLessons(exam).filter((l) =>
      progress.completed.includes(l.slug),
    ).length;
  return { count, total, percent: Math.round((count / total) * 100) };
}
export function canComplete(lesson: Lesson, progress: MockProgress) {
  return (
    progress.writingAttempts.includes(lesson.slug) &&
    lesson.checkpoints.every((q) => !!progress.checkpoints[lesson.slug]?.[q.id])
  );
}
export function evaluateCheckpoint(
  q: Checkpoint,
  answer: CheckpointAnswer["answer"],
): boolean {
  if (q.type === "choice")
    return typeof answer === "string" && answer === q.correct;
  if (q.type === "sequence")
    return (
      Array.isArray(answer) &&
      answer.length === q.items.length &&
      answer.every((id, i) => id === q.items[i].id)
    );
  return (
    !!answer &&
    typeof answer === "object" &&
    !Array.isArray(answer) &&
    q.pairs.every((p) => answer[p.id] === p.id)
  );
}
export { normaliseMockProgress } from "./progress-store";
