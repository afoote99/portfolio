# Allan Foote — Portfolio

An interactive portfolio for AI/software projects. The signature feature is a
**Project Constellation** (built with React Flow): projects orbit the capabilities
they use — Claude, OpenAI, Vision, Voice, Realtime, Graph/Canvas — and hovering any
node traces the connections. Clicking a project opens a detail page.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**,
**React Flow (@xyflow/react)**, and **Framer Motion** — and developed with Claude Code.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Project content

All project data lives in [`src/lib/projects.ts`](src/lib/projects.ts) — edit that one
file to add/reorder projects, change copy, or wire up links. Detail pages and the
constellation are generated from it automatically.

### Adding a real screenshot

Drop a PNG into `public/shots/` and set the project's `shot` field, e.g.
`shot: "/shots/playbook.png"`. If a project has no `shot`, it shows a branded
gradient placeholder.

## Deploy (GitHub + Vercel)

1. **Create a GitHub repo** (empty, no README) at https://github.com/new — e.g. `portfolio`.
2. **Push** this folder:
   ```bash
   git remote add origin https://github.com/afoote99/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. **Import to Vercel:** go to https://vercel.com/new, pick the repo, and click
   **Deploy**. Next.js is auto-detected — no settings needed. You'll get a live
   `*.vercel.app` URL, and every future `git push` redeploys automatically.
4. (Optional) Add a custom domain in the Vercel project's **Domains** tab.

Once live, add the URL to the résumé header (see `../resume-build/gen-resume.js`,
the `PORTFOLIO_URL` constant) and regenerate.
