import fs from "node:fs/promises";
import path from "node:path";
export type Chunk = {
  id: string;
  page: number;
  text: string;
  embedding?: number[];
};
export type SourceIndex = {
  sha256: string;
  embeddingModel: string | null;
  pages: { page: number; text: string }[];
  chunks: Chunk[];
};
export async function readIndex(): Promise<SourceIndex | null> {
  try {
    return JSON.parse(
      await fs.readFile(path.join(process.cwd(), "private/index.json"), "utf8"),
    );
  } catch {
    return null;
  }
}
export function cosine(a: number[], b: number[]) {
  if (a.length !== b.length || !a.length) return 0;
  let dot = 0,
    aa = 0,
    bb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    aa += a[i] * a[i];
    bb += b[i] * b[i];
  }
  return aa && bb ? dot / Math.sqrt(aa * bb) : 0;
}
export function retrieve(chunks: Chunk[], embedding: number[], limit = 6) {
  return chunks
    .filter((c) => c.embedding)
    .map((c) => ({ chunk: c, score: cosine(c.embedding!, embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((v) => v.chunk);
}
