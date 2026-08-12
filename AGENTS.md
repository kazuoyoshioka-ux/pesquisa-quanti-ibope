# AGENTS.md

Overview for AI agents and developers working on this codebase.

## Project overview

"Playbook Interativo — Pesquisa Quanti Adhoc" is a decision-tree wizard that
helps commercial (sales) teams scope quantitative market-research projects.
The user answers 12 sequential questions; the app applies conditional logic
along the way (e.g. skipping the "period" question unless the participant
needs to have bought/used/consumed something) and ends on a diagnosis screen
with a generated research briefing.

### Tech stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (file-based routing) |
| Frontend | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (utility classes only, no component library) |
| Icons | lucide-react |
| Language | TypeScript 5 (strict mode) |
| Deployment | Netlify |

There is no backend/database in this iteration — answers only need to
survive the browser session, so they're persisted to `sessionStorage`.

## Directory structure

```
src/
  playbook/
    types.ts       Answers shape + shared types (single source of truth for the model)
    config.ts       All option lists, tooltip copy, example chips — edit this file to
                    change questions/options without touching components
    state.ts        usePlaybookState() hook: view/step/answers state + sessionStorage sync
    diagnosis.ts     Pure functions that turn Answers into the on-screen diagnosis and
                    the plain-text briefing (buildDiagnosis, buildBriefingText)
  components/playbook/
    ui.tsx           Reusable atoms: OptionCard, BigChoiceCard, AlertBox, Tooltip, buttons...
    ProgressBar.tsx  Top progress bar + step dots ("Etapa N de 12")
    Intro.tsx        Landing screen
    Wizard.tsx       Renders all 12 steps (one big switch on `step`) and step-level
                    conditional logic (e.g. período only shown for certain behaviors)
    Diagnosis.tsx    Final diagnosis screen + "Gerar briefing" modal
  routes/
    index.tsx        Top-level state machine: intro → wizard → diagnosis
    admin.tsx         "Administração do Playbook" placeholder (no logic yet)
    __root.tsx        HTML shell, fonts, page title/meta
```

## Conventions / non-obvious decisions

- **Data-driven questions.** Every option list, tooltip, and example chip
  lives in `src/playbook/config.ts`. Adding a new option to an existing
  question is a one-line change there; adding a whole new step means adding
  a step block in `Wizard.tsx` (render) plus the fields it writes to
  `Answers` in `types.ts`.
- **`Wizard.tsx` is intentionally one file.** All 12 steps share the same
  progress bar, card styling and nav buttons, so keeping them together makes
  the shared conditional logic (skip period question, skip geography detail
  for "Brasil", etc.) easy to follow in one place rather than spread across
  12 files.
- **No sample size is ever computed automatically.** Per the product
  requirement, a user-entered sample size is only ever surfaced as
  "preliminary, pending methodological validation" — never presented as
  final. This logic lives in `diagnosis.ts`.
- **Session-only persistence.** Answers are kept in `sessionStorage` (see
  `src/playbook/state.ts`). There is no database yet; the code is
  structured so that swapping `usePlaybookState` for a server-backed
  version (Netlify DB + user login) later would not require changes to the
  `Wizard`/`Diagnosis` components — they only depend on the `Answers` shape
  and callback props.
- **`/admin` is a placeholder** ("Administração do Playbook") for a future
  screen where questions, options, decision rules, methodologies, alerts and
  briefing templates become editable. It has no logic today.
