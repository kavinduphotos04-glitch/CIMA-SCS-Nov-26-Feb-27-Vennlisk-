"use client";
import { useCallback } from "react";
import { useProgress } from "@/components/progress";
import { emptyMockProgress, type MockProgress } from "@/lib/mock-exams/types";
export function useMockProgress(examId: string) {
  const { progress, update, ready, storageError } = useProgress();
  const data = progress.mockExams[examId] || emptyMockProgress();
  const updateMock = useCallback(
    (fn: (p: MockProgress) => MockProgress) => {
      update((p) => ({
        ...p,
        mockExams: {
          ...p.mockExams,
          [examId]: fn(p.mockExams[examId] || emptyMockProgress()),
        },
      }));
    },
    [examId, update],
  );
  return { progress: data, updateMock, ready, storageError };
}
