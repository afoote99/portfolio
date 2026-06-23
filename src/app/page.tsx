import Constellation from "@/components/Constellation";
import ProjectGrid from "@/components/ProjectGrid";
import {
  alsoBuilt,
  CATEGORY_COLORS,
  CAPABILITY_COLORS,
  type Capability,
} from "@/lib/projects";

const EMAIL = "afoote99@gmail.com";
const GITHUB = "https://github.com/afoote99";
const LINKEDIN = "https://www.linkedin.com/in/allan-foote";
const RESUME = "/Allan-Foote-Resume.pdf";

const caps = Object.keys(CAPABILITY_COLORS) as Capability[];

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="font-semibold tracking-tight text-ink">
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
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="aurora" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-20 sm:pt-28">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-brand2">
          AI Application Developer
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
          I build <span className="gradient-text">AI products</span>,
          <br className="hidden sm:block" /> end to end.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          I ship LLM applications with Claude and OpenAI — voice, vision, structured
          outputs, and agentic workflows — and turn fuzzy ideas into working software.
          Below is an interactive map of what I&apos;ve built.
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted/80">
          Most of these projects — and this site — were built with{" "}
          <span className="text-ink">Claude Code</span>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#constellation"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Explore the constellation
          </a>
          <a
            href="#work"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-panel"
          >
            See all projects
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
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
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-8 text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand2">
        {kicker}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-muted">{sub}</p>}
    </div>
  );
}

function AlsoBuilt() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <SectionHead
        kicker="And more"
        title="Also built"
        sub="A few of the stronger full-stack and mobile projects beyond the featured set."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {alsoBuilt.map((m) => (
          <div key={m.name} className="glass rounded-xl p-4">
            <div className="mb-2 flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: CATEGORY_COLORS[m.category] }}
              />
              <span className="font-semibold text-ink">{m.name}</span>
            </div>
            <p className="text-sm text-muted">{m.blurb}</p>
            <p className="mt-3 text-[11px] text-muted/70">{m.stack}</p>
          </div>
        ))}
      </div>
    </section>
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
            Résumé
          </a>
        </div>
        <p className="mt-2 text-xs text-muted/60">
          Designed & built by Allan Foote with Next.js, React Flow, and Claude Code.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />

      <section id="constellation" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead
          kicker="The map"
          title="Project Constellation"
          sub="Each glowing node is a project; dashed nodes are capabilities. Hover to trace the connections — click any project to dive in."
        />
        <div className="glass overflow-hidden rounded-2xl">
          <Constellation />
        </div>
        <Legend />
      </section>

      <section id="work" className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead
          kicker="Featured"
          title="Projects"
          sub="Seven I'm proudest of — five with live AI integration."
        />
        <ProjectGrid />
      </section>

      <AlsoBuilt />
      <Footer />
    </main>
  );
}
