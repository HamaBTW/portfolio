import { useState } from 'react'
import { About } from './components/About'
import { Certifications } from './components/Certifications'
import { CommandPalette } from './components/CommandPalette'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Grid } from './components/Grid'
import { Hero } from './components/Hero'
import { Intro, shouldPlayIntro } from './components/Intro'
import { Manifesto } from './components/Manifesto'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { ProjectDrawer } from './components/ProjectDrawer'
import { Recognition } from './components/Recognition'
import { Toaster } from './components/Toast'
import { Work } from './components/Work'

export default function App() {
  const [playIntro] = useState(shouldPlayIntro)
  const [ready, setReady] = useState(!playIntro)

  return (
    <>
      {playIntro && <Intro onDone={() => setReady(true)} />}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Manifesto />
        <Marquee />
        <Work />
        <Experience />
        <Certifications />
        <About />
        <Recognition />
        <Contact />
      </main>
      <Footer />
      <ProjectDrawer />
      <CommandPalette />
      <Toaster />
      <Grid />
      <div className="grain" aria-hidden />
    </>
  )
}
