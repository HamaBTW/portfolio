// Single source of truth for all copy. See RULES.md #1.
// Images and CVs live in public/ (run `npm run images` after adding new PNG/JPGs).
const BASE = import.meta.env.BASE_URL

export const profile = {
  name: 'Mohamed Abidi',
  firstName: 'Mohamed',
  lastName: 'Abidi',
  role: 'Software engineer',
  // From the LinkedIn post (Nov 2026): looking for the final-year graduation internship (PFE)
  availability: 'Looking for a PFE internship · Jan 2027',
  location: 'Tunis, Tunisia',
  timezone: 'Africa/Tunis',
  school: 'ESPRIT — Computer Science Engineering, ’27',
  headline:
    'I build software end to end — from a React Native app shipped with 298 tests to AI pipelines that read threat reports, and a learning platform students use every day.',
  bio: [
    'I’m a computer-science engineering student at ESPRIT and the founder of Tache-Lik, an education platform I’ve been building and running since 2023.',
    'I like problems that cross layers: a React Native app that keeps working offline, an LLM mapping messy reports to MITRE ATT&CK, an AI command center that can call 144 business tools, a C game driven by an Arduino controller. I care about the part users actually touch — and the part they never see.',
    'Lately I’ve been going deeper on AI and cloud — NVIDIA deep-learning certifications, AWS Cloud Foundations — and on blockchain, with three Hedera certifications and a Solidity escrow prototype.',
  ],
  email: 'abidi.mohamed.business@gmail.com',
  coords: '36.81° N · 10.18° E',
  currently: 'Final year at ESPRIT · PFE from Jan 2027',
  contactNote:
    'Hiring for a final-year (PFE) internship starting January 2027, or have a project or question? My inbox is open and I read everything.',
  phone: '+216 99 290 230',
  phoneHref: 'tel:+21699290230',
  portrait: `${BASE}images/portrait.webp`,
  cv: {
    en: `${BASE}cv/Mohamed-Abidi-Resume-EN.pdf`,
    fr: `${BASE}cv/Mohamed-Abidi-Resume-FR.pdf`,
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/HamaBTW' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/med-abidi/' },
    { label: 'Tache-Lik', href: 'https://www.tache-lik.tn/' },
    { label: 'Facebook', href: 'https://www.facebook.com/Hama.BTW' },
  ],
}

// Manifesto: words wrapped in *asterisks* are highlighted; {tache-lik} / {adactim-cti} insert a project thumbnail.
export const manifesto =
  'I don’t stop at the interface. I like the *whole stack* — the pipeline {adactim-cti} nobody sees, the API that has to hold, and the screen {tache-lik} someone opens every day. I’ve been *shipping since 2023*, and I’m still the one who reads the error logs.'

export const facts = [
  { value: '2023', label: 'Founded Tache-Lik — still running it' },
  { value: '2×', label: '2nd place — Game Day & Bal des Projets 2023' },
  { value: '19', label: 'Projects across AI agents, web, mobile, desktop, blockchain & games' },
  { value: '7', label: 'Certifications — NVIDIA ×3, AWS, Hedera ×3' },
]

export type Link = { label: string; href: string }

export type Project = {
  id: string
  title: string
  year: string
  kind: string
  summary: string
  description: string
  role: string
  highlights: string[]
  stack: string[]
  /** screenshot; when missing, a typographic cover is generated from the title + stack */
  cover?: string
  /** project / product logo, shown next to the title in the case-study panel */
  logo?: Logo
  /** extra images shown in the case-study panel */
  gallery?: { src: string; alt: string }[]
  /** pipeline stages drawn on the generated cover (used when there's no screenshot) */
  flow?: string[]
  /** one-line outcome shown under the flow, e.g. "8+ h → 15 min" */
  flowResult?: string
  /** stages are independent modules, not a sequence: no arrows */
  flowPlain?: boolean
  links: Link[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'tache-lik',
    title: 'Tache-Lik',
    year: '2023 —',
    kind: 'EdTech startup',
    summary: 'The learning startup I founded in 2023 — and the AI agents and tools I built to run it.',
    description:
      'Tache-Lik is the startup I founded in 2023: a web platform that guides ESPRIT students through their academic journey with learning paths, mentorship and a video library. I lead both the product vision and the engineering. Around it I built the tools that run it: the T-Agent Pipeline that turns raw videos into published courses, the T-Agent Course Builder that writes course content, the Pipeline Editor chat agent, T-Hub to manage everything, T-Studio for video editing and T-Backup for backups — plus native phone apps (Tâche-Lik Mobile).',
    role: 'Founder & lead developer',
    highlights: [
      'An AI layer that cut course preparation from 8+ hours to 15 minutes',
      'Six in-house tools: 3 AI agents, an admin app, a video editor and a backup platform',
      'Real-time web platform (React, Node.js, Socket.io) containerised with Docker',
    ],
    stack: ['React 18', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Socket.io', 'Docker'],
    cover: `${BASE}images/tache-lik-cover.webp`,
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    gallery: [
      { src: `${BASE}images/projects/tache-lik/01.webp`, alt: 'tache-lik.tn home page: Your E-Learning Partner' },
      { src: `${BASE}images/projects/tache-lik/02.webp`, alt: 'Tache-Lik login screen on desktop' },
      { src: `${BASE}images/projects/tache-lik/03.webp`, alt: 'Classes page: academic categories carousel' },
      { src: `${BASE}images/projects/tache-lik/04.webp`, alt: 'Meetings calendar for live mentoring sessions' },
      { src: `${BASE}images/projects/tache-lik/05.webp`, alt: 'Tache-Lik login screen on a phone' },
      { src: `${BASE}images/projects/tache-lik/06.webp`, alt: 'Tache-Lik home page on a phone' },
    ],
    links: [
      { label: 'Visit platform', href: 'https://www.tache-lik.tn' },
      { label: 'Watch demo', href: 'https://www.youtube.com/watch?v=Rcr87xV3MPs' },
    ],
    featured: true,
  },
  {
    id: 't-agent-pipeline',
    title: 'T-Agent Pipeline',
    year: '2025–26',
    kind: 'AI · Multi-agent swarm',
    summary: 'A 9-agent swarm that turns raw lesson videos into published courses — 8+ hours of work down to 15 minutes.',
    description:
      'For every course a teacher uploaded, someone had to watch each video, write titles, descriptions and timecodes, make thumbnails and upload everything to the site, YouTube and VdoCipher: 5–8 hours per course. Now teachers drag and drop the videos and click Start. A swarm of agents watches every video, fact-checks it against Tache-Lik’s knowledge base, writes all the copy, renders the thumbnails, uploads everything and inspects the result. I got there in four steps: a single API call (saved 10 minutes), n8n (1–2 hours, but brittle), a custom workflow engine, and finally this multi-agent harness on Mastra.',
    role: 'Built and owned it — 182 of 183 commits',
    highlights: [
      'Watcher → Enhancer → Librarian → Writer → Verifier → Builder → Thumbnails → Uploader → Inspector',
      'RAG fact-checking over a Qdrant knowledge base (bge-m3) behind a custom Knowledge Base API',
      'Crash-resume, idempotent publishing, per-step retries, Gemini / Groq / OpenRouter fallback with key rotation',
      '~40k lines of TypeScript · 900+ tests (908 passing)',
    ],
    stack: ['Mastra', 'TypeScript', 'Gemini', 'Groq', 'Qdrant', 'YouTube API', 'Docker'],
    flow: ['Watcher', 'Enhancer', 'Librarian', 'Writer', 'Verifier', 'Builder', 'Thumbnails', 'Uploader', 'Inspector'],
    flowResult: '8+ h → 15 min per course',
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    links: [],
    featured: true,
  },
  {
    id: 't-agent-course-builder',
    title: 'T-Agent Course Builder',
    year: '2025–26',
    kind: 'AI · Authoring agent',
    summary: 'A Cursor-style agent inside the course editor — course write-up from 1–3 hours to under a minute.',
    description:
      'Tache-Lik courses are built from drag-and-drop JSON blocks: text, files, equations, code, simulations. Filling them by hand took 1–3 hours per course. This agent reads every course file, builds a mind map that links the files to what the videos say, then writes, edits and checks the blocks — teachers can select a block or a position and ask it to change or insert content. Version 3 replaced a slow tool-calling loop with a map-reduce pipeline and a deterministic validator.',
    role: 'Founder & lead developer — four versions in about a year',
    highlights: [
      'File analyser → mind-map planner → writer → 0-token TypeScript validator → LLM fixer',
      'Validator blocks hallucinated files, wrong-language labels and blocks that would crash the editor',
      '30–50 s per request and over 50% fewer tokens than the tool-loop version',
    ],
    stack: ['TypeScript', 'Node.js', 'Groq', 'OpenRouter', 'Socket.io', 'MySQL', 'MinIO'],
    flow: ['File analyser', 'Mind map', 'Writer', 'Validator', 'Fixer', 'Editor'],
    flowResult: '1–3 h → under 1 min',
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    links: [],
    featured: true,
  },
  {
    id: 't-agent-pipeline-editor',
    title: 'T-Agent Pipeline Editor',
    year: '2026',
    kind: 'AI · Guarded chat agent',
    summary: 'A chat agent that safely edits live published courses — with approvals, role gating and diffs.',
    description:
      'Once a course was published, changing one title or thumbnail meant updating YouTube, the site and every other copy by hand. This chat agent in T-Hub and the website can rename, reorder, re-upload, regenerate thumbnails and publish — and it understands side effects (rename a video, and its thumbnail needs regenerating, so it asks first). I wrote ADR-001 to re-architect it: the model stops choosing tools in a loop; code builds a compact course digest, a single tools-free router picks the intent, and every change becomes a typed command with an exact before → after diff.',
    role: 'Designed and built it, including the ADR-001 redesign',
    highlights: [
      'Every change shown as a before → after diff, fingerprinted with sha256, applied only after approval',
      'Hard budget per turn: 4 model calls, 8 tool calls, 60 s — no runaway loops',
      'Role gating, prompt-injection posture, anti-hallucination id check, golden eval set in CI',
    ],
    stack: ['Mastra', 'TypeScript', 'Groq', 'Zod', 'MySQL', 'Socket.io', 'Vitest'],
    flow: ['Course digest', 'Router', 'Typed command', 'Diff + sha256', 'Approval', 'Apply'],
    flowResult: '≤ 4 model calls per turn',
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    links: [],
    featured: true,
  },
  {
    id: 'anops',
    title: 'AnOps',
    year: '2026',
    kind: 'AI · SaaS platform',
    summary: 'AI-native business operations platform — an AI command center driving 144 tools.',
    description:
      'A multi-tenant platform that brings HR & payroll, finance, inventory, purchasing, manufacturing and marketing for SMEs into one workspace. I designed the overall architecture and design system, and built the AI Command Center: natural-language operations over Groq, OpenRouter and Gemini, with role checks, human-in-the-loop confirmation and audit logs. I also built the Inventory, Purchasing and Manufacturing modules.',
    role: 'Architecture, AI Command Center, 3 business modules — ESPRIT team project',
    highlights: [
      '144 registered AI tools and 135 module commands',
      'Human-in-the-loop confirmation, RBAC and audit logging for every AI action',
      'Multi-tenant isolation, Stripe subscriptions, PWA with light/dark themes',
    ],
    stack: ['Next.js', 'React 19', 'TypeScript', 'MongoDB', 'Gemini', 'Stripe', 'Docker'],
    cover: `${BASE}images/projects/anops/cover.webp`,
    logo: { src: `${BASE}logos/anops.webp`, fill: true },
    gallery: [
      { src: `${BASE}images/projects/anops/01.webp`, alt: 'AnOps: one platform, every operation — AI-powered business management' },
      { src: `${BASE}images/projects/anops/02.webp`, alt: 'AnOps AI Command Center: 144 tools, 135 commands, pending confirmations' },
      { src: `${BASE}images/projects/anops/03.webp`, alt: 'Inventory module: products, warehouses and stock levels' },
      { src: `${BASE}images/projects/anops/04.webp`, alt: 'Manufacturing module: bills of materials and work orders' },
      { src: `${BASE}images/projects/anops/05.webp`, alt: 'AnOps landing page' },
      { src: `${BASE}images/projects/anops/06.webp`, alt: 'Pricing: unlimited users, pay per application' },
      { src: `${BASE}images/projects/anops/07.webp`, alt: 'AnOps sign-in screen' },
      { src: `${BASE}images/projects/anops/08.webp`, alt: 'AnOps landing page on a phone' },
    ],
    links: [{ label: 'Visit AnOps', href: 'https://an-ops.vercel.app' }],
  },
  {
    id: 'adactim-cti',
    title: 'ADACTIM CTI',
    year: '2025',
    kind: 'AI × Cybersecurity',
    summary: 'Threat-intel platform that turns raw reports into MITRE ATT&CK mappings with LLMs.',
    description:
      'Built during my internship at Adactim. The platform automates the threat-intelligence lifecycle: it ingests feeds, has an LLM read unstructured reports, maps them to MITRE ATT&CK techniques with confidence scores, and exports STIX 2.1 for SIEM/SOAR tools.',
    role: 'AI & cybersecurity intern — sole developer',
    highlights: [
      'Ingestion pipelines for MISP, AlienVault OTX and tunCERT',
      'LLM mapping to MITRE ATT&CK with confidence scoring',
      'STIX 2.1 export + Flet desktop UI for analysts',
    ],
    stack: ['Python', 'Flask', 'Flet', 'Pydantic', 'BeautifulSoup4', 'LLMs', 'STIX 2.1'],
    cover: `${BASE}images/adactim_cti_cover.webp`,
    logo: { src: `${BASE}logos/adactim.webp` },
    links: [
      {
        label: 'Project post',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7457903745083957248/',
      },
    ],
  },
  {
    id: 't-studio',
    title: 'T-Studio',
    year: '2025–26',
    kind: 'Desktop · Rust',
    summary: 'Lesson videos ready to upload in one click — rewritten from Python to Rust: 1 GB → 60 MB, 30 min → 20 s.',
    description:
      'Teachers drop in lesson videos and get upload-ready files with AI voice cleaning, watermark, name tag, intro/outro and the right compression, on Windows and macOS. The Python version was a ~1 GB app that took 10–30 minutes for a 5-minute video, because it re-encoded each video up to four times and quietly fell back to the CPU. The Rust rewrite does one decode and one encode, detects the real hardware encoder, and runs the voice model natively. All Tache-Lik teachers use it.',
    role: 'Built both versions — Python prototype and Rust rewrite',
    highlights: [
      'App size ~1 GB → 60–70 MB; a 5-minute lesson 10–30 min → ~20 s',
      'Hardware encoder detection (NVENC, Quick Sync, AMF, VideoToolbox); VMAF tuning cut file sizes 30–50%',
      'AI voice chain: DeepFilterNet 3 in native Rust, Silero VAD, loudness normalised to −14 LUFS',
    ],
    stack: ['Rust', 'Tauri', 'Svelte', 'TypeScript', 'FFmpeg', 'Tailwind CSS'],
    flow: ['Drop videos', 'Denoise voice', 'Single-pass encode', 'Upload-ready'],
    flowResult: '1 GB → 60 MB · 30 min → 20 s',
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    links: [],
  },
  {
    id: 't-hub',
    title: 'T-Hub',
    year: '2025–26',
    kind: 'Admin app · Flutter',
    summary: 'The cross-platform app that runs Tache-Lik — users, courses, payments and the AI pipeline.',
    description:
      'T-Hub is the internal app admins, staff and teachers use to run Tache-Lik on Windows, macOS and Android: users and roles, courses and videos with an approval workflow, payments, gift cards, invoices, contracts, real-time notifications, a design-team studio — and control of the AI pipeline and its chat agent. New builds are triggered from a phone: GitHub Actions builds signed installers, the backend verifies and stores them, and users get an in-app update.',
    role: 'Main developer — 643 of 730 commits',
    highlights: [
      '~154k lines of Dart across 33 feature modules',
      'Clean architecture with BLoC, get_it and dio; real time over Socket.io; role-based access',
      'Phone-triggered release pipeline with signed Android / Windows / macOS builds and auto-update',
    ],
    stack: ['Flutter', 'Dart', 'Socket.io', 'Firebase', 'GitHub Actions', 'MinIO'],
    flow: ['Users', 'Courses', 'Payments', 'Contracts', 'AI pipeline', 'Releases'],
    flowResult: '154k lines · 33 modules',
    flowPlain: true,
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    links: [],
  },
  {
    id: 't-backup',
    title: 'T-Backup',
    year: '2026',
    kind: 'Infrastructure',
    summary: 'Self-hosted backups from any number of sources to any number of destinations — in production for months.',
    description:
      'I built T-Backup because no existing tool gave Tache-Lik the flexibility it needed: database, object-storage and vector-database sources, several destinations, and custom retention, all in one place. Each source gets its own schedule, every backup fans out to one or many destinations, and cleanup jobs enforce rules like "keep the last 10". It is self-hosted in Docker and has been running reliably in production for months.',
    role: 'Designed and built it',
    highlights: [
      'Sources: MySQL / MariaDB, PostgreSQL, MongoDB, MinIO, S3, Qdrant',
      'Destinations: MinIO, S3, Google Drive — each backup can go to several at once',
      'Per-source schedules and retention jobs',
    ],
    stack: ['Docker', 'MySQL', 'PostgreSQL', 'MongoDB', 'MinIO', 'Qdrant'],
    flow: ['Sources', 'Schedules', 'Fan-out', 'Destinations', 'Retention'],
    flowResult: 'N sources → N destinations',
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    links: [],
  },
  {
    id: 'tache-lik-mobile',
    title: 'Tâche-Lik Mobile',
    year: '2025–26',
    kind: 'Native iOS + Android',
    summary: 'The phone apps for my Tache-Lik startup — SwiftUI and Jetpack Compose, real-time, AI quizzes.',
    description:
      'The native phone apps for Tache-Lik, the learning startup I founded in 2023: iOS (SwiftUI) and Android (Kotlin + Jetpack Compose). Students get courses, quizzes, results, badges, leaderboards and real-time chat; AI generates quizzes and short reels. Teachers get course management and analytics. Built with MVVM, dependency injection and Socket.IO.',
    role: 'Team project under academic supervision',
    highlights: [
      'Same product on SwiftUI and Jetpack Compose',
      'AI-generated quizzes and reels',
      'Real-time messaging over Socket.IO, MVVM architecture',
    ],
    stack: ['Swift', 'Kotlin', 'Jetpack Compose', 'Socket.io'],
    cover: `${BASE}images/projects/tache-lik-mobile/cover.webp`,
    gallery: [{ src: `${BASE}images/projects/tache-lik-mobile/promo.webp`, alt: 'Tâche-Lik mobile app case study: learning companion, sign-in screen on iPhone' }],
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    links: [],
  },
  {
    id: 'clubedge-mobile',
    title: 'Clubedge Mobile',
    year: '2026',
    kind: 'Mobile · Internship',
    summary: 'Cross-platform club app built in 7 weeks — offline-first, 3 languages, 298 tests.',
    description:
      'During my internship at Clubedge I designed and built their cross-platform mobile app (iOS + Android) with React Native, Expo and strict TypeScript, then migrated the Meetings module from web to mobile: live video, chat, attendance, QR and deep-link join, host controls. A repository layer let the backend move from Supabase to Clubedge’s own APIs without touching a single screen.',
    role: 'Mobile developer intern — Scrum team, supervisor as product owner',
    highlights: [
      '20 screens, 29 components, 298 automated tests',
      'Offline mode with auto-sync (durable cache + persisted outbox)',
      '2FA, biometrics, English / French / Arabic with RTL',
      '155 of 195 commits, all merged through reviewed PRs · 5,700+ lines of docs',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'i18n'],
    cover: `${BASE}images/projects/clubedge-mobile/cover.webp`,
    logo: { src: `${BASE}logos/clubedge.webp`, fill: true },
    gallery: [
      { src: `${BASE}images/projects/clubedge-mobile/01.webp`, alt: 'Case study cover: building an industrial-grade mobile app in 7 weeks' },
      { src: `${BASE}images/projects/clubedge-mobile/02.webp`, alt: 'Key highlights: multi-language with RTL, offline mode, modern auth, backend migration' },
      { src: `${BASE}images/projects/clubedge-mobile/03.webp`, alt: 'Meetings module migration from web to React Native: 20 screens, 298 tests, 24k lines, 5,700+ lines of docs' },
      { src: `${BASE}images/projects/clubedge-mobile/04.webp`, alt: 'Architecture: UI layer, business logic, typed data layer, Clubedge API backend' },
    ],
    links: [{ label: 'Case study on LinkedIn', href: 'https://www.linkedin.com/in/med-abidi/details/experience/' }],
  },
  {
    id: 'farmy',
    title: 'Farmy Net',
    year: '2026',
    kind: 'AgriTech platform',
    summary: 'Ecosystem connecting farmers, investors, workers and buyers — mobile, web and AI.',
    description:
      'Farmy Net is our integrated mobile project at ESPRIT: a Flutter app, a React admin dashboard and a Node.js backend with AI assistance, Hedera blockchain verification and Stripe payments. It covers a marketplace, land investment and rental, workforce recruitment and task management, and FarmBox subscriptions.',
    role: 'Team Be.net (5 developers) — full-stack',
    highlights: [
      'Flutter mobile app + React dashboard + Node.js API',
      'Blockchain verification on Hedera, payments with Stripe',
      'Targets UN SDGs 2, 8, 9 and 12',
    ],
    stack: ['Flutter', 'React', 'Node.js', 'MySQL', 'Hedera', 'Stripe'],
    cover: `${BASE}images/farmy_cover.webp`,
    logo: { src: `${BASE}logos/farmy.webp` },
    gallery: [
      { src: `${BASE}images/projects/farmy/01.webp`, alt: 'Farmy app screens: land overview, marketplace, premium plots, investment analytics' },
      { src: `${BASE}images/projects/farmy/02.webp`, alt: 'Farmy mobile app cover art' },
      { src: `${BASE}images/projects/farmy/03.webp`, alt: 'Farmy flyer: agriculture solutions and main features' },
      { src: `${BASE}images/projects/farmy/04.webp`, alt: 'Farmy key features and technologies' },
    ],
    links: [{ label: 'Visit Farmy Net', href: 'https://www.farmynet.giize.com/' }],
  },
  {
    id: 'farmy-mini',
    title: 'Farmy Mini',
    year: '2026',
    kind: 'Blockchain prototype',
    summary: 'Farm-asset traceability with NFTs and a price-cap escrow on Ethereum.',
    description:
      'A blockchain prototype that traces farm assets from field to buyer. Land, machines and lots are NFTs (lots can be split), every custody transfer and check is recorded on-chain, and a price-cap escrow only releases the buyer’s FarmCoin if the sale respects the cap. A Next.js app signs transactions with MetaMask, or runs in a demo mode without a wallet. All assets and payments are simulated.',
    role: 'Duo project — contracts and web app',
    highlights: [
      '3 Solidity contracts: BatchRegistry, FarmCoin, PriceCapEscrow',
      '124 contract tests + 34 UI-logic tests passing',
      'Version 2 rebuilt after teacher review (NFTs, lot splitting, ETH-backed token)',
    ],
    stack: ['Solidity', 'Ethereum', 'Next.js', 'TypeScript'],
    cover: `${BASE}images/projects/farmy-mini/cover.webp`,
    gallery: [
      { src: `${BASE}images/projects/farmy-mini/01.webp`, alt: 'Farmy Mini: chain of custody for farm assets and price-cap escrow' },
      { src: `${BASE}images/projects/farmy-mini/02.webp`, alt: 'Asset registry on a Ganache chain and the ETH-backed price-cap escrow' },
      { src: `${BASE}images/projects/farmy-mini/03.webp`, alt: 'Splitting a harvest lot into smaller lots, with lineage and checkpoints' },
      { src: `${BASE}images/projects/farmy-mini/04.webp`, alt: 'From field to buyer: 124 contract tests and 34 UI tests passing' },
    ],
    links: [],
  },
  {
    id: 'loopii',
    title: 'Loopii Player',
    year: '2026',
    kind: 'Mobile app',
    summary: 'Offline-first Android music player: import Spotify playlists, listen anywhere.',
    description:
      'An offline-first Flutter app that imports Spotify playlists, finds the tracks and downloads them for playback without a connection. A background cache keeps anything you play available instantly next time.',
    role: 'Solo — design & development',
    highlights: [
      'Offline-first architecture with smart background caching',
      'Spotify playlist import and search',
      'Riverpod state, Hive storage, media_kit playback',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'Hive', 'Dio', 'media_kit', 'Spotify API'],
    cover: `${BASE}images/loopii_cover.webp`,
    links: [{ label: 'Try it', href: 'https://loopiiplayer.giize.com/' }],
  },
  {
    id: 'econet',
    title: 'EcoNet',
    year: '2024–25',
    kind: 'Web + desktop',
    summary: 'Environmental-impact platform: Symfony web app with a JavaFX desktop companion.',
    description:
      'EcoNet helps organisations and individuals track and reduce their environmental impact. A Symfony web app and a JavaFX desktop app share one MySQL backend, with AI features, forums, a marketplace, donations and face-recognition login.',
    role: 'Team project — full-stack',
    highlights: [
      'Two clients (web + desktop) on one backend',
      'OAuth2 and face-recognition auth',
      'Marketplace, donations and analytics',
    ],
    stack: ['Symfony', 'PHP', 'JavaFX', 'Java', 'MySQL', 'OAuth2'],
    cover: `${BASE}images/econet_cover.webp`,
    links: [{ label: 'Watch demo', href: 'https://www.youtube.com/watch?v=KewADLXuk7U' }],
  },
  {
    id: 'hireup',
    title: 'HireUp',
    year: '2024',
    kind: 'AI recruiting',
    summary: 'Recruitment platform with AI job matching, chatbot and face-recognition login.',
    description:
      'HireUp connects employers and candidates. It matches profiles to jobs, offers an AI assistant (Ollama), face-recognition sign-in with OpenCV, voice navigation, real-time messaging and Stripe payments.',
    role: 'Team project — full-stack',
    highlights: [
      'AI job matching + local LLM chatbot',
      'Face-recognition authentication',
      'Real-time messaging and Stripe payments',
    ],
    stack: ['PHP', 'MySQL', 'Python', 'OpenCV', 'Ollama', 'Stripe'],
    cover: `${BASE}images/hireup_cover.webp`,
    links: [
      { label: 'Source', href: 'https://github.com/HamaBTW/hireup' },
      { label: 'Watch demo', href: 'https://www.youtube.com/watch?v=VMWyU_d40Jo' },
    ],
  },
  {
    id: 'clothify',
    title: 'Clothify',
    year: '2023',
    kind: 'Desktop · IoT',
    summary: 'Qt/C++ waste-management system with Arduino RFID access control.',
    description:
      'A desktop system for waste-management operations — collection, staff, clients and fleet — written in Qt C++. Arduino-based RFID controls access; maps, notifications and automated reports run the day-to-day.',
    role: 'Team project — desktop & hardware',
    highlights: ['Arduino RFID access control', 'Mapping and real-time notifications', 'Analytics and automated reports'],
    stack: ['Qt', 'C++', 'QML', 'Arduino', 'RFID', 'SQL'],
    cover: `${BASE}images/clothify_cover.webp`,
    links: [
      { label: 'Source', href: 'https://github.com/HamaBTW/Clothify' },
      { label: 'Watch demo', href: 'https://www.youtube.com/watch?v=GDxTGyaTj8o' },
    ],
  },
  {
    id: 'tww',
    title: 'The World Within',
    year: '2023',
    kind: 'Game · Award',
    summary: '2D platformer in C/SDL — 2nd place at Game Day and Bal des Projets 2023.',
    description:
      'A side-scrolling adventure written in C with SDL 1.2: multiple levels, combat, puzzles, story — and a custom Arduino controller. It took 2nd place at both Game Day 2023 and Bal des Projets 2023 at ESPRIT.',
    role: 'Team project — gameplay & hardware integration',
    highlights: [
      '2nd place ×2 at ESPRIT competitions',
      'Hand-written physics and collision in C',
      'Arduino controller support',
    ],
    stack: ['C', 'SDL 1.2', 'Arduino', 'Physics'],
    cover: `${BASE}images/tww_cover.webp`,
    links: [
      { label: 'Watch gameplay', href: 'https://www.youtube.com/watch?v=jf0BkSjuGEM' },
      { label: 'More details', href: 'https://kanm.netlify.app' },
    ],
  },
  {
    id: 'spotipy',
    title: 'Spotipy',
    year: '2023',
    kind: 'Desktop + web',
    summary: 'Manage Spotify playlists and batch-download them, on desktop or the web.',
    description:
      'A Spotify companion suite with web and desktop interfaces: OAuth sign-in, playlist management, batch downloads with live progress, and themes.',
    role: 'Solo — design & development',
    highlights: ['OAuth 2.0 with Spotify', 'Batch downloads with live progress', 'Shared Python core for web + desktop'],
    stack: ['Python', 'Flask', 'Flet', 'Spotify API', 'OAuth 2.0'],
    cover: `${BASE}images/spotipy_cover.webp`,
    links: [{ label: 'Download', href: 'https://spotipy-app.netlify.app' }],
  },
]

/** Company logo for the experience badge. `fill` = already a full square icon; `wide` = landscape logo, less padding. */
export type Logo = { src: string; fill?: boolean; wide?: boolean }

export type Cert = {
  name: string
  issuer: 'NVIDIA' | 'AWS' | 'Hedera' | 'UIK'
  date: string
  /** what it proves, one line */
  note: string
  href: string
}

/** Licenses & certifications, newest first (from LinkedIn, Nov 2026). Links go to the issuer's verification page. */
export const certifications: Cert[] = [
  {
    name: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA',
    date: 'Nov 2026',
    note: 'Trained a fruit-freshness classifier with PyTorch + VGG16 transfer learning',
    href: 'https://learn.nvidia.com/certificates?id=D5BLEFOPQiKiSb0t3g1msw',
  },
  {
    name: 'Applications of AI for Predictive Maintenance',
    issuer: 'NVIDIA',
    date: 'Nov 2026',
    note: 'Deep learning for anomaly detection and failure prediction',
    href: 'https://learn.nvidia.com/certificates?id=_MIfNXnNQbW3O3E7dEhdYw',
  },
  {
    name: 'Generative AI with Diffusion Models',
    issuer: 'NVIDIA',
    date: 'Oct 2026',
    note: 'Building and controlling diffusion models for image generation',
    href: 'https://learn.nvidia.com/certificates?id=_QjTaHH7QeKlivk35ScCZA',
  },
  {
    name: 'AWS Academy Graduate — Cloud Foundations',
    issuer: 'AWS',
    date: 'Oct 2026',
    note: '20 hours on cloud fundamentals and core AWS services',
    href: 'https://www.credly.com/badges/9800112e-8368-42e8-8d2d-0b4178b82ab3/public_url',
  },
  {
    name: 'Hedera Certified Developer Associate',
    issuer: 'Hedera',
    date: 'Oct 2026',
    note: 'HTS, HCS, EVM smart contracts, wallets and APIs on Hedera',
    href: 'https://certs.hashgraphdev.com/6cdf30eb-e597-4647-9aa3-3fc5ddbf94ad.pdf',
  },
  {
    name: 'Hedera Business Foundation',
    issuer: 'Hedera',
    date: 'Oct 2026',
    note: 'DLT, tokenization and enterprise Web3 use cases',
    href: 'https://certs.hashgraphdev.com/20b49d77-4263-4776-acea-be06cb7e3d7d.pdf',
  },
  {
    name: 'Hedera Certified Foundation',
    issuer: 'Hedera',
    date: 'Oct 2026',
    note: 'Hedera network architecture and core concepts',
    href: 'https://certs.hashgraphdev.com/8ab4a946-9138-469a-987b-d92d0c8ad784.pdf',
  },
]

export type Job = {
  logo?: Logo
  company: string
  role: string
  period: string
  place: string
  summary: string
  stack: string[]
}

export const experience: Job[] = [
  {
    company: 'Clubedge',
    logo: { src: `${BASE}logos/clubedge.webp`, fill: true },
    role: 'Mobile Developer Intern (React Native)',
    period: 'Jun — Aug 2026',
    place: 'Monastir · Remote',
    summary:
      'Built Clubedge’s cross-platform mobile app in a 7-week Scrum internship and migrated the Meetings module from web to mobile (live video, chat, attendance, QR join). Offline mode with auto-sync, 2FA and biometrics, three languages with RTL — 20 screens and 298 automated tests, every commit merged through a reviewed PR.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
  },
  {
    company: 'Adactim',
    logo: { src: `${BASE}logos/adactim.webp` },
    role: 'AI & Cybersecurity Intern',
    period: 'Jul — Sep 2025',
    place: 'Remote',
    summary:
      'Built a full-stack Cyber Threat Intelligence platform alone: feed ingestion (MISP, OTX, tunCERT), LLM-based MITRE ATT&CK mapping with confidence scores, STIX 2.1 export and a desktop UI for analysts.',
    stack: ['Python', 'Flask', 'Flet', 'LLMs', 'STIX 2.1'],
  },
  {
    company: 'Jameela',
    logo: { src: `${BASE}logos/jameela.webp`, fill: true },
    role: 'Flutter Developer · Freelance',
    period: 'Dec 2024',
    place: 'Remote',
    summary:
      'Designed and built the front end of the Jameela cross-platform mobile app — responsive components, smooth interactions, delivered in under two weeks.',
    stack: ['Flutter', 'Dart'],
  },
  {
    company: 'Tache-Lik',
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    role: 'Founder & Lead Developer',
    period: '2023 — Now',
    place: 'Tunisia',
    summary:
      'Founded an education platform that guides and mentors students. I own the product direction and the full technical stack.',
    stack: ['React', 'Node.js', 'MySQL', 'Socket.io'],
  },
  {
    company: 'Tunisie Telecom',
    logo: { src: `${BASE}logos/tunisie-telecom.webp`, wide: true },
    role: 'Technical Intern',
    period: 'Jun — Jul 2023',
    place: 'Tunisia',
    summary:
      'Worked on enterprise telecom infrastructure — network architecture, connectivity solutions and protocols in production.',
    stack: ['Networking'],
  },
]

export type School = {
  school: string
  degree: string
  place: string
  period: string
  logo?: Logo
  /** ISO months ('YYYY-MM'); when both are set the card shows a live progress bar */
  start?: string
  end?: string
}

export const education: School[] = [
  {
    school: 'ESPRIT',
    degree: 'Engineering degree, Computer Science',
    place: 'Ariana, Tunisia',
    period: '2022 — 2027',
    logo: { src: `${BASE}logos/esprit.webp`, wide: true },
    start: '2022-09',
    end: '2027-06',
  },
  {
    school: 'Lycée Cité Errafaha',
    degree: 'Baccalaureate, Computer Science',
    place: 'Ariana, Tunisia',
    period: '2022',
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Java', 'Kotlin', 'Swift', 'C / C++', 'Dart', 'PHP'] },
  { group: 'Web', items: ['React', 'Next.js', 'Node.js', 'Express', 'Flask', 'Symfony', 'Socket.io'] },
  { group: 'Mobile & desktop', items: ['React Native', 'Expo', 'Flutter', 'Tauri', 'SwiftUI', 'Jetpack Compose', 'Qt / QML', 'JavaFX'] },
  { group: 'AI & agents', items: ['Mastra', 'LLM pipelines', 'Qdrant', 'Gemini', 'Groq', 'PyTorch', 'MITRE ATT&CK', 'STIX 2.1'] },
  { group: 'Cloud, data & ops', items: ['AWS', 'MySQL', 'PostgreSQL', 'MongoDB', 'MinIO', 'Docker', 'GitHub Actions', 'FFmpeg'] },
  { group: 'Blockchain', items: ['Hedera', 'Solidity', 'Ethereum'] },
  { group: 'Hardware', items: ['Arduino', 'RFID', 'SDL'] },
]

export const marquee = [
  'Mastra', 'React Native', 'TypeScript', 'Rust', 'Qdrant', 'Next.js', 'Python', 'Flutter', 'LLMs', 'PyTorch', 'AWS', 'Hedera',
  'Docker', 'Socket.io', 'C / SDL', 'Arduino', 'Qt', 'Symfony', 'STIX 2.1',
]

export const recognition: { source: string; title: string; text: string; logo?: Logo }[] = [
  {
    source: 'ESPRIT University',
    logo: { src: `${BASE}logos/esprit.webp`, wide: true },
    title: '2nd place — best video game',
    text: 'The World Within placed second at both Game Day 2023 and Bal des Projets 2023 for game design and development.',
  },
  {
    source: 'Tache-Lik students',
    logo: { src: `${BASE}logos/tache-lik.webp`, fill: true },
    title: 'Educational platform',
    text: 'A platform that changed how we approach learning and collaboration — the tools to learn, build and grow.',
  },
  {
    source: 'Jameela App',
    logo: { src: `${BASE}logos/jameela.webp`, fill: true },
    title: 'Freelance client',
    text: 'The result met our expectations and went beyond them in creativity and technical execution.',
  },
]
