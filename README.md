# Playbook Interativo — Pesquisa Quanti Adhoc

An interactive decision-tree wizard that helps commercial teams scope
quantitative market-research projects without needing a research
background. The user walks through 12 short questions with conditional
branching, and gets a preliminary project diagnosis plus a research briefing
they can copy and hand to the research team.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (file-based routing) + React 19
- Vite 7
- Tailwind CSS 4
- lucide-react icons
- TypeScript (strict)

No database is used: answers are kept in the browser's `sessionStorage` for
the duration of the session (see `src/playbook/state.ts`).

## Running locally

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

To preview through the Netlify CLI (with edge/functions emulation):

```bash
netlify dev
```

## Project structure

See [AGENTS.md](./AGENTS.md) for a full breakdown of the directory
structure and the reasoning behind key decisions (data-driven question
config, no automatic sample-size calculation, session-only persistence).
