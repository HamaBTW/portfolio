import {
  AppWindow,
  Cloud,
  Languages,
  Atom,
  BrainCircuit,
  Code2,
  Database,
  FileJson,
  FileText,
  Gamepad2,
  GraduationCap,
  KeyRound,
  Layers,
  Mail,
  Music,
  Network,
  Nfc,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import {
  siArduino,
  siC,
  siCplusplus,
  siDart,
  siDocker,
  siExpress,
  siFacebook,
  siFlask,
  siFlutter,
  siGit,
  siGithub,
  siJavascript,
  siJsonwebtokens,
  siMysql,
  siNodedotjs,
  siOllama,
  siOpencv,
  siOpenjdk,
  siPhp,
  siPydantic,
  siPython,
  siQt,
  siReact,
  siSocketdotio,
  siSpotify,
  siStripe,
  siSymfony,
  siTypescript,
  siYoutube,
  siNvidia,
  siHedera,
  siExpo,
  siNextdotjs,
  siSolidity,
  siKotlin,
  siSwift,
  siMongodb,
  siPytorch,
  siSupabase,
  siGithubactions,
  siJetpackcompose,
  siEthereum,
  siGooglegemini,
  type SimpleIcon,
} from 'simple-icons'
import './TechIcon.css'

// LinkedIn's mark was removed from simple-icons for trademark reasons; this is the standard glyph.
const siLinkedin = {
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  hex: '0A66C2',
}

type Brand = Pick<SimpleIcon, 'path' | 'hex'>
type Entry = { brand: Brand } | { lucide: LucideIcon; hex?: string }

const b = (brand: Brand): Entry => ({ brand })
const l = (lucide: LucideIcon, hex?: string): Entry => ({ lucide, hex })

/** Label (lower-cased) → icon. Keys match the strings used in content.ts. */
const MAP: Record<string, Entry> = {
  typescript: b(siTypescript),
  javascript: b(siJavascript),
  python: b(siPython),
  java: b(siOpenjdk),
  javafx: b(siOpenjdk),
  'c / c++': b(siCplusplus),
  'c++': b(siCplusplus),
  c: b(siC),
  'c language': b(siC),
  'c / sdl': b(siC),
  dart: b(siDart),
  php: b(siPhp),
  react: b(siReact),
  'react 18': b(siReact),
  'node.js': b(siNodedotjs),
  express: b(siExpress),
  'express.js': b(siExpress),
  flask: b(siFlask),
  symfony: b(siSymfony),
  'socket.io': b(siSocketdotio),
  flutter: b(siFlutter),
  riverpod: l(Layers, '45D2B0'),
  'qt / qml': b(siQt),
  qt: b(siQt),
  qml: b(siQt),
  flet: l(AppWindow, 'A78BFA'),
  'llm pipelines': l(BrainCircuit, 'FF5A1F'),
  llms: l(BrainCircuit, 'FF5A1F'),
  'ai/ml': l(BrainCircuit, 'FF5A1F'),
  'mitre att&ck': l(ShieldCheck, 'E5484D'),
  'stix 2.1': l(FileJson, 'F5A524'),
  opencv: b(siOpencv),
  ollama: b(siOllama),
  mysql: b(siMysql),
  sql: l(Database, '4479A1'),
  hive: l(Database, 'FFB13B'),
  docker: b(siDocker),
  git: b(siGit),
  'jwt / oauth2': b(siJsonwebtokens),
  jwt: b(siJsonwebtokens),
  oauth2: l(KeyRound, 'EDEBE4'),
  'oauth 2.0': l(KeyRound, 'EDEBE4'),
  arduino: b(siArduino),
  rfid: l(Nfc, '7BD88F'),
  sdl: l(Gamepad2, '7DB3FF'),
  'sdl 1.2': l(Gamepad2, '7DB3FF'),
  physics: l(Atom, '7DB3FF'),
  networking: l(Network, '7DB3FF'),
  pydantic: b(siPydantic),
  beautifulsoup4: l(Code2, 'EDEBE4'),
  dio: l(Network, '45D2B0'),
  media_kit: l(Music, '1ED760'),
  'spotify api': b(siSpotify),
  stripe: b(siStripe),
  // added from LinkedIn (Nov 2026)
  'react native': b(siReact),
  'react 19': b(siReact),
  expo: b(siExpo),
  'next.js': b(siNextdotjs),
  supabase: b(siSupabase),
  i18n: l(Languages, '7DB3FF'),
  gemini: b(siGooglegemini),
  mongodb: b(siMongodb),
  hedera: b(siHedera),
  solidity: b(siSolidity),
  ethereum: b(siEthereum),
  kotlin: b(siKotlin),
  swift: b(siSwift),
  swiftui: b(siSwift),
  'jetpack compose': b(siJetpackcompose),
  pytorch: b(siPytorch),
  aws: l(Cloud, 'FF9900'),
  'github actions': b(siGithubactions),
  nvidia: b(siNvidia),
  // contact / links
  github: b(siGithub),
  linkedin: b(siLinkedin),
  facebook: b(siFacebook),
  youtube: b(siYoutube),
  'tache-lik': l(GraduationCap, 'FF5A1F'),
  email: l(Mail),
  phone: l(Phone),
  pdf: l(FileText),
}

/** Brand colours too dark to read on ink fall back to paper for the hover tint. */
function tint(hex?: string) {
  if (!hex) return 'var(--paper)'
  const n = parseInt(hex, 16)
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.35 ? 'var(--paper)' : `#${hex}`
}

export function hasIcon(name: string) {
  return name.toLowerCase() in MAP
}

/**
 * Monochrome tech/brand icon that inherits `currentColor`. Inside a `.has-tint` parent
 * it takes its brand colour on hover. Renders nothing for unknown labels.
 */
export function TechIcon({ name, size = 16, className = '' }: { name: string; size?: number; className?: string }) {
  const entry = MAP[name.toLowerCase()]
  if (!entry) return null
  const style = { ['--brand' as string]: tint('brand' in entry ? entry.brand.hex : entry.hex) }
  if ('brand' in entry)
    return (
      <svg
        className={`ticon ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        style={style}
      >
        <path d={entry.brand.path} />
      </svg>
    )
  const Icon = entry.lucide
  return <Icon className={`ticon ${className}`} size={size} strokeWidth={1.6} aria-hidden style={style} />
}
