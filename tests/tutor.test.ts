import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { POST } from "../app/api/tutor/route";

test("tutor retrieves fixture evidence, maintains history and exposes only generated text with valid source links", async () => {
  const cwd = process.cwd(),
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), "vennlisk-tutor-"));
  const oldKey = process.env.OPENAI_API_KEY,
    oldFetch = globalThis.fetch;
  let responseText = "Source fact: Vennlisk is evaluating AI [p. 12].";
  const requests: { url: string; body: Record<string, unknown> }[] = [];
  try {
    await fs.mkdir(path.join(tmp, "private"));
    await fs.writeFile(
      path.join(tmp, "private/index.json"),
      JSON.stringify({
        sha256: "fixture",
        embeddingModel: "text-embedding-3-small",
        pages: [{ page: 12, text: "Private fixture passage" }],
        chunks: [
          {
            id: "p12",
            page: 12,
            text: "Vennlisk is evaluating AI.",
            embedding: [1, 0],
          },
        ],
      }),
    );
    process.chdir(tmp);
    process.env.OPENAI_API_KEY = "fixture-key-not-a-real-credential";
    globalThis.fetch = async (input, init) => {
      const request =
        input instanceof Request ? input : new Request(input, init);
      const body = await request.json();
      requests.push({ url: request.url, body });
      const result = request.url.includes("/embeddings")
        ? {
            object: "list",
            data: [{ object: "embedding", index: 0, embedding: [1, 0] }],
            model: "text-embedding-3-small",
            usage: { prompt_tokens: 1, total_tokens: 1 },
          }
        : {
            id: "resp_fixture",
            object: "response",
            status: "completed",
            model: "gpt-4.1-mini",
            output: [
              {
                id: "msg_fixture",
                type: "message",
                role: "assistant",
                status: "completed",
                content: [
                  { type: "output_text", text: responseText, annotations: [] },
                ],
              },
            ],
          };
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };
    const send = () =>
      POST(
        new Request("http://localhost/api/tutor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": "fixture-client",
          },
          body: JSON.stringify({
            question: "Is it deployed?",
            mode: "Explain Simply",
            level: "Beginner",
            history: [
              { role: "user", content: "Tell me about AI" },
              { role: "assistant", content: "Let us look at the source." },
            ],
          }),
        }),
      );
    let res = await send();
    assert.equal(res.status, 200);
    const answer = await res.json();
    assert.deepEqual(answer.sources, [{ page: 12, href: "/sources/12" }]);
    assert.equal(answer.answer, responseText);
    assert.ok(!JSON.stringify(answer).includes("Private fixture passage"));
    assert.ok(String(requests[0].body.input).includes("Tell me about AI"));
    assert.ok(
      String(requests[1].body.instructions).includes('<source page="12">'),
    );
    assert.ok(Array.isArray(requests[1].body.input));
    responseText = "An invented page reference [p. 99].";
    res = await send();
    assert.equal(res.status, 502);
    assert.match(await res.text(), /unsupported page reference/);
  } finally {
    globalThis.fetch = oldFetch;
    process.chdir(cwd);
    if (oldKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = oldKey;
    await fs.rm(tmp, { recursive: true, force: true });
  }
});
