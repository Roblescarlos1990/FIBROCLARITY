# XYLENS

**Journal of Medicine & Wellness**

XYLENS is an independent editorial platform for evidence-aware medicine,
restorative living, research translation, and field journalism. The first
release establishes the visual system, seasonal 3D oak experience, learning
center, article discovery pattern, editorial-standard block, and newsletter
concept.

This project is implemented on the shared VoltFlow white-label website
foundation. `CLIENT-INTAKE.json` is the source of truth for identity, brand,
navigation labels, integrations, and deployment settings.

## Experience

- Four editorial lenses mapped to seasons:
  - Journal / Field Notes — summer
  - Wellness — spring
  - Medicine — autumn
  - Research — winter
- Interactive WebGL oak tree with pointer parallax and smooth seasonal changes
- Searchable, filterable learning center
- Editor's picks and recent publishing structures
- Transparent evidence and editorial-review language
- Responsive layouts and reduced-motion support

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run build
npm run lint
```

## Project map

```text
CLIENT-INTAKE.json    Filled shared-foundation intake for XYLENS
app/
  OakScene.tsx        Procedural 3D oak and seasonal transitions
  content.ts          Starter editorial content model and sample stories
  foundation.ts       Adapter from the shared intake to the live interface
  globals.css         Brand system, themes, motion, and responsive layouts
  layout.tsx          Metadata and global shell
  page.tsx            Homepage, filters, search, and newsletter interaction
docs/
  CONTENT-MIGRATION.md
  CONTENT-MODEL.md
  FOUNDATION.md
  PROJECT-INTAKE.md
public/
  favicon.svg
```

## Next recommended phase

1. Add article detail routes using a CMS-friendly slug structure.
2. Migrate and clinically review the legacy FibroClarity long-form articles.
3. Connect a headless CMS and real newsletter provider.
4. Add author, reviewer, evidence-grade, references, and revision-history
   modules.
5. Complete accessibility and medical-editorial QA before public launch.

## Foundation workflow

For identity or brand changes, update `CLIENT-INTAKE.json`; do not hard-code
client values inside page components. See `docs/FOUNDATION.md` for the exact
mapping.

## Editorial note

The starter contains illustrative editorial copy. Medical claims must be
source-checked and approved by a qualified clinical editor before publication.
