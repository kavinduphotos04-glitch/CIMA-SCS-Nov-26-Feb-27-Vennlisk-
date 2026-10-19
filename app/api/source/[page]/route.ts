// Intentionally no raw PDF delivery: private source is used server-side only.
export async function GET() {
  return Response.json(
    {
      error:
        "The original PDF is private. Use the cited educational page notes.",
    },
    { status: 403 },
  );
}
