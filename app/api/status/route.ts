import { readIndex } from "@/lib/retrieval";
export const runtime = "nodejs";
export async function GET() {
  const i = await readIndex();
  return Response.json(
    {
      keyConfigured: !!(
        process.env.OPENAI_API_KEY || process.env.VENNLISK_AI_KEY
      ),
      sourceIndexed: !!i,
      semanticReady: !!i?.embeddingModel,
      pages: i?.pages.length || 0,
      ready:
        !!(process.env.OPENAI_API_KEY || process.env.VENNLISK_AI_KEY) &&
        !!i?.embeddingModel,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
