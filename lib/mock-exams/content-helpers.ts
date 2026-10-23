import type { AnswerParagraph, Checkpoint, Source } from "./types";
export const preseen = (
  pages: number[],
  label = "Official pre-seen",
): Source => ({ kind: "preseen", label, pages });
export const brief: Source = {
  kind: "brief",
  label: "Mock scenario · supplied teaching brief",
};
export const theory: Source = {
  kind: "theory",
  label: "Original theory explanation · not a supplied workbook extract",
};
export function paragraph(
  id: string,
  title: string,
  evidence: string,
  analysis: string,
  implication: string,
  recommendation: string,
  explanation: string,
  significance: string,
  sources: Source[],
  technique: string,
): AnswerParagraph {
  return {
    id,
    title,
    sentences: [
      { kind: "evidence", text: evidence },
      { kind: "analysis", text: analysis },
      { kind: "implication", text: implication },
      { kind: "recommendation", text: recommendation },
    ],
    explanation,
    significance,
    evidence: sources,
    technique,
  };
}
export function checks(
  choice: {
    prompt: string;
    options: string[];
    correct: number;
    explanation: string;
  },
  sequence: string[],
  sequenceExplanation: string,
  pairs: [string, string][],
  matchExplanation: string,
): Checkpoint[] {
  return [
    {
      id: "understanding",
      type: "choice",
      prompt: choice.prompt,
      options: choice.options.map((text, i) => ({ id: String(i), text })),
      correct: String(choice.correct),
      explanation: choice.explanation,
    },
    {
      id: "reasoning",
      type: "sequence",
      prompt: "Arrange a persuasive examination argument in a logical order.",
      items: sequence.map((text, i) => ({ id: String(i), text })),
      explanation: sequenceExplanation,
    },
    {
      id: "connections",
      type: "match",
      prompt:
        "Connect each case fact or issue to its most relevant implication.",
      pairs: pairs.map(([fact, match], i) => ({ id: String(i), fact, match })),
      explanation: matchExplanation,
    },
  ];
}
