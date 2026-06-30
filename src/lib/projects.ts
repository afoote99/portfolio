export type Category = "AI" | "Full-Stack" | "Mobile" | "Interactive";

// Capability hubs used by the constellation graph
export type Capability =
  | "Claude"
  | "OpenAI"
  | "Voice"
  | "Vision"
  | "Realtime"
  | "Graph / Canvas";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  categories: Category[];
  caps: Capability[];
  stack: string[];
  aiStack: string[];
  accent: string; // hex used for the constellation node + detail accents
  problem: string;
  approach: string;
  aiArchitecture?: string;
  highlights: string[];
  links: ProjectLink[];
  shot?: string; // /shots/<file> when a screenshot is captured
}

export const CATEGORY_COLORS: Record<Category, string> = {
  AI: "#5a4ab8",
  "Full-Stack": "#2f6fb0",
  Mobile: "#2f9e7a",
  Interactive: "#c2613f",
};

export const CAPABILITY_COLORS: Record<Capability, string> = {
  Claude: "#7b4fb0",
  OpenAI: "#2f9e7a",
  Voice: "#d9577e",
  Vision: "#2f73c2",
  Realtime: "#d98a2b",
  "Graph / Canvas": "#c2613f",
};

export const projects: Project[] = [
  {
    slug: "kinaroo",
    name: "Kinaroo",
    tagline: "The journal you talk to that becomes your living story.",
    blurb:
      "A talk-first lifelong journal. You speak (about today, or a memory from decades ago) and it becomes a clear, faithful written story placed correctly on the timeline of your life.",
    categories: ["AI", "Full-Stack"],
    caps: ["Claude", "Voice"],
    stack: ["Next.js", "TypeScript", "Prisma", "SQLite → Postgres", "Tailwind", "Vercel"],
    aiStack: ["Claude Opus 4.8", "Structured Outputs", "Deepgram Nova-3"],
    accent: "#b5732a",
    problem:
      "Writing is the barrier to journaling, so people quit. And memories don't arrive in order; a story told today might have happened in the 1970s. Most tools can't tell the difference.",
    approach:
      "Talk-first capture: you speak, it transcribes, then an AI splits the telling into discrete stories and infers when each one actually happened, keeping both your verbatim voice and a clean, readable version forever.",
    aiArchitecture:
      "Claude Opus 4.8 runs structured-output extraction over each transcript: it segments a session into Story units and independently infers each story's real date (told-date vs. happened-date). When it's unsure, it asks a clarifying question instead of fabricating. Deepgram Nova-3 handles speech-to-text.",
    highlights: [
      "Told-date vs. happened-date temporal model, so stories land where they actually happened",
      "The AI organizes but never fabricates; it asks a clarifying question when unsure",
      "Keeps both the verbatim transcript and the cleaned story, forever",
      "Built for lifelong accumulation, not a one-year gift book",
      "Zero-API-key sample mode so anyone can try it instantly",
    ],
    links: [{ label: "Live site", href: "https://kinaroo.app" }],
  },
  {
    slug: "process-oracle",
    name: "Process Oracle",
    tagline: "Records how work actually gets done, and writes the docs for you.",
    blurb:
      "Records a user's real workflow (screen activity + inputs) and uses Claude's vision model to automatically generate step-by-step process documentation.",
    categories: ["AI"],
    caps: ["Claude", "Vision"],
    stack: ["Python", "FastAPI", "SQLite", "Anthropic SDK"],
    aiStack: ["Claude (vision)", "Multi-provider (Claude / OpenAI)"],
    accent: "#2f6fb0",
    problem:
      "Process documentation is tedious to write, instantly stale, and never matches how people really work, which makes onboarding and knowledge transfer painful.",
    approach:
      "Capture the real process once. The tool records screen activity and inputs, then a vision model interprets the captured sequence and writes ordered, human-readable steps automatically.",
    aiArchitecture:
      "Captured screenshots and input events are fed to Claude's vision model, which reasons over the sequence to produce ordered documentation. The provider layer is abstracted so it can run on Claude or OpenAI.",
    highlights: [
      "Screen + input capture pipeline",
      "Claude vision interprets real screens into ordered steps",
      "Auto-generated walkthroughs cut onboarding & knowledge-transfer time",
      "Provider-abstracted (Claude or OpenAI)",
    ],
    links: [{ label: "Demo video", href: "https://www.youtube.com/watch?v=oIacP79Er14" }],
  },
  {
    slug: "pulse",
    name: "Pulse",
    tagline: "Turns anonymous employee feedback into issues leaders can act on.",
    blurb:
      "An anonymous workplace-feedback platform that uses AI to cluster raw feedback into actionable issue cards, surfaced on a leadership analytics dashboard.",
    categories: ["AI", "Full-Stack"],
    caps: ["OpenAI", "Voice"],
    stack: ["React", "Vite", "Node / Express", "better-sqlite3", "Recharts", "Tailwind"],
    aiStack: ["GPT-4o-mini", "Deepgram (voice)"],
    accent: "#c0392b",
    problem:
      "Raw anonymous feedback is noisy and hard to act on. Leaders drown in comments and can't see the patterns underneath them.",
    approach:
      "Employees submit feedback by text or voice. AI clusters and synthesizes it into structured issue cards with severity and themes, shown on a leadership dashboard, with a keyword fallback when no API key is configured.",
    aiArchitecture:
      "GPT-4o-mini clusters and summarizes submissions into actionable issue cards; Deepgram transcribes voice feedback. A privacy-first design keeps every submission anonymous.",
    highlights: [
      "Anonymous-by-design submissions",
      "AI clustering into actionable issue cards",
      "Voice input via Deepgram transcription",
      "Leadership analytics dashboard (Recharts)",
      "Graceful offline keyword fallback",
    ],
    links: [],
  },
  {
    slug: "leaguecoach",
    name: "LeagueCoach",
    tagline: "A real-time AI coach that watches your game and talks you through it.",
    blurb:
      "Pulls live match data, reads the minimap with computer vision, sends the fused game state to Claude for strategy, and delivers advice as synthesized voice, in real time.",
    categories: ["AI"],
    caps: ["Claude", "Vision", "Voice", "Realtime"],
    stack: ["Python", "OpenCV", "edge-tts", "Riot Live Client API", "asyncio"],
    aiStack: ["Claude Sonnet 4.6", "OpenCV vision"],
    accent: "#6e4aa6",
    problem:
      "Improving at a fast real-time game needs in-the-moment strategic guidance, something post-game VOD review can't give you.",
    approach:
      "Fuse three live signals (Riot's API, the minimap via computer vision, and game state), send them to Claude for strategy, and speak the advice back to the player while they play.",
    aiArchitecture:
      "An async pipeline fuses Riot Live Client API data with OpenCV minimap template-matching. Claude Sonnet 4.6 turns the combined state into strategic advice, and edge-tts converts it to spoken audio in real time.",
    highlights: [
      "Real-time fusion of API data + computer vision",
      "OpenCV minimap template matching",
      "Claude Sonnet 4.6 strategy engine",
      "Voice delivery via text-to-speech",
      "Concurrent async Python pipeline",
    ],
    links: [],
  },
  {
    slug: "playbook",
    name: "Playbook",
    tagline: "A drag-and-drop football play designer with frame-by-frame animation.",
    blurb:
      "Coaches design plays by dragging players on a field, build frame-by-frame animations of post-snap movement, and share playbooks with staff and players.",
    categories: ["Interactive"],
    caps: ["Graph / Canvas"],
    stack: ["React 18", "TypeScript", "Konva", "Zustand", "Vite", "Tailwind"],
    aiStack: [],
    accent: "#2f8f4e",
    problem:
      "Coaches need a fast, visual way to design plays, show exactly how each player moves after the snap, and share them with the team.",
    approach:
      "A canvas-based designer: drag players into position, start from formation presets, build multi-frame animations, watch color-coded routes animate from snap to completion, then export or share.",
    highlights: [
      "Canvas drag-and-drop play design (Konva)",
      "Frame-by-frame post-snap animation",
      "Formation presets (I-Form, Shotgun, Spread, Pistol, Single Back)",
      "Color-coded route visualization by position group",
      "JSON export, shareable links, and a read-only player mode",
    ],
    links: [],
    shot: "/shots/playbook.png",
  },
  {
    slug: "tiko",
    name: "Tiko",
    tagline: "Turns Twitch clips into content ideas.",
    blurb:
      "Analyzes stream clips by transcribing them with Whisper and generating short-form content ideas with GPT-4. Dockerized and deployed.",
    categories: ["AI"],
    caps: ["OpenAI", "Voice"],
    stack: ["Python", "Flask", "MySQL", "Docker", "Gunicorn"],
    aiStack: ["OpenAI Whisper", "GPT-4"],
    accent: "#7a3fb0",
    problem:
      "Streamers sit on hours of clips but struggle to turn them into a steady stream of short-form content ideas.",
    approach:
      "Point it at clips; Whisper transcribes the audio, GPT-4 analyzes the transcript, and the app returns content ideas, served from a Dockerized Flask backend.",
    aiArchitecture:
      "OpenAI Whisper handles speech-to-text; GPT-4 generates content ideas from the transcript. Packaged with Docker + Gunicorn for deployment.",
    highlights: [
      "Whisper transcription pipeline",
      "GPT-4 content ideation",
      "Flask + MySQL backend",
      "Dockerized and deployed",
    ],
    links: [{ label: "GitHub", href: "https://github.com/afoote99/Tiko" }],
  },
  {
    slug: "wowstory",
    name: "WoWStory",
    tagline: "10,000+ quests as an explorable, spoiler-aware story graph.",
    blurb:
      "Parses game data into a quest graph, lays it out as a DAG with spoiler-aware fog-of-war, and uses Claude Haiku to generate per-quest and questline recaps.",
    categories: ["Interactive", "AI"],
    caps: ["Claude", "Graph / Canvas"],
    stack: ["React 18", "TypeScript", "Vite", "React Flow", "Dagre", "luaparse", "Tailwind"],
    aiStack: ["Claude Haiku"],
    accent: "#9c7a1e",
    problem:
      "MMO quest narratives are scattered across zones and full of spoilers. There's no way to see how storylines connect without spoiling what's ahead.",
    approach:
      "Parse the game's quest data into a graph, lay it out as a readable DAG, add spoiler-aware fog-of-war, and generate concise recaps so you can follow the story across zones.",
    aiArchitecture:
      "A build-time pipeline parses Questie Lua data into JSON, then Claude Haiku generates per-quest and questline recaps in bulk (a deliberately cost-effective model choice for thousands of entries), cached locally.",
    highlights: [
      "10,000+ quests across 119 zones (Classic + TBC)",
      "React Flow + Dagre directed-acyclic-graph layout",
      "Spoiler-aware fog-of-war state machine",
      "Lua → JSON data pipeline",
      "Claude Haiku bulk recap generation",
    ],
    links: [],
    shot: "/shots/wowstory.png",
  },
];

// Secondary projects shown as a compact strip (no detail pages)
export interface MiniProject {
  name: string;
  blurb: string;
  category: Category;
  stack: string;
}

export const alsoBuilt: MiniProject[] = [
  {
    name: "Bazaar",
    blurb: "A barter marketplace where people trade goods and services without money.",
    category: "Full-Stack",
    stack: "Next.js · Prisma · PostgreSQL · JWT",
  },
  {
    name: "BlooBoard",
    blurb: "A real-time collaborative whiteboard for team planning.",
    category: "Full-Stack",
    stack: "React · Express · MongoDB",
  },
  {
    name: "Rostrum",
    blurb: "A mobile 'Top 3' taste-graph app with weekly archived snapshots.",
    category: "Mobile",
    stack: "React Native · Expo · Supabase",
  },
  {
    name: "Veinna",
    blurb: "A containerized anonymous-feedback SaaS with moderation & rate limiting.",
    category: "Full-Stack",
    stack: "TypeScript · Express · Prisma · Docker",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
