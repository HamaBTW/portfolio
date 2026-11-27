# T-Agent Pipeline: multi-agent course production swarm

> Part of the Tache-Lik platform. Built and owned by Mohamed Abidi (182 of 183 commits in `t-agent-master`).
> Sources: founder's description (Nov 2026), `t-agent-master` (Mastra, TypeScript) and the
> `tache-lik.tn-back-end-typescript` pipeline/thumbnail/publish services.

## One-line pitch
Teachers drag and drop raw course videos and click **Start**. A swarm of AI agents watches every video, checks it against Tache-Lik's knowledge base, writes all titles, descriptions, timecodes and thumbnail text, builds the thumbnails, uploads everything to YouTube/VdoCipher and inspects the result. Preparing one course went from **5–8 hours of manual work to an unattended run** (the CV states **8+ hours → 15 minutes**).

## The problem
For each course a teacher uploaded, someone had to: understand every video, write titles and descriptions, adapt them for YouTube (playlist, descriptions, timecodes), make thumbnails, and upload everything to the site and the video hosts. **One course could take 5–8 hours.**

## Evolution
| Stage | Approach | Outcome |
|---|---|---|
| 1 | Single API call to analyse each video, analysis saved as JSON | Saved only ~10 min (≈7 h 50 left) |
| 2 | Automation in **n8n** | 1–2 h per course, but rigid: one failed step or AI error broke the run and needed a manual re-run |
| 3 | **Custom n8n-style workflow engine** built in-house (2025) to fix n8n's limits | Same speed, far fewer errors. This is where the T-Agent Pipeline was born (backend `videoPipeline` service, Aug 2025) |
| 4 | **Pipeline v2: multi-agent harness** on Mastra (3–4 months, summer 2026; repo from Aug 2026) | Fully unattended: "drag & drop, click start, go to sleep, get notified" |

v2 is a rebuild of the core, not "an API call with some AI and error handling". It is a **harness for a multi-agent flow**.

## The swarm (v2), stage by stage
1. **The Watcher (agent, Gemini).** Watches each video and takes concise **notes**, not a bloated JSON: summary, topics, definitions (term + definition in the video's own words), examples, **timecodes** (`M:SS - Label` with emoji, starting at 0:00), keywords, **learning objectives**, likely student questions, and bullet points. A separate metadata prompt handles video-level facts. Strict rule: the Watcher never writes marketing or SEO copy.
2. **The Enhancer (agent, knowledge-enrichment).** *KB service details:* Python `tache-lik-knowledge` (`tache-lik-kb serve`, stdlib HTTP server) exposing `POST /api/search` (query, top_k 1–100, include/exclude filters, unknown keys rejected with 400, provider failures as a 503 envelope) over **Qdrant + bge-m3** embeddings, with 14 pytest contract tests. Retrieval is class-scoped with graceful widening (class+course → class → unscoped, honestly labelled), deduplicated by doc-chunk and score-sorted. The LLM merges results into {academicContext, officialTerms, relatedTopics, prerequisites, conflicts}. Golden rule: the video is the truth and disagreements land in `conflicts`. Cited sources are validated against retrieved chunks, and the Librarian drops hallucinated KB ids. It degrades cleanly (`kb_unavailable`, `kb_no_results`) and never throws on KB issues.
   **Role:** Queries Tache-Lik's **knowledge layer**: a **Qdrant vector database** of everything collected (exams, courses, images, earlier agent analyses), served by a **custom-built Knowledge Base API** with filters (course, year, class, chapter, resource type). It checks what is true, **fixes wrong data** and enriches the Watcher's notes. Agents keep the knowledge base updated.
3. **The Librarian (agent).** Merges all enhanced notes into **one course memory**: removes repetition, classifies and orders the material, and groups related videos (for example, videos 1 and 2 both covering JWT become one note). It handles provider token ceilings by splitting oversized requests instead of burning keys.
4. **The Writer (agent).** Writes everything the course needs from the Librarian's memory: course title and description, **YouTube playlist** data, per-video titles, YouTube descriptions, **timecodes**, and the **text for every video thumbnail**. Teachers can lock their own fields ("force keep custom data").
5. **The Verifier (agent + code).** Has tools and code to check the Writer's output, **fact-check** it and fix it where needed.
6. **The Builder (code layer).** Assembles the verified data into the exact JSON structure the website and platforms need. Deterministic, no LLM.
7. **Thumbnail Master (Thumbnail Studio step).** Combines the generated titles, a pre-configured class PPTX template and the course picture to render every thumbnail (a Python PPTX server). If the template server or course image is missing, it skips cleanly with a retryable message.
8. **The Uploader (agent).** Uploads to **YouTube** (free courses, playlist creation is idempotent and survives a crash) and **VdoCipher** (paid courses), verifies the upload and fixes anything that needs a change.
9. **The Inspector (final step).** A programmatic checker that verifies every detail is in place (playlist, per-video metadata, thumbnails, publish state) and reports pass/fail/warn per check.

**New workflow:** drag and drop videos and files → click Start → get notified when done → review the output → hit **Publish**.

## Reliability engineering (the "harness" part)
- **Per-step retries:** each Watcher step (metadata, knowledge) gets several attempts with a pause between them, and every attempt is logged live to the admin UI.
- **Stop/abort-aware:** a Stop interrupts long steps (one video watch can take 10+ min) instead of waiting for them to finish.
- **Crash-resume and idempotency:** backend retries and restarts are accepted and ignored safely. Resumed runs skip finished work (for example, an existing YouTube playlist id).
- **Heartbeat** to the backend queue during long silent Gemini calls.
- **Model and provider fallback:** Gemini video models with a fallback list (gemini-2.5-flash → flash-lite); general generation over a **Groq → OpenRouter provider chain**; **multi-key rotation** ("key farms"); failed models benched for a cooldown (120 s by default).
- **Correct failure labels:** a 413 "request too large" is raised as a size error, not a rate limit, so the pool isn't burned on an unfixable request, and callers split the input.
- Live progress over **Socket.io**. Job records and OpenAPI/Swagger docs. Pino structured logging. Two-stage **Docker** build.
- Talks to the Express backend through internal-token routes; the browser never calls the agent service directly (JWT proxy).

## Stack
Mastra (`@mastra/core`, `@mastra/memory`), TypeScript, Node.js 22, Google Gemini (`@google/genai`), Groq SDK, OpenRouter, Qdrant (vector DB) behind a custom Knowledge Base API, Zod, Hono, Socket.io, MySQL, Express backend, Python PPTX thumbnail server, YouTube Data API, VdoCipher, Docker, Vitest.

## Numbers
- Manual preparation: **5–8 h per course** → unattended pipeline (CV: **8+ h → 15 min**)
- Intermediate: single API call saved ~10 min; n8n brought it to 1–2 h
- `t-agent-master`: ~40k lines of TypeScript, **73 test files / 900+ test cases** (908 passing after the Oct 2026 redesign)

## CV bullets (ready to tailor)
- Architected a 9-stage multi-agent course-production pipeline on Mastra (Watcher → Enhancer → Librarian → Writer → Verifier → Builder → Thumbnails → Uploader → Inspector) that turns raw lesson videos into published YouTube/VdoCipher courses, cutting **8+ hours** of manual work to **15 minutes**.
- Built a RAG knowledge layer (Qdrant vector DB + custom Knowledge Base API) over exams, courses and past analyses that fact-checks and enriches agent output.
- Engineered production reliability: per-step retries, crash-resume and idempotent publishing, abort handling, Gemini/Groq/OpenRouter fallback chains with multi-key rotation and model cooldowns.
- Iterated from single API calls → n8n → a custom workflow engine → a multi-agent harness, guided by failure analysis at each step.
