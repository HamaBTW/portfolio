// Single source of truth for all copy. See RULES.md #1.
// Images and CVs live in public/ (run `npm run images` after adding new PNG/JPGs).
const BASE = import.meta.env.BASE_URL

export const profile = {
  name: 'Mohamed Abidi',
  firstName: 'Mohamed',
  lastName: 'Abidi',
  role: 'Software engineer',
  // TODO: make this specific, e.g. "Looking for a final-year (PFE) internship — Feb 2027"
  availability: 'Open to internships & freelance',
  location: 'Tunis, Tunisia',
  timezone: 'Africa/Tunis',
  school: 'ESPRIT — Computer Science Engineering, ’27',
  headline:
    'I build software end to end — from AI pipelines that read threat reports to a learning platform students use every day.',
  bio: [
    'I’m a computer-science engineering student at ESPRIT and the founder of Tache-Lik, an education platform I’ve been building and running since 2023.',
    'I like problems that cross layers: a React front end talking to a Node back end, an LLM mapping messy reports to MITRE ATT&CK, a C game driven by an Arduino controller. I care about the part users actually touch — and the part they never see.',
  ],
  email: 'abidi.mohamed.business@gmail.com',
  coords: '36.81° N · 10.18° E',
  currently: 'Building Tache-Lik · Final years at ESPRIT',
  contactNote:
    'Internships, freelance work, or a question about one of my projects — my inbox is open and I read everything.',
  phone: '+216 99 290 230',
  phoneHref: 'tel:+21699290230',
  portrait: `${BASE}images/ma_about2.webp`,
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
  { value: '8', label: 'Shipped projects across web, mobile, desktop & games' },
  { value: '6', label: 'Languages used in production work' },
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
  cover: string
  links: Link[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'tache-lik',
    title: 'Tache-Lik',
    year: '2023 —',
    kind: 'EdTech platform',
    summary: 'The learning platform I founded to mentor students — real-time, video-first.',
    description:
      'Tache-Lik guides students through their academic journey with personalized learning paths, mentorship programs and a video library. I lead both the product vision and the engineering.',
    role: 'Founder & lead developer',
    highlights: [
      'Real-time features over Socket.io',
      'Video learning with structured paths',
      'JWT auth, containerised with Docker',
    ],
    stack: ['React 18', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'Socket.io', 'Docker'],
    cover: `${BASE}images/tache-lik-cover.webp`,
    links: [
      { label: 'Visit platform', href: 'https://www.tache-lik.tn' },
      { label: 'Watch demo', href: 'https://www.youtube.com/watch?v=Rcr87xV3MPs' },
    ],
    featured: true,
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
    links: [
      {
        label: 'Project post',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7457903745083957248/',
      },
    ],
    featured: true,
  },
  {
    id: 'loopii',
    title: 'Loopii Player',
    year: '2025',
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
    featured: true,
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
    featured: true,
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
    id: 'econet',
    title: 'EcoNet',
    year: '2024',
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
    id: 'spotipy',
    title: 'Spotipy',
    year: '2024',
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
    company: 'Adactim',
    logo: { src: `${BASE}logos/adactim.webp` },
    role: 'AI & Cybersecurity Intern',
    period: 'Jul — Sep 2025',
    place: 'Tunisia',
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
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C / C++', 'Dart', 'PHP'] },
  { group: 'Web', items: ['React', 'Node.js', 'Express', 'Flask', 'Symfony', 'Socket.io'] },
  { group: 'Mobile & desktop', items: ['Flutter', 'Riverpod', 'Qt / QML', 'JavaFX', 'Flet'] },
  { group: 'AI & security', items: ['LLM pipelines', 'MITRE ATT&CK', 'STIX 2.1', 'OpenCV', 'Ollama'] },
  { group: 'Data & ops', items: ['MySQL', 'Docker', 'Git', 'JWT / OAuth2'] },
  { group: 'Hardware', items: ['Arduino', 'RFID', 'SDL'] },
]

export const marquee = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Flutter', 'LLMs', 'MITRE ATT&CK',
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
