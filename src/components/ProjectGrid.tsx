"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  projects,
  CATEGORY_COLORS,
  type Category,
  type Project,
} from "@/lib/projects";

const FILTERS: ("All" | Category)[] = ["All", "AI", "Full-Stack", "Interactive"];

function Chip({ text, color }: { text: string; color?: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
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

function Card({ p }: { p: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
    >
      <Link href={`/projects/${p.slug}`} className="group block h-full">
        <div
          className="glass flex h-full flex-col rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1"
          style={{ ["--tw" as string]: p.accent }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = `${p.accent}99`;
            (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px -12px ${p.accent}66`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "";
            (e.currentTarget as HTMLElement).style.boxShadow = "";
          }}
        >
          <div className="mb-3 flex items-center gap-1.5">
            {p.categories.map((c) => (
              <Chip key={c} text={c} color={CATEGORY_COLORS[c]} />
            ))}
          </div>

          <h3 className="text-lg font-semibold text-ink" style={{ color: p.accent }}>
            {p.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{p.tagline}</p>

          {p.aiStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.aiStack.map((a) => (
                <Chip key={a} text={a} color="#c084fc" />
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((s) => (
              <Chip key={s} text={s} />
            ))}
            {p.stack.length > 4 && <Chip text={`+${p.stack.length - 4}`} />}
          </div>

          <div className="mt-auto pt-4 text-sm font-medium text-muted transition-colors group-hover:text-ink">
            View project
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectGrid() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const shown =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-all"
              style={{
                color: active ? "#fff" : "var(--color-muted)",
                background: active ? "var(--color-brand)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${active ? "var(--color-brand)" : "var(--color-line)"}`,
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
