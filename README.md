# Vennlisk Academy

An independent interactive CIMA Strategic Case Study learning app for November 2026–February 2027. Next.js App Router, React, TypeScript, Motion, Lucide and Recharts. Local fonts are bundled; no font CDN is required.

## Run locally

Requires Node.js 22.13+ (validated here on Node 24) and npm. From this repository:

```sh
npm ci --cache /tmp/vennlisk-npm-cache
npm run dev
```

The development server listens on port 3000. `npm run build` and `npm start` run the production version. No database or account is required. Study progress and bookmarks use local storage on the current browser/device; conversations and scenario drafts remain in page memory and disappear on navigation or refresh. Browser storage failures fall back to session memory with a notice.

## Source ingestion (private)

Place your authorised copy of `SCS_Nov26_Feb27_Pre_seen_Material_91eeefda56.pdf` at `private/preseen.pdf`. The supplied file is already present in this prepared workspace, but is intentionally ignored by Git. Never put it or the full extracted index in `public/`. Neither PDF bytes nor raw index passages have a public application route.

```sh
npm run ingest
```

This uses PDF.js to read all 28 pages, group text by visual row (preserving the financial-table column order), and create overlapping page-aware chunks in `private/index.json`. It records a SHA-256 source fingerprint. Chart interpretation is authored separately: unlabelled industry percentages and exact historical share-price points are not fabricated. PDF.js may emit a harmless font-program warning during extraction; it does not prevent text indexing.

The lessons cover substantive pages 4–27; source notes also explain the context and publication pages. Public educational notes are original summaries, not the full PDF. Source links lead to those page-specific notes and identify the page to consult in the student's own authorised copy. No optional theory workbooks were supplied or assumed.

## Enable the AI tutor

Copy `.env.example` to `.env.local` and enter `OPENAI_API_KEY` securely on the server. Never use a `NEXT_PUBLIC_` prefix. Optional model settings default to `gpt-4.1-mini` (Responses API) and `text-embedding-3-small`. The ingestion command is plain Node, so load the environment explicitly:

```sh
node --env-file=.env.local scripts/ingest.mjs
npm run dev
```

Or inject the server environment securely and run `npm run ingest`. With a key, ingestion creates embeddings. Without a key, it only extracts text and the tutor remains visibly unavailable. Restart the server after changing environment values. The status endpoint reports configuration booleans, never credentials. For cloud environment settings that reserve `OPENAI_` variable names, the app and ingestion also accept the server-only alias `VENNLISK_AI_KEY`. Supply the key securely in environment settings, then rerun ingestion and restart the server. The tutor also requires HTTPS access to `api.openai.com`.

Questions and recent conversation context are embedded, matched using cosine similarity against the private page-aware index, and sent with the top six passages to OpenAI. Answers distinguish case facts, interpretation and examples. Page references are restricted to retrieved pages; the browser receives citations and generated answers, not the private index. The UI provides learning modes, level selection, follow-ups, copy, loading and error states. Scenario evaluation uses the same grounded service and never awards official marks.

Source accuracy cannot be guaranteed by retrieval alone: verify consequential answers against the authorised PDF. Model quality, live semantic indexing and successful generated responses require a valid account/key; those live operations were not tested in the keyless environment. Semantic ranking and failure paths have automated coverage.

## Validation

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
# In another terminal, with the server on port 3000:
npm run test:e2e
```

Browser tests use system Chromium at `/usr/bin/chromium`. If unavailable, install the Playwright Chromium browser and adjust `playwright.config.ts` to use it. Tests exercise financial reconciliation, ratio conventions, all twelve chapters, calculators, source privacy, quizzes, saved progress, API validation and responsive navigation. Screenshots go to `/tmp`.

Financial amounts are W$ million. Expenses in the explorer are positive magnitudes. Gearing uses book debt / (debt + equity); ROCE uses closing equity + debt; receivables days assume credit revenue and a 365-day year. 2025 dividends and 2024 revenue are not supplied, so dependent ratios show unavailable instead of invented numbers. Risk likelihood/impact values and calculator inputs are explicitly illustrative. ESG percentages are targets, not current achievement levels.

## Deployment

For a private, authorised study deployment on a Node-compatible host: install with `npm ci`, mount `private/preseen.pdf` and `private/index.json` securely, configure server secrets, run ingestion in the deployment working directory, build, and start. On hosts with ephemeral filesystems, generate/package the private index in the build or mount persistent private storage; do not depend on runtime writes surviving restarts. Run the app at the repository working directory so it can locate its private index. Next.js standalone packaging is not configured.

Before making an AI-enabled deployment shared or public, add authentication/access control, a persistent distributed rate limit and usage budgets. The included in-memory 12-requests-per-minute limiter and same-origin check are suitable for a single-instance private study environment; they are not distributed abuse protection. Authenticate trusted reverse-proxy forwarding headers at your host. Authorised users' submitted questions and retrieved PDF passages are transmitted to OpenAI when AI is enabled. Do not send unrelated confidential data. Never publicly distribute the official PDF or extracted corpus, and confirm rights before sharing educational derivative content. No deployment or publication was performed by this task.

## Structure

- `app/`: routes, layouts, status and tutor APIs
- `components/`: learning experience, interactive tools, explorer and practice studio
- `lib/content.ts`: original educational modules, directors, risks and references
- `lib/financials.ts`: source statements and transparent calculations
- `lib/retrieval.ts`: private index loading and semantic ranking
- `scripts/ingest.mjs`: private page-aware PDF ingestion and optional embedding
- `private/`: ignored authorised PDF and index
- `tests/`: numerical/content checks and browser integration tests

Independent learning tool; not affiliated with CIMA and not an official marking system.
