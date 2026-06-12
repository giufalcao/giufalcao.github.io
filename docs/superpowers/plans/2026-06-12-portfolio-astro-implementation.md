# Portfolio Astro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert 7 approved HTML mockups into a live Astro site at giufalcao.github.io — a case-study-driven portfolio in light theme with narrative project pages.

**Architecture:** A `CaseStudyLayout` provides the shared `<html>/<head>` shell and base CSS for all 6 work pages; per-page accent color is injected via CSS custom properties. The home page (`index.astro`) uses a standalone page layout with its own scoped styles. No Astro Content Collections — each page is self-contained.

**Tech Stack:** Astro, Tailwind CSS (existing, kept but unused for new pages), plain CSS via scoped `<style>` blocks, Mermaid 10 via CDN.

---

## Source of truth

All 7 pages have approved HTML mockups at:
```
.superpowers/brainstorm/8631-1781228877/content/
  index.html              → src/pages/index.astro
  localization-eval.html  → src/pages/work/localization-eval.astro
  adaptive-persona.html   → src/pages/work/adaptive-persona.astro
  pharma-v2.html          → src/pages/work/pharma-recommendation.astro
  tucana-care.html        → src/pages/work/tucana-care.astro
  voto-explicado.html     → src/pages/work/voto-explicado.astro
  voteview-brasil.html    → src/pages/work/voteview-brasil.astro
```

When converting: copy the `<body>` content from the HTML mockup, replace `.html` hrefs with Astro routes (see routing table below), remove `<html>/<head>/<body>/<script>` wrapper tags (the layout provides them).

## URL routing table

| HTML mockup link | Astro route |
|-----------------|-------------|
| `localization-eval.html` | `/work/localization-eval` |
| `adaptive-persona.html` | `/work/adaptive-persona` |
| `pharma-v2.html` | `/work/pharma-recommendation` |
| `tucana-care.html` | `/work/tucana-care` |
| `voto-explicado.html` | `/work/voto-explicado` |
| `voteview-brasil.html` | `/work/voteview-brasil` |
| `index.html` / `#` / home | `/` |

## Per-page accent and code colors

| Page | `accent` | `codeColor` |
|------|---------|-------------|
| localization-eval | `#14b8a6` | `#0f766e` |
| adaptive-persona | `#8b5cf6` | `#6d28d9` |
| pharma-recommendation | `#3b82f6` | `#1d4ed8` |
| tucana-care | `#f43f5e` | `#be123c` |
| voto-explicado | `#22c55e` | `#16a34a` |
| voteview-brasil | `#f97316` | `#c2410c` |

---

## File map

| File | Action | Purpose |
|------|--------|---------|
| `src/layouts/BaseLayout.astro` | Modify | Strip dark-theme body class; keep SEO head |
| `src/layouts/CaseStudyLayout.astro` | Create | Shell + shared CSS for all 6 work pages |
| `src/pages/index.astro` | Rewrite | New home page (hero + project list) |
| `src/pages/work/localization-eval.astro` | Create | Localization Quality Framework case study |
| `src/pages/work/adaptive-persona.astro` | Create | Adaptive Persona Behavior case study |
| `src/pages/work/pharma-recommendation.astro` | Create | Pharmaceutical Recommendation System |
| `src/pages/work/tucana-care.astro` | Create | Tucana Care personal project |
| `src/pages/work/voto-explicado.astro` | Create | Voto Explicado personal project |
| `src/pages/work/voteview-brasil.astro` | Create | VoteView Brasil personal project |

Old section components in `src/components/sections/` and `src/components/layout/Nav.astro`, `Footer.astro` are no longer used after Task 3 — leave them in place (no delete needed).

---

## Task 1: Update BaseLayout

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

The current `<body>` uses `class="bg-bg text-text-primary antialiased"` which applies dark Tailwind tokens. The new pages use white backgrounds via their own scoped CSS — the body class will fight them. Remove it.

- [ ] **Step 1: Edit BaseLayout.astro**

Replace the `<body>` tag:
```astro
<!-- Before -->
<body class="bg-bg text-text-primary antialiased">

<!-- After -->
<body>
```

Also update the default title and description in the frontmatter to match the new portfolio:
```astro
const {
  title = 'Giulia Falcão',
  description = 'Machine Learning Engineer at ReflexAI. Building evaluation systems for LLMs and full-stack products.',
  ogImage = '/og-image.png',
} = Astro.props;
```

And update `<meta name="theme-color">` from dark to light:
```html
<meta name="theme-color" content="#ffffff" />
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build
```
Expected: no errors, `dist/` generated.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "chore: strip dark theme from BaseLayout for light portfolio"
```

---

## Task 2: Create CaseStudyLayout

**Files:**
- Create: `src/layouts/CaseStudyLayout.astro`

This layout provides the full HTML shell, shared CSS for all case study pages, the Mermaid CDN script, and the `mermaid.initialize()` call. Each page passes its accent color and Mermaid theme config as props.

- [ ] **Step 1: Create `src/layouts/CaseStudyLayout.astro`**

```astro
---
interface Props {
  title: string;
  description?: string;
  accent: string;
  codeColor: string;
  mermaidPrimary?: string;
  mermaidPrimaryText?: string;
  mermaidPrimaryBorder?: string;
}

const {
  title,
  description,
  accent,
  codeColor,
  mermaidPrimary = '#f1f5f9',
  mermaidPrimaryText = '#0f172a',
  mermaidPrimaryBorder = '#cbd5e1',
} = Astro.props;

const pageDescription = description ?? title;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} — Giulia Falcão</title>
  <meta name="description" content={pageDescription} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
</head>
<body style={`--accent: ${accent}; --code-color: ${codeColor};`}>
  <slot />
  <script define:vars={{ mermaidPrimary, mermaidPrimaryText, mermaidPrimaryBorder }}>
    mermaid.initialize({
      theme: 'neutral',
      themeVariables: {
        background: '#f8fafc',
        primaryColor: mermaidPrimary,
        primaryTextColor: mermaidPrimaryText,
        primaryBorderColor: mermaidPrimaryBorder,
        lineColor: '#94a3b8',
        secondaryColor: '#f1f5f9',
        tertiaryColor: '#f8fafc',
      },
    });
  </script>
</body>
</html>

<style is:global>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    color: #1e293b;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 15px;
    line-height: 1.85;
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 28px 100px;
  }

  .case-label {
    font-family: monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
    margin-bottom: 12px;
    display: block;
  }
  h1 {
    font-family: system-ui, sans-serif;
    font-size: 38px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
    margin-bottom: 14px;
  }
  .subtitle {
    font-size: 18px;
    color: #64748b;
    font-family: system-ui;
    margin-bottom: 40px;
    line-height: 1.5;
  }

  .meta {
    display: flex;
    gap: 36px;
    flex-wrap: wrap;
    margin-bottom: 48px;
    padding-bottom: 36px;
    border-bottom: 1px solid #e2e8f0;
  }
  .meta-key {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94a3b8;
    margin-bottom: 4px;
  }
  .meta-val { font-size: 13px; color: #64748b; }

  .tldr {
    background: #f8fafc;
    border-left: 3px solid var(--accent);
    padding: 22px 26px;
    margin-bottom: 56px;
    border-radius: 0 8px 8px 0;
  }
  .tldr-label {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    margin-bottom: 10px;
  }
  .tldr p {
    color: #64748b;
    font-family: system-ui;
    font-size: 14px;
    line-height: 1.75;
  }

  .section-num {
    font-family: monospace;
    font-size: 11px;
    color: #94a3b8;
    margin-bottom: 6px;
    display: block;
  }
  h2 {
    font-family: system-ui, sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 18px;
  }
  p { color: #64748b; margin-bottom: 16px; }
  strong { color: #0f172a; font-style: normal; }
  code {
    background: #f1f5f9;
    padding: 1px 6px;
    border-radius: 3px;
    color: var(--code-color);
    font-size: 13px;
    font-family: monospace;
  }

  .section { margin-bottom: 60px; }

  .diagram-wrap { margin: 24px 0; }
  .diagram-label {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94a3b8;
    margin-bottom: 12px;
  }
  .mermaid {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 24px;
    overflow-x: auto;
  }

  .act {
    padding-top: 28px;
    margin-top: 28px;
    border-top: 1px solid #e2e8f0;
  }
  .act-label {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94a3b8;
    margin-bottom: 8px;
    display: block;
  }
  h3 {
    font-family: system-ui, sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 12px;
  }

  .result {
    display: flex;
    gap: 12px;
    align-items: baseline;
    margin-top: 18px;
    padding: 12px 16px;
    background: #f8fafc;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    font-family: system-ui;
    font-size: 13px;
  }
  .result-label {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
    white-space: nowrap;
  }

  .callout {
    border-radius: 8px;
    padding: 18px 22px;
    margin: 24px 0;
  }
  .callout-label {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
    margin-bottom: 8px;
    display: block;
  }
  .callout p {
    color: #64748b;
    font-family: system-ui;
    font-size: 13px;
    margin: 0;
    line-height: 1.7;
  }

  .principles {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .principle { display: flex; gap: 16px; }
  .pnum {
    font-family: monospace;
    font-size: 14px;
    color: var(--accent);
    font-weight: 700;
    min-width: 18px;
    padding-top: 1px;
  }
  .pbody h4 {
    font-family: system-ui, sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 5px;
  }
  .pbody p { font-size: 14px; margin: 0; }

  .next {
    margin-top: 72px;
    padding-top: 36px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
  }
  .next-lbl {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94a3b8;
    margin-bottom: 6px;
  }
  .next-title {
    font-family: system-ui;
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
  }
  .next-arrow {
    font-size: 22px;
    color: var(--accent);
  }
</style>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors (the layout has no pages using it yet, that's fine).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/CaseStudyLayout.astro
git commit -m "feat: add CaseStudyLayout with shared light theme CSS"
```

---

## Task 3: Rewrite index.astro (home page)

**Files:**
- Modify: `src/pages/index.astro`

Source: `.superpowers/brainstorm/8631-1781228877/content/index.html`

The new home page does not use the old section components (Hero, Projects, etc.). It renders everything inline with scoped styles, identical to the HTML mockup.

- [ ] **Step 1: Replace `src/pages/index.astro` entirely**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Giulia Falcão" description="Machine Learning Engineer at ReflexAI. Building evaluation systems for LLMs and, occasionally, products that should exist in the world.">

<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #ffffff;
    color: #1e293b;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 15px;
    line-height: 1.85;
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 28px 100px;
  }

  nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 80px; }
  .nav-name { font-family: system-ui, sans-serif; font-size: 13px; font-weight: 600; color: #64748b; letter-spacing: 0.02em; }
  .nav-links { display: flex; gap: 24px; }
  .nav-links a {
    font-family: monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.15s;
  }
  .nav-links a:hover { color: #64748b; }

  .hero { margin-bottom: 80px; }
  h1 { font-family: system-ui, sans-serif; font-size: 42px; font-weight: 800; color: #0f172a; line-height: 1.1; margin-bottom: 10px; }
  .headline { font-family: monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: #475569; margin-bottom: 28px; }
  .bio { color: #64748b; font-size: 16px; line-height: 1.8; max-width: 560px; }

  .section-header {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #cbd5e1;
    margin-bottom: 20px;
    margin-top: 64px;
  }

  .project-list { display: flex; flex-direction: column; gap: 2px; }

  .project-item {
    display: flex;
    gap: 0;
    text-decoration: none;
    border-radius: 6px;
    overflow: hidden;
    transition: background 0.12s;
  }
  .project-item:hover { background: #f1f5f9; }
  .project-item:hover .project-arrow { opacity: 1; }

  .project-accent { width: 3px; flex-shrink: 0; }
  .project-body { padding: 20px 22px; flex: 1; }
  .project-type {
    font-family: monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94a3b8;
    margin-bottom: 5px;
  }
  .project-title { font-family: system-ui, sans-serif; font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 5px; line-height: 1.3; }
  .project-desc { font-family: system-ui, sans-serif; font-size: 13px; color: #475569; line-height: 1.6; }
  .project-arrow {
    font-size: 16px;
    color: #94a3b8;
    padding: 20px 18px 20px 0;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: opacity 0.12s;
  }

  .divider { height: 1px; background: #e2e8f0; margin: 6px 0; }

  footer {
    margin-top: 96px;
    padding-top: 32px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .footer-name { font-family: system-ui, sans-serif; font-size: 13px; color: #1e293b; }
  .footer-links { display: flex; gap: 20px; }
  .footer-links a {
    font-family: monospace;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
    text-decoration: none;
    transition: color 0.15s;
  }
  .footer-links a:hover { color: #64748b; }
</style>

<nav>
  <span class="nav-name">Giulia Falcão</span>
  <div class="nav-links">
    <a href="https://linkedin.com/in/giulia-cavalcanti" target="_blank" rel="noopener">LinkedIn</a>
    <a href="https://github.com/giufalcao" target="_blank" rel="noopener">GitHub</a>
  </div>
</nav>

<div class="hero">
  <h1>Giulia Falcão</h1>
  <div class="headline">Machine Learning Engineer</div>
  <p class="bio">Machine Learning Engineer at ReflexAI. I build evaluation systems for LLMs and, occasionally, products I want to exist in the world.</p>
</div>

<div class="section-header">Case Studies</div>
<div class="project-list">

  <a class="project-item" href="/work/localization-eval">
    <div class="project-accent" style="background:#14b8a6;"></div>
    <div class="project-body">
      <div class="project-type">ReflexAI · AI Evaluation</div>
      <div class="project-title">Localization Quality Framework</div>
      <div class="project-desc">An evaluation framework for multilingual AI output, combining automated metrics with human benchmarks across six languages.</div>
    </div>
    <div class="project-arrow">→</div>
  </a>

  <div class="divider"></div>

  <a class="project-item" href="/work/adaptive-persona">
    <div class="project-accent" style="background:#8b5cf6;"></div>
    <div class="project-body">
      <div class="project-type">ReflexAI · AI Systems</div>
      <div class="project-title">Adaptive Persona Behavior</div>
      <div class="project-desc">A multi-agent system that controls how AI roleplay personas adapt emotional and behavioral responses in real time.</div>
    </div>
    <div class="project-arrow">→</div>
  </a>

  <div class="divider"></div>

  <a class="project-item" href="/work/pharma-recommendation">
    <div class="project-accent" style="background:#3b82f6;"></div>
    <div class="project-body">
      <div class="project-type">Thoughtworks · Senior Data Scientist</div>
      <div class="project-title">Pharmaceutical Recommendation System</div>
      <div class="project-desc">From manual Databricks notebooks to a fully automated ML pipeline. 60% cost reduction, 79% faster runtime.</div>
    </div>
    <div class="project-arrow">→</div>
  </a>

</div>

<div class="section-header">Personal Projects</div>
<div class="project-list">

  <a class="project-item" href="/work/tucana-care">
    <div class="project-accent" style="background:#f43f5e;"></div>
    <div class="project-body">
      <div class="project-type">Healthcare · Pre-launch</div>
      <div class="project-title">Tucana Care</div>
      <div class="project-desc">A clinical copilot that monitors patients between sessions via WhatsApp and surfaces urgencies in real time.</div>
    </div>
    <div class="project-arrow">→</div>
  </a>

  <div class="divider"></div>

  <a class="project-item" href="/work/voto-explicado">
    <div class="project-accent" style="background:#22c55e;"></div>
    <div class="project-body">
      <div class="project-type">Civic Tech · Live</div>
      <div class="project-title">Voto Explicado</div>
      <div class="project-desc">Congressional voting data made readable — party ideology maps, alignment scores, and AI-powered position search for any politician.</div>
    </div>
    <div class="project-arrow">→</div>
  </a>

  <div class="divider"></div>

  <a class="project-item" href="/work/voteview-brasil">
    <div class="project-accent" style="background:#f97316;"></div>
    <div class="project-body">
      <div class="project-type">Data Science · Analysis</div>
      <div class="project-title">VoteView Brasil</div>
      <div class="project-desc">K-Means clustering and OLS regression on 60k voting sections across three election cycles in Pernambuco.</div>
    </div>
    <div class="project-arrow">→</div>
  </a>

</div>

<footer>
  <span class="footer-name">Giulia Falcão</span>
  <div class="footer-links">
    <a href="https://linkedin.com/in/giulia-cavalcanti" target="_blank" rel="noopener">LinkedIn</a>
    <a href="https://github.com/giufalcao" target="_blank" rel="noopener">GitHub</a>
    <a href="mailto:thegiuliacavalcanti@gmail.com">Email</a>
  </div>
</footer>

</BaseLayout>
```

- [ ] **Step 2: Run dev server and visually verify**

```bash
npm run dev
```
Open `http://localhost:4321` and compare against `.superpowers/brainstorm/8631-1781228877/content/index.html`. Check: nav, hero bio text, 3 case studies, 3 personal projects, footer links.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: rewrite home page — case study list, light theme"
```

---

## Task 4: Create work/localization-eval.astro

**Files:**
- Create: `src/pages/work/localization-eval.astro`

Source: `.superpowers/brainstorm/8631-1781228877/content/localization-eval.html`

This page has two special elements not in the shared CaseStudyLayout styles: a `.judge-table` and an `.insight` callout (green bg `#f0fdf4`).

- [ ] **Step 1: Create `src/pages/work/localization-eval.astro`**

Pattern to follow:
```astro
---
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
---

<CaseStudyLayout
  title="Localization Quality Framework"
  description="An evaluation framework for multilingual AI output, combining automated metrics with human benchmarks across six languages."
  accent="#14b8a6"
  codeColor="#0f766e"
  mermaidPrimary="#ccfbf1"
  mermaidPrimaryText="#134e4a"
  mermaidPrimaryBorder="#5eead4"
>

<style>
  /* Page-specific elements not in CaseStudyLayout */
  .judge-table { width: 100%; border-collapse: collapse; font-family: system-ui; font-size: 13px; margin: 20px 0; }
  .judge-table th { background: #f8fafc; text-align: left; padding: 10px 12px; font-weight: 600; color: #0f172a; border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
  .judge-table td { padding: 12px; color: #64748b; border-bottom: 1px solid #f1f5f9; vertical-align: top; line-height: 1.5; }
  .judge-table tr:hover td { background: #f8fafc; }
  .judge-name { font-family: monospace; color: #0f766e; font-size: 12px; }
  .insight { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 14px 16px; margin: 16px 0; font-family: system-ui; font-size: 13px; }
  .insight strong { color: #166534; }
</style>

<!-- Copy the full <body> content from localization-eval.html here,
     replacing all .html href references using the routing table above.
     The <script> mermaid.initialize() block is NOT needed — CaseStudyLayout handles it.
     Next link href: /work/adaptive-persona -->

</CaseStudyLayout>
```

Copy all content between `<body>` and `</body>` from `localization-eval.html` into the slot. Remove the `<script>` block (CaseStudyLayout provides Mermaid init). Change `href="adaptive-persona.html"` to `href="/work/adaptive-persona"`.

- [ ] **Step 2: Run dev and verify**

```bash
npm run dev
```
Open `http://localhost:4321/work/localization-eval`. Check: teal accent color, Mermaid diagram renders, judge table, insight callout, "Next Case Study → Adaptive Persona Behavior" link works.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/localization-eval.astro
git commit -m "feat: add Localization Quality Framework case study page"
```

---

## Task 5: Create work/adaptive-persona.astro

**Files:**
- Create: `src/pages/work/adaptive-persona.astro`

Source: `.superpowers/brainstorm/8631-1781228877/content/adaptive-persona.html`

Special elements: `.state-table` (same structure as `.judge-table` but with purple accents). Also `.c-partial` class used in a table cell with color `#059669`.

- [ ] **Step 1: Create `src/pages/work/adaptive-persona.astro`**

```astro
---
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
---

<CaseStudyLayout
  title="Adaptive Persona Behavior"
  description="A multi-agent system that controls how AI roleplay personas adapt emotional and behavioral responses in real time."
  accent="#8b5cf6"
  codeColor="#6d28d9"
  mermaidPrimary="#ede9fe"
  mermaidPrimaryText="#4c1d95"
  mermaidPrimaryBorder="#c4b5fd"
>

<style>
  .state-table { width: 100%; border-collapse: collapse; font-family: system-ui; font-size: 13px; margin: 20px 0; }
  .state-table th { background: #f8fafc; text-align: left; padding: 10px 12px; font-weight: 600; color: #0f172a; border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
  .state-table td { padding: 12px; color: #64748b; border-bottom: 1px solid #f1f5f9; vertical-align: top; line-height: 1.5; }
  .state-table tr:hover td { background: #f8fafc; }
  .c-full { color: #6d28d9; font-family: monospace; font-size: 12px; }
  .c-partial { color: #059669; font-family: monospace; font-size: 12px; }
  .c-none { color: #94a3b8; font-family: monospace; font-size: 12px; }
</style>

<!-- Copy full <body> content from adaptive-persona.html.
     Remove <script> mermaid block.
     Next link href: /work/pharma-recommendation -->

</CaseStudyLayout>
```

- [ ] **Step 2: Run dev and verify**

Open `http://localhost:4321/work/adaptive-persona`. Check: purple accent, state machine Mermaid diagram, state table, next link points to Pharma.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/adaptive-persona.astro
git commit -m "feat: add Adaptive Persona Behavior case study page"
```

---

## Task 6: Create work/pharma-recommendation.astro

**Files:**
- Create: `src/pages/work/pharma-recommendation.astro`

Source: `.superpowers/brainstorm/8631-1781228877/content/pharma-v2.html`

No special elements beyond the shared layout. The `.result span` in pharma uses `color: #6ee7b7` (light green for metric values) — keep as-is from the approved mockup.

- [ ] **Step 1: Create `src/pages/work/pharma-recommendation.astro`**

```astro
---
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
---

<CaseStudyLayout
  title="Pharmaceutical Recommendation System"
  description="From manual Databricks notebooks to a fully automated ML pipeline. 60% cost reduction, 79% faster runtime."
  accent="#3b82f6"
  codeColor="#1d4ed8"
  mermaidPrimary="#dbeafe"
  mermaidPrimaryText="#1e3a5f"
  mermaidPrimaryBorder="#93c5fd"
>

<style>
  /* pharma result span uses green metric color */
  .result span { color: #6ee7b7; }
</style>

<!-- Copy full <body> content from pharma-v2.html.
     Remove <script> mermaid block.
     Next link href: /work/tucana-care -->

</CaseStudyLayout>
```

- [ ] **Step 2: Run dev and verify**

Open `http://localhost:4321/work/pharma-recommendation`. Check: blue accent, pipeline Mermaid diagram with training/inference branches, three acts, metrics ($16,380 → $312), next link → Tucana Care.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/pharma-recommendation.astro
git commit -m "feat: add Pharmaceutical Recommendation System case study page"
```

---

## Task 7: Create work/tucana-care.astro

**Files:**
- Create: `src/pages/work/tucana-care.astro`

Source: `.superpowers/brainstorm/8631-1781228877/content/tucana-care.html`

Special element: `.callout` has rose-tinted background `#fff1f2` and border `#fecdd3`. The shared `.callout` in CaseStudyLayout only provides the radius/padding/margin — the colors are page-specific.

- [ ] **Step 1: Create `src/pages/work/tucana-care.astro`**

```astro
---
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
---

<CaseStudyLayout
  title="Tucana Care"
  description="A clinical copilot that monitors patients between sessions via WhatsApp and surfaces urgencies in real time."
  accent="#f43f5e"
  codeColor="#be123c"
  mermaidPrimary="#ffe4e6"
  mermaidPrimaryText="#9f1239"
  mermaidPrimaryBorder="#fda4af"
>

<style>
  .callout { background: #fff1f2; border: 1px solid #fecdd3; }
  .result span { color: #be123c; }
</style>

<!-- Copy full <body> content from tucana-care.html.
     Remove <script> mermaid block.
     Next link href: /work/voto-explicado -->

</CaseStudyLayout>
```

- [ ] **Step 2: Run dev and verify**

Open `http://localhost:4321/work/tucana-care`. Check: rose accent, system overview Mermaid diagram, three acts, rose callout block, next link → Voto Explicado.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/tucana-care.astro
git commit -m "feat: add Tucana Care personal project page"
```

---

## Task 8: Create work/voto-explicado.astro

**Files:**
- Create: `src/pages/work/voto-explicado.astro`

Source: `.superpowers/brainstorm/8631-1781228877/content/voto-explicado.html`

Check the HTML mockup for any special elements (demo link button, tech pills, etc.) and add their styles in a page-scoped `<style>` block.

- [ ] **Step 1: Create `src/pages/work/voto-explicado.astro`**

```astro
---
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
---

<CaseStudyLayout
  title="Voto Explicado"
  description="Congressional voting data made readable — party ideology maps, alignment scores, and AI-powered position search."
  accent="#22c55e"
  codeColor="#16a34a"
  mermaidPrimary="#dcfce7"
  mermaidPrimaryText="#14532d"
  mermaidPrimaryBorder="#86efac"
>

<style>
  /* Add any page-specific styles from voto-explicado.html <style> block
     that are not in CaseStudyLayout (demo link, tech pills, etc.) */
</style>

<!-- Copy full <body> content from voto-explicado.html.
     Remove <script> mermaid block.
     Next link href: /work/voteview-brasil -->

</CaseStudyLayout>
```

Before writing the page, read `voto-explicado.html` and copy any CSS classes not present in the CaseStudyLayout shared styles into the page `<style>` block.

- [ ] **Step 2: Run dev and verify**

Open `http://localhost:4321/work/voto-explicado`. Check: green accent, demo link to `voto-explicado.vercel.app`, next link → VoteView Brasil.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/voto-explicado.astro
git commit -m "feat: add Voto Explicado personal project page"
```

---

## Task 9: Create work/voteview-brasil.astro

**Files:**
- Create: `src/pages/work/voteview-brasil.astro`

Source: `.superpowers/brainstorm/8631-1781228877/content/voteview-brasil.html`

Special element: `.finding` callout with amber background `#fff7ed`, border `#fed7aa`, text `#92400e`.

- [ ] **Step 1: Create `src/pages/work/voteview-brasil.astro`**

```astro
---
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
---

<CaseStudyLayout
  title="VoteView Brasil"
  description="K-Means clustering and OLS regression on 60k voting sections across three election cycles in Pernambuco."
  accent="#f97316"
  codeColor="#c2410c"
  mermaidPrimary="#ffedd5"
  mermaidPrimaryText="#7c2d12"
  mermaidPrimaryBorder="#fdba74"
>

<style>
  .finding {
    background: #fff7ed;
    border: 1px solid #fed7aa;
    border-radius: 6px;
    padding: 14px 16px;
    margin: 16px 0;
    font-family: system-ui;
    font-size: 13px;
    color: #92400e;
  }
</style>

<!-- Copy full <body> content from voteview-brasil.html.
     Remove <script> mermaid block.
     Next/"Back" link: href="/" with label "All Projects" -->

</CaseStudyLayout>
```

- [ ] **Step 2: Run dev and verify**

Open `http://localhost:4321/work/voteview-brasil`. Check: orange accent, finding callouts, "Back to work → All Projects" link goes to `/`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/voteview-brasil.astro
git commit -m "feat: add VoteView Brasil personal project page"
```

---

## Task 10: Full build verification and navigation smoke test

**Files:** none (verification only)

- [ ] **Step 1: Build for production**

```bash
npm run build
```
Expected: exits 0, all 7 pages in `dist/` (`index.html`, `work/localization-eval/index.html`, `work/adaptive-persona/index.html`, `work/pharma-recommendation/index.html`, `work/tucana-care/index.html`, `work/voto-explicado/index.html`, `work/voteview-brasil/index.html`).

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```
Open `http://localhost:4321` and walk the full navigation chain:
1. Home → click Localization Quality Framework
2. Localization → "Next Case Study" → Adaptive Persona
3. Adaptive Persona → "Next Case Study" → Pharma
4. Pharma → "Next Project" → Tucana Care
5. Tucana Care → "Next Project" → Voto Explicado
6. Voto Explicado → "Next Project" → VoteView Brasil
7. VoteView Brasil → "Back to work" → Home

Each step: verify accent color matches the per-page table, Mermaid diagram renders (not blank), no dark backgrounds bleed through.

- [ ] **Step 3: Commit if any fixes were needed**

```bash
git add -p  # stage only the fixes
git commit -m "fix: navigation and visual QA corrections"
```

- [ ] **Step 4: Tag the milestone**

```bash
git tag v2.0-portfolio-redesign
```

---

## Self-review notes

- CaseStudyLayout uses `<style is:global>` — Astro scopes styles by default but the case study content (copied HTML) uses class names without Astro's scoped hash. `is:global` is required so the shared CSS applies to the slot content.
- The `define:vars` directive in CaseStudyLayout passes Mermaid theme vars from Astro props into the client script — this is the correct Astro pattern for passing build-time values to inline scripts.
- VoteView Brasil's "Next" link goes to `/` (home), not to another work page. Verify the href is `/` not a relative path.
- The old `src/components/layout/Nav.astro` and `Footer.astro` are still imported by the old `index.astro` — that file is being fully replaced in Task 3, so no orphan imports after that task.
