// The extraction endpoint remains disabled; the reading copy is a static PDF.
export async function GET() {
  return Response.json(
    {
      error:
        "Use the navigation PDF link to read the pre-seen. This endpoint does not expose the private extraction corpus.",
    },
    { status: 403 },
  );
}
