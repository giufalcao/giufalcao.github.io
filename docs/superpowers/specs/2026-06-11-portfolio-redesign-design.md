# Portfolio Redesign — Design Spec
**Date:** 2026-06-11  
**Reference:** [johnthedesigner.com](https://www.johnthedesigner.com/)

---

## Overview

Redesign giufalcao.github.io from a single-page résumé-style portfolio into a case-study-driven portfolio with narrative project pages, inspired by johnthedesigner.com. The core shift: from listing skills and experience to **telling the story of each project**.

---

## Site Architecture

Three-layer navigation:

```
/ (landing)
├── /work (full list — case studies + personal projects)
│   ├── /work/pharma-recommendation
│   ├── /work/adaptive-persona
│   ├── /work/spanish-eval-framework
│   ├── /work/formula-1
│   ├── /work/vector-search
│   ├── /work/voto-explicado
│   └── /work/voteview-brasil
└── /about (existing About section, promoted to its own page)
```

Tech stack remains: **Astro + Tailwind CSS**. New pages use Astro's file-based routing. Case study content lives in a `src/content/work/` Astro Content Collection — each case study is a `.md` file with frontmatter (title, company, stack, metrics) and prose body. Personal project metadata stays in `src/data/projects.ts`.

---

## Page 1 — Landing Page (`/`)

### Hero
- **Role label:** `Senior ML Engineer · AI Engineer` (monospace, uppercase, muted accent)
- **Tagline (h1):** `I turn complex data problems into AI systems that just work.` — last clause in accent color
- **Subtitle:** One sentence placing her in context: current role at ReflexAI, 6+ years from prototype to production
- **CTAs:** `View Work` (primary) + `Get In Touch` (ghost)
- No metrics, no photo, no stack tags in the hero — clean like John's

### Case Studies section
- Label: `Case Studies` (monospace, uppercase, muted)
- List layout: each item is a full-width row with left text block + right thumbnail
- Hover: title transitions to accent color
- Each row:
  - Company name (monospace, muted, uppercase)
  - Project title (large, bold)
  - One-sentence description of the problem and outcome
  - Thumbnail (right side, ~100×68px, placeholder until real screenshot/diagram)
- Links to `/work/[slug]`

| # | Company | Title |
|---|---------|-------|
| 1 | Thoughtworks | Pharmaceutical Recommendation System |
| 2 | ReflexAI | Adaptive Persona Behavior |
| 3 | ReflexAI | Spanish Evaluation Quality Framework |

### Personal Projects section
- Label: `Personal Projects` (monospace, uppercase, muted)
- 2×2 grid of cards
- Each card: category label (accent) → title → one-line description
- Links to `/work/[slug]`

| # | Category | Title |
|---|----------|-------|
| 1 | Data Engineering | Formula-1 Data Pipeline |
| 2 | AI Infrastructure | MongoDB Atlas Vector Search |
| 3 | Civic Tech · Full-Stack | Voto Explicado |
| 4 | Civic Tech · Open Data | VoteView Brasil |

### Contact
- `Let's talk.` heading
- One-line description of what she's open to
- Email link

---

## Page 2 — Work List (`/work`)

Mirrors the structure of the landing page work sections, but shows all 7 projects with no truncation. Same visual hierarchy: Case Studies (labeled section) above the fold, then Personal Projects below a divider.

---

## Page 3 — Case Study Page (`/work/[slug]`)

### Narrative structure — identical for all case studies:

```
Back link → /work

[Case Study / Personal Project] · [Company]
[Project Title]
[One-sentence hook]

Role | Stack | Outcome          ← meta row

TL;DR                           ← left-bordered callout block
  2–3 sentences: what was done, timeframe, headline result

[Metrics strip]                 ← 2–3 large numbers (case studies only)

── 01  The Challenge ──
  2 paragraphs. Why did this problem exist? What was broken or missing?

── 02  Architecture ──
  Mermaid diagram (rendered as SVG at build time)
  Brief explanation of the system and where the work focused

── 03  The Work ──
  2–3 "acts" — each with:
    Act label (e.g. "Act 1 — Data Preparation")
    Act title (what was done)
    The problem (bold lead)
    The solution (what changed)
    Result callout: before → after

── 04  What Made It Work ──
  3 numbered principles/lessons distilled from the project

── Next Case Study →            ← transition to next slug
```

### Personal project pages
Same structure, but without the metrics strip and with lighter company attribution.

### Visual assets per project

| Project | Visuals |
|---------|---------|
| Pharma Recommendation | Mermaid pipeline diagram (S3 → Prep → Featurization → XGBoost → Output) |
| Adaptive Persona | Mermaid state machine (trainee assessment → emotional state → prompt injection) |
| Spanish Eval Framework | Mermaid flow (LLM judge → meta-judges → human calibration → gate) |
| Formula-1 | Mermaid pipeline diagram (ADF → ADLS → Databricks → Power BI) |
| Vector Search | Mermaid RAG flow (Query → Embed → VectorDB → Similarity → Response) |
| Voto Explicado | Screenshot of live app (voto-explicado.vercel.app) |
| VoteView Brasil | Screenshot or Mermaid architecture |

Mermaid diagrams are pre-rendered to SVG at build time using `@mermaid-js/mermaid-cli`.

---

## Navigation

```
Giulia Falcão    [Work]  [About]  [Resume]  [LinkedIn]
```

- `Work` links to `/work`
- `About` links to `/about` (existing content, extracted to its own page)
- `Resume` links to a PDF (to be added to `/public`)
- `LinkedIn` links to her LinkedIn profile

---

## Content — Case Studies

### 1. Pharmaceutical Recommendation System
**Company:** Thoughtworks · **Role:** Senior Data Scientist  
**Stack:** Databricks, Databricks Jobs, PySpark, MLflow, XGBoost, AWS S3  
**Metrics:** 60% cost reduction ($16,380 → $312), 79% runtime cut (3h15m → 40min), 8xl → 4xl cluster

**TL;DR:** A pharmaceutical client had an ML recommendation system that worked but cost over $16k per run. By refactoring notebooks into modular PySpark, profiling the execution DAG, and applying strategic caching, the pipeline went from 30 hours on an 8xl cluster to 18.5 hours on a 4xl — at a fraction of the cost.

**Two acts:**
- Act 1 — Data Preparation: profiled DAG, applied `spark.cache()`, migrated Pandas → PySpark → 79% runtime reduction
- Act 2 — Featurization: rewrote in PySpark, parameterized Databricks workflow, modularized notebooks → 60% cost reduction

**What Made It Work:**
1. Profile before optimizing (execution DAG first, not intuition)
2. Modularize to maintain (notebooks → Python scripts, testable and reviewable)
3. Measure everything (before/after tracked in MLflow)

---

### 2. Adaptive Persona Behavior
**Company:** ReflexAI · **Role:** Machine Learning Engineer  
**Stack:** Gemini 2.5 Flash, LangGraph, LangChain, NestJS, GCP  
**Metrics:** Replaced static simulations; full unit + E2E coverage; deployed across all bot clients

**TL;DR:** Training simulations had static personas — trainees could game them with minimal effort. Built a system where LLM-powered personas dynamically adapt difficulty based on real-time assessment of trainee performance, deployed across both text and voice clients.

**Three acts:**
- Act 1 — Trainee Assessor: 5-level Gemini 2.5 Flash structured-output assessor with configurable confidence thresholds
- Act 2 — Emotional State Machine: deterministic state machine with escalation/de-escalation triggers, resistance levels, floor/ceiling bounds, and per-turn dynamic prompt injection
- Act 3 — Voice Extension: async pipeline (1-turn lag) to handle real-time STT→LLM→TTS without blocking

**What Made It Work:**
1. Deterministic state machine (not pure LLM generation) for predictable, testable persona behavior
2. Shared NestJS module for uniform deployment across all clients
3. Async design first for voice (real-time constraints drove the architecture)

---

### 3. Spanish Evaluation Quality Framework
**Company:** ReflexAI · **Role:** Machine Learning Engineer  
**Stack:** LLM meta-judges, Gemini, human calibration pipeline  
**Metrics:** ≥80% human-LLM agreement; 88% of mismatches traced to translation artifacts

**TL;DR:** LLM judges achieve only ~69% accuracy on Spanish content — not because the model is worse, but because 88% of mismatches are translation artifacts. Designed a hybrid framework of 5 LLM meta-judges + a human calibration layer by bilingual experts to gate Spanish releases reliably.

**Two acts:**
- Act 1 — Diagnosis: identified translation artifacts as the primary failure mode, not model quality
- Act 2 — Framework: 5 meta-judges for continuous regression + binary human-LLM agreement annotation (not Cohen's κ, chosen for interpretability), grounded in 6 NLP studies

**What Made It Work:**
1. Diagnose before designing (88% of failures had a single root cause)
2. Binary annotation over Cohen's κ (simpler, more interpretable for production gates)
3. Ground thresholds in literature (not arbitrary — backed by 6 published NLP studies)

---

## Content — Personal Projects

### 4. Formula-1 Data Pipeline
**Stack:** Azure Data Factory, Azure Data Lake, Databricks, Delta Lake, Power BI  
**Pipeline:** ADF → ADLS → Databricks (Bronze/Silver/Gold) → Power BI  
**Repo:** github.com/giufalcao/Formula-1

### 5. MongoDB Atlas Vector Search
**Stack:** MongoDB Atlas, Python, PyMongo, Vector Embeddings  
**Pipeline:** Query → Embed → Vector DB → Similarity Search → Response  
**Repo:** github.com/giufalcao/mongodb-atlas-vector-search

### 6. Voto Explicado
**Stack:** Next.js, Supabase, TypeScript, Câmara API, Tailwind CSS  
**Demo:** voto-explicado.vercel.app

### 7. VoteView Brasil
**Stack:** To be confirmed with user before writing this page's content. Page can be scaffolded with a placeholder and filled in later.

---

## What Does NOT Change

- Dark color palette and Tailwind design tokens (keep existing theme)
- `MetricBadge`, `SkillPill`, `SectionHeader` UI components (reuse in new pages)
- Photo in public/ (used on `/about`)
- Skills, Experience, and Certifications sections (move to `/about`)

---

## Out of Scope

- Animations/interactions (beyond existing Tailwind transitions)
- Light mode
- CMS or admin UI — content lives in code
- i18n (English only)
