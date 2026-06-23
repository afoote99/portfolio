import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject, CATEGORY_COLORS } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project — Allan Foote" };
  return { title: `${p.name} — Allan Foote`, description: p.blurb };
}

function Chip({ text, color }: { text: string; color?: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-medium"
      style={{
        color: color ?? "var(--color-muted)",
        background: color ? `${color}1a` : "rgba(255,255,255,0.04)",
        border: `1px solid ${color ? `${color}40` : "var(--color-line)"}`,
      }}
    >
      {text}
    </span>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand2">
        {title}
      </h2>
      <div className="text-[15px] leading-relaxed text-ink/90">{children}</div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <main className="relative">
      <div className="aurora opacity-60" />
      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-10">
        <Link
          href="/#work"
          className="text-sm text-muted transition-colors hover:text-ink"
        >
          ← All projects
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {p.categories.map((c) => (
            <Chip key={c} text={c} color={CATEGORY_COLORS[c]} />
          ))}
        </div>

        <h1
          className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ color: p.accent }}
        >
          {p.name}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{p.tagline}</p>

        {p.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-3">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                className="rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  color: "#fff",
                  background: p.accent,
                }}
              >
                {l.label} →
              </a>
            ))}
          </div>
        )}

        {/* Screenshot / hero visual */}
        <div
          className="mt-9 overflow-hidden rounded-2xl border border-line"
          style={{ aspectRatio: "16 / 9" }}
        >
          {p.shot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.shot}
              alt={`${p.name} screenshot`}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 20%, ${p.accent}33, transparent 60%), linear-gradient(160deg, #12121c, #0b0b12)`,
              }}
            >
              <span className="text-5xl font-bold tracking-tight" style={{ color: `${p.accent}cc` }}>
                {p.name}
              </span>
            </div>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <Block title="The problem">{p.problem}</Block>
            <Block title="The approach">{p.approach}</Block>
            {p.aiArchitecture && <Block title="AI architecture">{p.aiArchitecture}</Block>}
            <Block title="Highlights">
              <ul className="space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span style={{ color: p.accent }}>▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <aside className="space-y-6">
            {p.aiStack.length > 0 && (
              <div className="glass rounded-xl p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand2">
                  AI / LLM
                </h3>
                <div className="flex flex-wrap gap-2">
                  {p.aiStack.map((a) => (
                    <Chip key={a} text={a} color="#c084fc" />
                  ))}
                </div>
              </div>
            )}
            <div className="glass rounded-xl p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand2">
                Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Chip key={s} text={s} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
