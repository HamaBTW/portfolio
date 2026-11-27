# T-Agent Pipeline Editor: guarded chat agent that controls the whole pipeline

> Part of the Tache-Lik platform. Built by Mohamed Abidi.
> Sources: founder's description (Nov 2026), `t-agent-master/src/mastra/agents/t-agent-pipeline` (v1),
> `t-agent-pipeline-v2` (v2) and the docs `ADR-001 T-Agent Redesign.md`, `T-AGENT-PIPELINE-V2-*.md` (Oct 2026).

## One-line pitch
A chat agent in T-Hub and the website that controls the published course pipeline. It can re-upload videos, regenerate thumbnails, rename, reorder and publish. It understands side effects (rename a video → its thumbnail needs regenerating, so it asks first). It has strict guardrails: role gating, human approval for every change, and no data leaks. It is fast and token-efficient.

## Problem
After the T-Agent Pipeline published a course, changing one video title or thumbnail meant updating the YouTube version, the site version and every other copy **by hand**.

## What it can do
- Re-upload a video, delete a video, start a full publish run
- Generate new thumbnails and push them to YouTube/VdoCipher
- Change titles, descriptions, thumbnail text and video order (including pattern find-and-replace with preview → confirm → apply)
- Update the live YouTube playlist (free courses) or the VdoCipher folder (paid courses)
- Run the Inspector, read the report, auto-fix, then re-run it (verify-and-fix loop)
- Restart the full course wizard (watch → librarian → writer → builder → thumbnails → inspector) as a background run that never auto-publishes
- Answer questions: pipeline status, publish status per video, writer and builder output
- **Knows dependencies:** a reorder or rename triggers a proposal to regenerate thumbnails, and it asks before doing it

## v1: plan-once executor (Sep 2026)
- **One LLM call classifies** the request into a typed plan `{intent, reply, steps[]}` (Zod-validated, bounded retries, 30 s timeout). The engine then executes it **deterministically**. There are no LLM tool loops.
- **30 typed tools** in a fixed enum: 12 read, 3 safe write, 9 execute, plus 6 destructive edit tools.
- **Repair layer:** fuzzy-maps prose tool names ("run inspector again") onto the legal enum before validation.
- **Deterministic intent:** code re-derives the intent from the actual steps, so a status question can never surface as "publish".
- Plans are capped at **8 steps**. Abort-aware at every stage. Optional continuation pass for read → write flows. MySQL conversation memory.

## v2: context-first, typed-intent redesign (ADR-001, Oct 2026)
Root cause found: *the model was choosing tools repeatedly from inside a loop.* (Real failure: "list all video titles" ran `course_memory.search` 3× and hit `maxIterations`.) Decision: **the model stops choosing tools; code does.**
- **Course digest (code-built):** a compact view of the whole course (chapters; every video's order, id and title; publish, pipeline and quality state), capped at **2,000 tokens** (about a quarter of the 8k request ceiling). It degrades to per-chapter counts for huge courses, is versioned by sha256, cached for 60 s, and the cache is cleared on writes.
- **Router:** **one tools-free call** → one of 5 intents (`answer | retrieve | change | playbook | clarify`) and a closed set of **7 readers**. Malformed replies fail closed to `clarify`.
- **Answer call has no tools.** Course facts are passed as quoted data. An **anti-hallucination gate** (`verifyCitedVideoIds`) flags any cited video id that isn't in the digest.
- **Writes = typed commands** (`rename | delete | regenerate | publish | reorder`). Code resolves them against the digest, builds an exact **before → after diff** and **fingerprints the whole pack with sha256**. Approval is all-or-nothing against that hash, and the approved script runs exactly as reviewed and stops at the first failure.
- **Hard budget per turn:** 4 model calls / 8 tool calls / 60 s. Every exit path writes a terminal task status (no hangs, no partial state).
- **Observability:** per-turn traces (digest version, route, retrievals, tokens, latency, flagged ids) plus a **golden eval set** of real teacher questions replayed in CI.
- Legacy loop kept only as a feature-flagged escalation tier (switch off without a deploy).
- **Evidence:** 9 new test suites, full suite **908 passing**, `tsc` clean. Live end-to-end: listed all 17 titles of a real course, rename → approval → applied → restored verbatim.

## Guardrails (security)
- **Role gating:** teachers are hard-blocked from destructive tools. Admin destructive tools need explicit `approved: true`. Every destructive executor re-checks role and approval itself (defense in depth).
- **Approval previews:** scope-aware before → after change previews in the UI's approval bubble. Execution stops at the first step that needs approval.
- **Prompt-injection posture** (OWASP LLM Top 10 / NIST framing): course content and titles are treated as data, not instructions. The call that reads bulk text cannot issue commands. No model call is given a write-capable tool. The model never reveals its system prompt, secrets or backend URLs, and never fabricates tool results.
- **Token efficiency:** free-tier models (gpt-oss-120b class) on Groq with a **27-key pool** (~216k tokens/min of throughput). A request shaper enforces the per-request ceiling at the gateway without dropping or reordering messages. Results are shaped into core/detail/bulk tiers and chunked, never truncated, so a 120-video course never reports 20.

## Stack
Mastra, TypeScript, Groq (gpt-oss-120b and peers), OpenRouter, Zod, MySQL (threads, durable task state, traces), Server-Sent Events / Socket.io to the chat drawer, Express backend, YouTube Data API, VdoCipher, Vitest.

## CV bullets (ready to tailor)
- Built a guarded chat agent that operates a live course-publishing pipeline (re-upload, rename, reorder, thumbnails, publish) with role gating, human-in-the-loop approvals and sha256-fingerprinted change packs.
- Wrote ADR-001 and re-architected the agent from a tool-choosing loop to a context-first, typed-intent design (2k-token course digest, single tools-free router, code-built diffs), bounding every turn to **4 model calls** and removing tool loops.
- Added an anti-hallucination id gate, per-turn traces and a golden eval set run in CI (**908 tests passing**).
