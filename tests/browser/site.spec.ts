import { test, expect } from "@playwright/test";
test("home, search, learning progress and persisted bookmarks work", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Master the/ })).toBeVisible();
  await page.getByRole("button", { name: "Search topics" }).click();
  await page
    .getByRole("textbox", { name: "Search the case study" })
    .fill("privacy");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("link")
    .filter({ hasText: "Principal risks" })
    .click();
  await expect(page).toHaveURL(/principal-risks/);
  await page.getByRole("button", { name: "Save chapter" }).click();
  await page.getByRole("button", { name: "Mark complete" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Bookmarked" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Completed · undo" }),
  ).toBeVisible();
  await page.screenshot({ path: "/tmp/vennlisk-lesson.png", fullPage: true });
});
test("financial toggles, source table and formulas match the source", async ({
  page,
}) => {
  await page.goto("/financials");
  await expect(page.locator(".metric-card").first()).toContainText("12,370.0");
  await page.getByRole("button", { name: "Ringcoll", exact: true }).click();
  await expect(page.locator(".metric-card").first()).toContainText("10,514.5");
  await page.getByRole("button", { name: "2025", exact: true }).click();
  await expect(page.locator(".metric-card").first()).toContainText("9,568.2");
  await page
    .locator(".ratio-card")
    .filter({ hasText: "Gearing" })
    .locator("summary")
    .click();
  await expect(
    page.locator(".ratio-card").filter({ hasText: "Gearing" }),
  ).toContainText("1,800.0");
  await expect(page.getByRole("row", { name: /Goodwill/ })).toContainText(
    "6,274.0",
  );
});
test("quiz feedback, flashcards and unconfigured tutor are honest", async ({
  page,
}) => {
  await page.goto("/exam");
  await page
    .getByRole("button", { name: /The organisation outsourcing inbound calls/ })
    .click();
  await expect(page.getByRole("status")).toContainText("That’s right");
  await page.getByRole("button", { name: "Flashcards", exact: true }).click();
  await page.locator(".flashcard").click();
  await expect(page.locator(".flashcard")).toContainText("THE ANSWER");
  await page.goto("/tutor");
  await expect(page.locator(".setup-notice")).toContainText("OPENAI_API_KEY");
  await page
    .getByRole("button", { name: /Compare Vennlisk and Ringcoll financially/ })
    .click();
  await expect(
    page.getByRole("textbox", { name: "Ask about the Vennlisk case" }),
  ).toHaveValue(/Compare/);
  await expect(
    page.getByRole("button", { name: "Send question" }),
  ).toBeDisabled();
});
test("KPI calculator, risk heatmap and deep-linked sources work", async ({
  page,
}) => {
  await page.goto("/learn/operational-performance");
  await expect(page.locator(".calculator-result:visible")).toContainText(
    "82.00",
  );
  await page
    .getByRole("spinbutton", { name: "Resolved without transfer / repeat" })
    .fill("500");
  await expect(page.locator(".calculator-result:visible")).toContainText(
    "50.00",
  );
  await page
    .getByRole("spinbutton", { name: "Total eligible calls" })
    .fill("0");
  await expect(page.locator(".calculator-result:visible")).toContainText(
    "Use valid counts",
  );
  await page.goto("/risks");
  await page.getByRole("slider", { name: /Likelihood/ }).fill("5");
  await expect(page.locator(".score-editor")).toContainText("20 / 25");
  await page.goto("/sources/17");
  await expect(
    page.getByRole("heading", { name: "Follow the evidence." }),
  ).toBeVisible();
  await expect(
    page.getByText("The original pre-seen stays private.", { exact: false }),
  ).toBeVisible();
});
test("all twelve chapters render and have working source notes", async ({
  page,
}) => {
  const { modules } = await import("../../lib/content");
  for (const m of modules) {
    await page.goto(`/learn/${m.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      m.title,
    );
    await expect(page.locator(".knowledge-check:visible")).toBeVisible();
  }
  await page.goto("/learn/not-a-chapter");
  await expect(
    page.getByRole("heading", { name: "Let’s find your way back." }),
  ).toBeVisible();
});
test("responsive layouts do not overflow and mobile navigation works", async ({
  page,
}) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/learn",
      "/financials",
      "/risks",
      "/tutor",
      "/exam",
      "/learn/leadership-and-governance",
    ]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
        `${width}: ${path}`,
      ).toBe(true);
    }
    await page.goto("/");
    await page.screenshot({
      path: `/tmp/vennlisk-${width}.png`,
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Financials", exact: true })
    .click();
  await expect(page).toHaveURL("/financials");
});
test("tutor API validates requests, reports setup, and source bytes stay private", async ({
  request,
}) => {
  let r = await request.post("/api/tutor", {
    data: { question: "", mode: "Explain Simply", level: "Beginner" },
  });
  expect(r.status()).toBe(400);
  r = await request.post("/api/tutor", {
    data: {
      question: "Explain Vennlisk",
      mode: "Explain Simply",
      level: "Beginner",
    },
  });
  expect(r.status()).toBe(503);
  expect(await r.text()).toContain("setup required");
  r = await request.get("/api/source/17");
  expect(r.status()).toBe(403);
  r = await request.get("/private/preseen.pdf");
  expect(r.status()).toBe(404);
  r = await request.post("/api/tutor", {
    headers: { Origin: "https://untrusted.example" },
    data: { question: "x" },
  });
  expect(r.status()).toBe(403);
});

test("keyboard search and Escape restore normal navigation", async ({
  page,
}) => {
  await page.goto("/learn");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Search the case study" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("main learning screens pass automated WCAG A/AA checks with reduced motion", async ({
  page,
}) => {
  const AxeBuilder = (await import("@axe-core/playwright")).default;
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of [
    "/",
    "/financials",
    "/learn/operational-performance",
    "/risks",
    "/tutor",
    "/exam",
  ]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
});
