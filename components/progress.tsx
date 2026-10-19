"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
export type Progress = {
  completed: string[];
  visited: string[];
  bookmarks: string[];
  scores: Record<string, boolean>;
  attempts: number;
  last: string;
};
const initial: Progress = {
  completed: [],
  visited: [],
  bookmarks: [],
  scores: {},
  attempts: 0,
  last: "understanding-vennlisk",
};
const Context = createContext<{
  progress: Progress;
  update: (fn: (p: Progress) => Progress) => void;
  storageError: boolean;
}>({ progress: initial, update: () => {}, storageError: false });
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(initial),
    [ready, setReady] = useState(false),
    [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      const p = JSON.parse(
        localStorage.getItem("vennlisk-progress-v1") || "null",
      );
      if (
        p &&
        Array.isArray(p.completed) &&
        Array.isArray(p.visited) &&
        Array.isArray(p.bookmarks) &&
        p.scores &&
        typeof p.scores === "object"
      )
        setProgress({ ...initial, ...p });
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("vennlisk-progress-v1", JSON.stringify(progress));
      } catch {
        setStorageError(true);
      }
  }, [progress, ready]);
  const update = useCallback(
    (fn: (p: Progress) => Progress) => setProgress(fn),
    [],
  );
  return (
    <Context.Provider value={{ progress, update, storageError }}>
      {children}
    </Context.Provider>
  );
}
export const useProgress = () => useContext(Context);
