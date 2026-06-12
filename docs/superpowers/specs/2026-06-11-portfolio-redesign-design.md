# Portfolio Redesign — Design Spec
**Date:** 2026-06-11 (updated 2026-06-12)
**Reference:** [johnthedesigner.com](https://www.johnthedesigner.com/)

---

## Overview

Redesign giufalcao.github.io from a single-page résumé-style portfolio into a case-study-driven portfolio with narrative project pages, inspired by johnthedesigner.com. The core shift: from listing skills and experience to telling the story of each project.

---

## Site Architecture

Flat navigation — no separate /work list page. Home links directly to individual case study pages.

```
/ (home)
├── /work/localization-eval
├── /work/adaptive-persona
├── /work/pharma-recommendation
├── /work/tucana-care
├── /work/voto-explicado
└── /work/voteview-brasil
```

Tech stack: **Astro + Tailwind CSS**. Case study pages use Astro's file-based routing under `src/pages/work/`. No Astro Content Collections — each page is a self-contained `.astro` file with its own content.

---

## Theme

**Light theme throughout.** White backgrounds, charcoal headings, serif body text.

| Token | Value |
|-------|-------|
| Background | `#ffffff` |
| Heading | `#0f172a` |
| Body text | `#1e293b` |
| Muted text | `#64748b` |
| Very muted | `#94a3b8` |
| Border | `#e2e8f0` |
| Panel bg | `#f8fafc` |
| Body font | Georgia, serif |
| UI font | system-ui, sans-serif |
| Mono font | monospace |

Per-project accent colors:

| Project | Accent |
|---------|--------|
| Localization | `#14b8a6` |
| Adaptive Persona | `#8b5cf6` |
| Pharma | `#3b82f6` |
| Tucana Care | `#f43f5e` |
| Voto Explicado | `#22c55e` |
| VoteView Brasil | `#f97316` |

---

## Page 1 — Home (`/`)

### Navigation
```
Giulia Falcão                  [LinkedIn]  [GitHub]
```
- Name links to `/`
- LinkedIn: `linkedin.com/in/giulia-cavalcanti`
- GitHub: `github.com/giufalcao`

### Hero
- **h1:** `Giulia Falcão`
- **Role label:** `Machine Learning Engineer` (monospace, uppercase, muted)
- **Bio:** "Machine Learning Engineer at ReflexAI. I build evaluation systems for LLMs and, occasionally, products I want to exist in the world."

### Case Studies section
Label: `Case Studies` (monospace, uppercase, very muted)

List layout, newest first. Each item: 3px left accent bar + body (type label, title, one-line desc) + hover arrow.

| # | Type label | Title | Accent |
|---|-----------|-------|--------|
| 1 | ReflexAI · AI Evaluation | Localization Quality Framework | teal |
| 2 | ReflexAI · AI Systems | Adaptive Persona Behavior | purple |
| 3 | Thoughtworks · Senior Data Scientist | Pharmaceutical Recommendation System | blue |

### Personal Projects section
Label: `Personal Projects` (monospace, uppercase, very muted)

Same list layout.

| # | Type label | Title | Accent |
|---|-----------|-------|--------|
| 1 | Healthcare · Pre-launch | Tucana Care | rose |
| 2 | Civic Tech · Live | Voto Explicado | green |
| 3 | Data Science · Analysis | VoteView Brasil | orange |

### Footer
Name + LinkedIn + GitHub + Email (`thegiuliacavalcanti@gmail.com`)

---

## Page 2 — Case Study / Project (`/work/[slug]`)

Consistent structure across all 6 pages:

```
[Case Study / Personal Project] · [Context]   ← accent-colored label
[Project Title]                               ← h1
[One-sentence hook]                           ← subtitle

Role | Stack | Status/Outcome               ← meta row

TL;DR                                        ← left accent-bordered callout

── 01  The Challenge ──
── 02  Architecture ──    (Mermaid diagram)
── 03  The Work ──        (2–3 acts with result callouts)
── 04  What Made It Work ── (3 numbered principles)

Next Project →                               ← navigation to next slug
```

### Navigation chain (in order)
1. Localization → Adaptive Persona
2. Adaptive Persona → Pharma
3. Pharma → Tucana Care
4. Tucana Care → Voto Explicado
5. Voto Explicado → VoteView Brasil
6. VoteView Brasil → "Back to work" (home)

### Mermaid diagrams
All diagrams use `theme: 'neutral'` with light `themeVariables`. Pre-rendered in-browser via CDN for HTML mockups; at build time via `@mermaid-js/mermaid-cli` for Astro.

---

## Content — Case Studies

### 1. Localization Quality Framework
**Context:** ReflexAI · AI Evaluation
**Role:** Machine Learning Engineer
**Stack:** Python, LLM meta-judges, BLEU/METEOR/chrF, human calibration pipeline, 6 languages
**Accent:** `#14b8a6`

**Reference HTML:** `.superpowers/brainstorm/8631-1781228877/content/localization-eval.html`

---

### 2. Adaptive Persona Behavior
**Context:** ReflexAI · AI Systems
**Role:** Machine Learning Engineer
**Stack:** Gemini 2.5 Flash, LangGraph, LangChain, NestJS, GCP
**Accent:** `#8b5cf6`

**Reference HTML:** `.superpowers/brainstorm/8631-1781228877/content/adaptive-persona.html`

---

### 3. Pharmaceutical Recommendation System
**Context:** Thoughtworks · Senior Data Scientist
**Role:** Senior Data Scientist
**Stack:** Databricks, PySpark, MLflow, XGBoost, AWS S3
**Metrics:** $16,380 → $312 per run · 79% runtime cut · 8xl → 4xl cluster
**Accent:** `#3b82f6`

**Reference HTML:** `.superpowers/brainstorm/8631-1781228877/content/pharma-v2.html`

---

## Content — Personal Projects

### 4. Tucana Care
**Context:** Healthcare · Pre-launch
**Role:** Solo · Full-Stack
**Stack:** React, TypeScript, Supabase, Deno Edge Functions, OpenAI, Evolution API v2
**Status:** Pre-launch · 261 unit tests
**Accent:** `#f43f5e`

Exposure constraint: no specific function names, no internal auth patterns. Architecture exposed at concept level only (serverless Edge Functions, urgency classification, Realtime push).

**Reference HTML:** `.superpowers/brainstorm/8631-1781228877/content/tucana-care.html`

---

### 5. Voto Explicado
**Context:** Civic Tech · Live
**Stack:** Next.js, Supabase, TypeScript, Câmara API, Tailwind CSS
**Demo:** voto-explicado.vercel.app
**Accent:** `#22c55e`

**Reference HTML:** `.superpowers/brainstorm/8631-1781228877/content/voto-explicado.html`

---

### 6. VoteView Brasil
**Context:** Data Science · Analysis
**Stack:** Python, K-Means clustering, OLS regression, election data (Pernambuco 2018–2022)
**Accent:** `#f97316`

**Reference HTML:** `.superpowers/brainstorm/8631-1781228877/content/voteview-brasil.html`

---

## Writing constraints

- No em dashes (use commas, colons, or restructured sentences)
- No AI/robotic tone — natural, first-person where appropriate
- No internal company names in case study body text
- Tucana Care: no specific function names, no pipeline implementation details beyond concept level

---

## Out of Scope

- /about page
- /work list page (home page serves this role)
- Dark mode
- CMS or admin UI
- i18n
- Clinica AI (excluded from portfolio for now)
