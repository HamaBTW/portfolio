# T-Agent Course Content Builder: AI agent that writes interactive courses

> Part of the Tache-Lik platform. Built and owned by Mohamed Abidi (founder & lead developer).
> Sources: founder's description (Nov 2026) and the code in `tache-lik.tn-back-end-typescript`
> (`src/services/agentV3/`, `src/services/ai/fileAnalyzerV3/`, `src/services/mindMapChat.service.ts`, `src/services/ai/agentV2/`).

## One-line pitch
A Cursor-style AI agent inside Tache-Lik's drag-and-drop course editor. It reads every course file (PDFs, images, code), builds a mind map of the course, then writes, edits and checks the course's JSON blocks. Writing a course description went from **1–3 hours to under a minute**.

## Problem
Tache-Lik courses are more than videos. Each one has descriptions, files, math equations, code and simulations. First I built an **interactive course builder**: teachers drag and drop blocks, and each block is JSON. Filling those blocks by hand still took teachers and admins **1–3 hours per course**.

## Evolution (about 1.5 years of iteration, per founder; git history Dec 2025 → Nov 2026)
| Version | Dates (git) | Design | Result |
|---|---|---|---|
| AI helper | Dec 2025 | AI assistance inside the block editor (`courseEditorAi.service.ts`) | Helped, but the teacher still did the work |
| **v1 agent** | early 2026 | Agent that writes blocks by itself | Very slow, many mistakes |
| **v2 agent** | Jan → Apr 2026 | Planner → executor → verifier (`ai/agentV2/`) | Better, but many loops, high token use, still slow, still made mistakes |
| **v3 agent** | May 2026 → now | Multi-agent, map-reduce, deterministic validation (`agentV3/`, `fileAnalyzerV3/`) | **30–50 s max** per request, low token use, no mistakes reaching the editor |

## How v3 works
1. **File Analyser Master (mini agent).** The teacher uploads the course files (PDFs, images, code). Each file is analysed one by one with an LLM (Groq) to understand what it contains. Files are read from MinIO, linked back to their course, and the analysis is stored. It refuses to run until the course has a description, so analyses stay grounded.
2. **Mind Map Master (mini agent).** Takes the file analyses **plus what the videos say** (from the video-analysis AI of the T-Agent Pipeline). It links files to video content, groups them, orders them (theory → corrected exercises → uncorrected exercises → corrections → other → APP/project), and sorts the curriculum chronologically. It outputs a **mind map** the teacher can view.
   - **Mind-map chat:** the teacher can chat with the Mind Map Master over WebSocket to change the structure.
   - *Adding this layer made output consistency and file ordering much better.*
3. **T-Agent (course writer).** Calls tools to understand the course in **small chunks**. A *course manager* mini agent picks the course chunks, and the mind map picks the files. It also reads the JSON block rules. Then it writes the blocks.
4. **Verification gate.** Before answering, a **deterministic TypeScript `ValidationEngine`** checks every generated block in milliseconds, at **0 tokens**:
   - language rules (no English keywords like "Exercise" or "Theory" in French courses)
   - **hallucination check**: every referenced filename, image or PDF must exist in the database
   - block constraints (for example, no PDF inside an image or code block, which would crash the frontend)
   If anything fails, a **Fixer LLM** gets the exact error plus the faulty JSON and repairs it (up to 2 retries). The agent is forced back to fix the problem before it can answer.
5. **Emission.** The backend wraps valid blocks in the Socket.io `update_blocks` payload and the teacher sees them in the editor right away.

### Map-reduce design choices (v3)
- **Context shaping (map):** files injected as a strict list; mind map compressed to chapter and lesson titles; current blocks "shallow compressed" (long text and code cut to 200 characters).
- **Zero-tool generation:** the LLM writes the JSON block array directly instead of calling `update_editor_blocks`. This means faster time to first token and shorter outputs.
- **Pedagogical re-ordering in code:** theory PDFs → exercise PDFs → exercise code → extra PDFs → APP PDFs → APP code → checklist and boxed summary at the end.
- **Token use cut by more than 50%** compared with the monolithic tool loop (documented in `docs/V3_PIPELINE_WORKFLOW.md`).
- Model layer: Groq (`GroqMaster`, which lists live free-tier chat models and filters non-chat ones) with OpenRouter fallback.

## What the teacher can do (Cursor / Claude Code style)
- Ask it to write a whole course section from the uploaded files
- **Edit, delete, add or rephrase** blocks
- **Select a block** and ask about it or change it
- **Select a position** and have it insert new content there
- Run and preview the output in the editor right away

## Impact
- Course description and content writing: **1–3 hours → under 1 minute**
- v3 responses: **30–50 seconds max**, far fewer tokens than v1/v2, and file or format errors are caught before output

## Stack
TypeScript, Node.js, Express, TypeORM (MySQL), Socket.io, Groq SDK, OpenRouter, MinIO, React (block editor on tache-lik.tn).

## CV bullets (ready to tailor)
- Built a Cursor-style AI course-authoring agent (multi-agent: file analyser → mind-map planner → writer → deterministic validator → LLM fixer) that writes and edits JSON course blocks, cutting course write-up from **1–3 h to under 1 min**.
- Re-architected the agent from a recursive tool loop to a map-reduce pipeline with zero-tool generation and a 0-token TypeScript validation engine, reaching **30–50 s** responses and **>50% fewer tokens**.
- Designed a mind-map layer that links uploaded files to video content and orders them by teaching sequence, which made output consistency and file ordering much better.
