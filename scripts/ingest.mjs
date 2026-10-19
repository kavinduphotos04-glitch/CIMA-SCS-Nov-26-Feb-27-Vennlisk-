import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import OpenAI from "openai";
const file = process.env.SOURCE_PDF_PATH || "private/preseen.pdf";
const bytes = await fs.readFile(file);
const pdf = await getDocument({
  data: new Uint8Array(bytes),
  useSystemFonts: true,
}).promise;
const pages = [],
  chunks = [];
for (let n = 1; n <= pdf.numPages; n++) {
  const page = await pdf.getPage(n),
    content = await page.getTextContent();
  const lines = new Map();
  for (const i of content.items) {
    if (!("str" in i)) continue;
    const y = Math.round(i.transform[5]);
    const row = lines.get(y) || [];
    row.push({ x: i.transform[4], text: i.str });
    lines.set(y, row);
  }
  const text = [...lines.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([, r]) =>
      r
        .sort((a, b) => a.x - b.x)
        .map((i) => i.text)
        .join(" "),
    )
    .join("\n");
  pages.push({ page: n, text });
  // Paragraph-aware windows with overlap, always within one page. Tables remain in page context.
  const paragraphs = text.split(/\n(?=[A-Z•])/);
  let buffer = "";
  for (const para of paragraphs) {
    if (buffer.length + para.length > 1800 && buffer) {
      chunks.push({ id: `p${n}-${chunks.length}`, page: n, text: buffer });
      buffer = buffer.slice(-250) + "\n";
    }
    buffer += para + "\n";
  }
  if (buffer.trim())
    chunks.push({ id: `p${n}-${chunks.length}`, page: n, text: buffer });
}
// Original, manually verified descriptions of image-only charts. No inferred exact values.
const visuals = {
  9: "Visual chart note: Industry revenue grows from 2024 to 2025; bars for 2026–2033 are forecasts rising over time. These are projections, not realised performance. Exact unlabelled bar heights are not transcribed.",
  10: "Visual chart note: The client-industry pie chart has banking, financial services and insurance as the largest segment; IT, telecommunications and utilities next, then retail, healthcare and government. Exact segment percentages are not labelled.",
  22: "Visual chart note: Share prices rise into 2022 and broadly decline thereafter through September 2026, with fluctuations. Do not infer exact daily observations from the graphic. Equity beta is explicitly 0.48.",
};
for (const [page, text] of Object.entries(visuals))
  chunks.push({ id: `visual-p${page}`, page: Number(page), text });
const model = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
let embedded = false;
const apiKey = process.env.OPENAI_API_KEY || process.env.VENNLISK_AI_KEY;
if (apiKey) {
  const client = new OpenAI({ apiKey });
  for (let n = 0; n < chunks.length; n += 32) {
    const batch = chunks.slice(n, n + 32);
    const result = await client.embeddings.create({
      model,
      input: batch.map((c) => c.text),
    });
    result.data.forEach((v, i) => {
      batch[i].embedding = v.embedding;
    });
  }
  embedded = true;
}
await fs.mkdir("private", { recursive: true });
const tmp = path.join("private", `index-${process.pid}.tmp`);
await fs.writeFile(
  tmp,
  JSON.stringify({
    sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
    pages,
    chunks,
    embeddingModel: embedded ? model : null,
    createdAt: new Date().toISOString(),
  }),
);
await fs.rename(tmp, "private/index.json");
console.log(
  `Indexed ${pages.length} pages, ${chunks.length} page-aware chunks. Semantic embeddings: ${embedded ? "ready" : "not configured; set OPENAI_API_KEY and rerun npm run ingest"}.`,
);
