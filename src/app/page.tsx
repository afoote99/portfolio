import Constellation from "@/components/Constellation";
import ProjectGrid from "@/components/ProjectGrid";
import { CAPABILITY_COLORS, type Capability } from "@/lib/projects";

const EMAIL = "afoote99@gmail.com";
const GITHUB = "https://github.com/afoote99";
const LINKEDIN = "https://www.linkedin.com/in/allan-foote";
const RESUME = "/Allan-Foote-Resume.pdf";

const caps = Object.keys(CAPABILITY_COLORS) as Capability[];

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="/" className="font-semibold tracking-tight text-ink">
          Allan&nbsp;Foote
        </a>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <a href="#work" className="hidden transition-colors hover:text-ink sm:inline">
            Work
          </a>
          <a href={GITHUB} target="_blank" className="transition-colors hover:text-ink">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" className="hidden transition-colors hover:text-ink sm:inline">
            LinkedIn
          </a>
          <a
            href={RESUME}
            target="_blank"
            className="rounded-full border border-brand/50 bg-brand/10 px-3.5 py-1.5 font-medium text-ink transition-colors hover:bg-brand/20"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}

function Legend() {
  return (
    <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
      <span className="font-medium text-ink/80">Capabilities:</span>
      {caps.map((c) => (
        <span key={c} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: CAPABILITY_COLORS[c] }}
          />
          {c}
        </span>
      ))}
    </div>
  );
}

function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-8 text-center">
      {kicker && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand2">
          {kicker}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-muted">{sub}</p>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-12 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Let&apos;s build something.</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href={`mailto:${EMAIL}`} className="text-brand2 hover:underline">
            {EMAIL}
          </a>
          <a href={GITHUB} target="_blank" className="text-muted hover:text-ink">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" className="text-muted hover:text-ink">
            LinkedIn
          </a>
          <a href={RESUME} target="_blank" className="text-muted hover:text-ink">
            Resume
          </a>
        </div>
        <p className="mt-2 text-xs text-muted/60">Built with Next.js and React Flow.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />

      <section id="map" className="relative overflow-hidden">
        <div className="aurora" />
        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-20">
          <SectionHead
            title="Project Map"
            sub="I build LLM-powered applications with voice, vision, structured outputs, and agentic workflows, turning fuzzy ideas into working software."
          />
          <div className="glass overflow-hidden rounded-2xl">
            <Constellation />
          </div>
          <Legend />
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead
          kicker="Featured"
          title="Projects"
          sub="Seven projects I'm proudest of, five with live AI integration."
        />
        <ProjectGrid />
      </section>

      <Footer />
    </main>
  );
}
