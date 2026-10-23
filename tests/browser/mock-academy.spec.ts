import { test, expect } from "@playwright/test";
import { allLessons, getMockExam } from "../../lib/mock-exams";
const exam = getMockExam("mock-1")!;
test("academy navigation exposes only Mock 1 with three expandable sections and six lessons", async ({
  page,
}) => {
  await page.goto("/exam");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Mock Exam Academy", exact: true })
    .click();
  await expect(page).toHaveURL("/mock-exams");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Mock Exam",
  );
  await expect(page.getByText("Mock Exam 2", { exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: "View learning plan" }).click();
  await expect(page.locator(".ma-section")).toHaveCount(3);
  for (const section of await page.locator(".ma-section").all()) {
    if (
      !(await section.getAttribute("open")) &&
      (await section.getAttribute("open")) !== ""
    )
      await section.locator("summary").click();
  }
  await expect(page.locator(".ma-lesson-card:visible")).toHaveCount(6);
  await expect(
    page.getByRole("img", { name: "0 of 6 lessons completed, 0%" }),
  ).toBeVisible();
});
test("all six lessons have all eight steps, complete answers and clear source boundaries", async ({
  page,
}) => {
  for (const lesson of allLessons(exam)) {
    await page.goto(`/mock-exams/mock-1/${lesson.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      lesson.title,
    );
    await expect(page.locator(".ma-step")).toHaveCount(8);
    await expect(page.locator(".ma-clean-answer p")).toHaveCount(4);
    await expect(page.locator(".ma-question-focus")).toContainText(
      "RECONSTRUCTED QUESTION FOCUS",
    );
    await expect(page.locator(".ma-scenario")).toContainText("Mock scenario:");
    await expect(
      page.getByRole("button", { name: "Mark lesson complete", exact: true }),
    ).toBeDisabled();
    await expect(page.locator(".ma-source-notice")).toContainText(
      "not official CIMA",
    );
  }
  await page.goto("/mock-exams/mock-2");
  await expect(
    page.getByRole("heading", { name: "Let’s find your way back." }),
  ).toBeVisible();
});
test("writing, three checkpoint types, annotations and completion persist while legacy progress remains intact", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.addInitScript(() => {
    if (!localStorage.getItem("vennlisk-progress-v1"))
      localStorage.setItem(
        "vennlisk-progress-v1",
        JSON.stringify({
          completed: ["understanding-vennlisk"],
          visited: ["understanding-vennlisk"],
          bookmarks: ["principal-risks"],
          scores: { "understanding-vennlisk": true },
          attempts: 2,
          last: "understanding-vennlisk",
        }),
      );
  });
  const lesson = allLessons(exam)[0];
  await page.goto(`/mock-exams/mock-1/${lesson.slug}`);
  await page.getByRole("button", { name: /^Theory card:/ }).click();
  await expect(page.locator(".ma-flashcard:visible")).toContainText(
    "Direct competitors offer a similar service",
  );
  await page.getByRole("button", { name: "Next card", exact: true }).click();
  await expect(page.locator(".ma-flashcard:visible")).toContainText(
    "Specialist AI vendors",
  );
  await page
    .locator(".ma-decision")
    .getByRole("button", {
      name: "Pilot carefully while investigating the failure",
      exact: true,
    })
    .click();
  await expect(page.locator(".ma-decision-feedback")).toContainText(
    "testing the same accuracy risk",
  );
  const paragraph = page.locator("#anatomy .ma-answer-paragraph").first();
  await paragraph
    .getByRole("button", { name: "Case evidence", exact: true })
    .click();
  await expect(paragraph.locator(".ma-sentence.evidence")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await paragraph.getByText("Lecturer’s explanation", { exact: true }).click();
  await paragraph.getByText("Writing technique", { exact: true }).click();
  await expect(paragraph.locator(".lecturer")).toHaveAttribute("open", "");
  await expect(paragraph.locator(".technique")).toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Copy Answer", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain("standalone AI vendors");
  await page
    .getByRole("button", { name: "Annotated Lecturer Version", exact: true })
    .click();
  await expect(page.locator("#full-answer .ma-answer-paragraph")).toHaveCount(
    4,
  );
  const draft =
    "Ringcoll may have greater financing headroom because its gearing is lower and interest cover is stronger. Vennlisk should preserve flexibility and test service reliability before wider investment.";
  await page
    .getByLabel("Your examination paragraph", { exact: true })
    .fill(draft);
  await page
    .getByRole("button", { name: "Save practice attempt", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Reveal Suggested Answer", exact: true })
    .click();
  await expect(page.locator(".ma-suggested")).toContainText("39.8%");
  await page.getByLabel("Did I explain the business consequence?").check();
  const first = page.locator(".ma-checkpoint").nth(0);
  await first.getByRole("radio").first().check();
  await first
    .getByRole("button", { name: "Check answer", exact: true })
    .click();
  await expect(first.getByRole("status")).toContainText(
    "A useful point to revisit.",
  );
  await first.getByRole("radio").nth(1).check();
  await first
    .getByRole("button", { name: "Check answer", exact: true })
    .click();
  await expect(first.getByRole("status")).toContainText(
    "That connection works.",
  );
  const sequence = page.locator(".ma-checkpoint").nth(1);
  const q = lesson.checkpoints.find((q) => q.type === "sequence")!;
  if (q.type !== "sequence") throw Error("Missing sequence");
  for (let target = 0; target < q.items.length; target++) {
    let current = (
      await sequence.locator(".ma-sequence li p").allTextContents()
    ).indexOf(q.items[target].text);
    while (current > target) {
      await sequence
        .locator(".ma-sequence li")
        .filter({ hasText: q.items[target].text })
        .getByRole("button", { name: /up$/ })
        .click();
      current--;
    }
  }
  await sequence
    .getByRole("button", { name: "Check sequence", exact: true })
    .click();
  await expect(sequence.getByRole("status")).toContainText(
    "That connection works.",
  );
  const matching = page.locator(".ma-checkpoint").nth(2);
  for (let i = 0; i < 3; i++)
    await matching.getByRole("combobox").nth(i).selectOption(String(i));
  await matching
    .getByRole("button", { name: "Check connections", exact: true })
    .click();
  await expect(matching.getByRole("status")).toContainText(
    "That connection works.",
  );
  await page
    .getByRole("button", { name: "Mark lesson complete", exact: true })
    .click();
  await expect(page.locator(".ma-completion-reward")).toContainText(
    "Lesson complete.",
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Mark as in progress", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Your examination paragraph", { exact: true }),
  ).toHaveValue(draft);
  await expect(
    page.getByLabel("Did I explain the business consequence?"),
  ).toBeChecked();
  await expect(first.getByRole("status")).toContainText(
    "That connection works.",
  );
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("vennlisk-progress-v1")!),
  );
  expect(saved.completed).toEqual(["understanding-vennlisk"]);
  expect(saved.bookmarks).toEqual(["principal-risks"]);
  expect(saved.mockExams["mock-1"].completed).toEqual(["competitor-analysis"]);
  await page.goto("/mock-exams/mock-1");
  await expect(
    page.getByRole("img", { name: "1 of 6 lessons completed, 17%" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Continue Learning", exact: true })
    .click();
  await expect(page).toHaveURL("/mock-exams/mock-1/non-financial-capitals");
});
test("academy stays responsive and passes automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 768, 1101, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/mock-exams",
      "/mock-exams/mock-1",
      "/mock-exams/mock-1/debt-financing",
    ]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${width} ${path}`,
      ).toBe(true);
    }
  }
  const AxeBuilder = (await import("@axe-core/playwright")).default;
  for (const path of [
    "/mock-exams",
    "/mock-exams/mock-1",
    "/mock-exams/mock-1/internal-controls",
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      path,
    ).toEqual([]);
  }
  await page.goto("/mock-exams");
  await page.screenshot({
    path: "/tmp/vennlisk-mock-academy.png",
    fullPage: true,
  });
  await page.goto("/mock-exams/mock-1/debt-financing");
  await page.screenshot({ path: "/tmp/vennlisk-mock-lesson.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "/tmp/vennlisk-mock-mobile.png" });
});
