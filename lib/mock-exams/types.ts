export type Source = {
  kind: "preseen" | "brief" | "theory";
  label: string;
  pages?: number[];
};
export type Theory = {
  term: string;
  simple: string;
  example: string;
  application: string;
};
export type FunctionKind =
  "evidence" | "analysis" | "implication" | "recommendation";
export type AnswerParagraph = {
  id: string;
  title: string;
  sentences: { kind: FunctionKind; text: string }[];
  explanation: string;
  significance: string;
  evidence: Source[];
  technique: string;
};
export type Checkpoint =
  | {
      id: string;
      type: "choice";
      prompt: string;
      options: { id: string; text: string }[];
      correct: string;
      explanation: string;
    }
  | {
      id: string;
      type: "sequence";
      prompt: string;
      items: { id: string; text: string }[];
      explanation: string;
    }
  | {
      id: string;
      type: "match";
      prompt: string;
      pairs: { id: string; fact: string; match: string }[];
      explanation: string;
    };
export type Lesson = {
  slug: string;
  number: string;
  title: string;
  minutes: number;
  summary: string;
  scenario: string;
  question: {
    focus: string;
    plain: string;
    analyse: string;
    knowledge: string;
    facts: string[];
    weak: string;
    strong: string;
  };
  sources: Source[];
  theory: Theory[];
  application: {
    theory: string;
    evidence: string;
    implication: string;
    action: string;
    explanation: string;
  };
  paragraphs: AnswerParagraph[];
  comparison: {
    weak: string;
    whyWeak: string;
    strong: string;
    whyStrong: string;
  };
  writing: { issue: string; suggested: string };
  checkpoints: Checkpoint[];
  decision: {
    prompt: string;
    options: { id: string; title: string; explanation: string }[];
  };
  financing?: { pilot: number; rollout: number };
};
export type MockSection = {
  id: string;
  number: string;
  title: string;
  description: string;
  lessons: Lesson[];
};
export type MockExam = {
  id: string;
  title: string;
  window: string;
  caseName: string;
  description: string;
  sections: MockSection[];
};
export type CheckpointAnswer = {
  answer: string | string[] | Record<string, string>;
  correct: boolean;
};
export type MockProgress = {
  opened: string[];
  completed: string[];
  checkpoints: Record<string, Record<string, CheckpointAnswer>>;
  drafts: Record<string, string>;
  writingAttempts: string[];
  selfReview: Record<string, boolean[]>;
  lastLesson: string;
};
export const emptyMockProgress = (): MockProgress => ({
  opened: [],
  completed: [],
  checkpoints: {},
  drafts: {},
  writingAttempts: [],
  selfReview: {},
  lastLesson: "",
});
