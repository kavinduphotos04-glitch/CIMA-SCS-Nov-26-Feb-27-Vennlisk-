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

Place your authorised copy of `SCS_Nov26_Feb27_Pre_seen_Material_91eeefda56.pdf` at `private/preseen.pdf`. The supplied file is already present in this prepared workspace, but is intentionally ignored by Git. The top-navigation document icon opens the bundled reading copy at `public/documents/vennlisk-preseen.pdf` in a new tab. That reading copy is committed and deployed as a static PDF with inline display headers; anyone with website access can read it. The extraction working copy stays ignored. Keep the full extracted index private and out of `public/`.

```sh
npm run ingest
```

This uses PDF.js to read all 28 pages, group text by visual row (preserving the financial-table column order), and create overlapping page-aware chunks in `private/index.json`. It records a SHA-256 source fingerprint. Chart interpretation is authored separately: unlabelled industry percentages and exact historical share-price points are not fabricated. PDF.js may emit a harmless font-program warning during extraction; it does not prevent text indexing.

The lessons cover substantive pages 4–27; source notes also explain the context and publication pages. Public educational notes are original summaries, not the full PDF. Source links lead to those page-specific notes; the top-navigation PDF icon opens the original 28-page pre-seen for reading. No optional theory workbooks were supplied or assumed.

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

Before making an AI-enabled deployment shared or public, add authentication/access control, a persistent distributed rate limit and usage budgets. The included in-memory 12-requests-per-minute limiter and same-origin check are suitable for a single-instance private study environment; they are not distributed abuse protection. Authenticate trusted reverse-proxy forwarding headers at your host. Authorised users' submitted questions and retrieved PDF passages are transmitted to OpenAI when AI is enabled. Do not send unrelated confidential data. The reading PDF is delivered through the website, so use hosting access protection to restrict it to authorised study users. Keep the extracted AI corpus private.

## Deploy a test site on Netlify

Connect this GitHub repository to Netlify using **Add new project → Import an existing project** (or the repository deployment link). The committed `netlify.toml` supplies the build settings:

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 24
- Next.js server routes: Netlify’s automatically installed Next.js runtime

Do not upload `.next` with Netlify Drop or change the app to a static export: the tutor and source-note routes require the server runtime. No API key is needed to deploy and explore the UI, lessons, quizzes and financial tools.

The reading PDF in `public/documents/` is included automatically in a GitHub-based Netlify deployment. The private extraction working copy and AI index are excluded from Git, so a fresh deployment will correctly show the tutor as unconfigured. If enabling tutoring later, supply a semantic `private/index.json` through a secure build step and set `OPENAI_API_KEY` or `VENNLISK_AI_KEY` in Netlify’s server/function environment. The Netlify function configuration includes only that index in private function bundles; the separate reading PDF is a static asset. Do not put the extracted AI index into the public directory.

All pages send `noindex, nofollow, noarchive` and include robots metadata to request exclusion from search engines. This is an **unlisted test site**, not access control. Anyone who obtains its URL can open it. To restrict access, enable Netlify site protection where supported by your plan, or add application authentication before sharing. A private GitHub repository does not automatically make the deployed website private. For a temporary preview rather than a production URL, use a Netlify draft deploy after connecting your account.

No Netlify account credentials are stored in this repository. Creating the deployment requires authorisation in your Netlify account.

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
