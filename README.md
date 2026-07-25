# XYLENS Journal of Medicine & Wellness

XYLENS is an independent coastal health publication organized around four
seasonal editorial lenses:

- Spring — Wellness
- Summer — Field Notes
- Autumn — Medicine
- Winter — Research

The homepage introduces the publication through an interactive Three.js
refractive lens composition.
Each seasonal chapter has its own palette, atmospheric hero, media carousel,
immersive media viewer, fading article rail, and long-form article routes.

The public experience follows a "takeaway first, depth on demand" reading
pattern. Article records surface evidence status, author, editorial reviewer,
review date, essential findings, limitations, disclosure, and version history
before deeper narrative content.

The Living Lens combines glass transmission, metallic orbital rings, a
faceted evidence core, botanical specimen fragments, droplets, and atmospheric
particles. Pointer movement and editorial-lens selection alter the composition
without sacrificing its light coastal palette.

Internal navigation uses a destination-aware cinematic shutter transition, and
the full opening ident plays once per browser session. Homepage, seasonal media,
article, evidence, and related-story surfaces share a refined glass-and-metal
editorial tile system.

The previous oak prototype remains in `app/OakScene.tsx` as an inactive concept
for possible Blender/GLB exploration. It is not imported by the live website.

## Routes

```text
/
/seasons/spring
/seasons/summer
/seasons/autumn
/seasons/winter
/seasons/[season]/articles/[slug]
/journal
/journal/[slug]
/evidence-reviews
/research
/wellness
/navigator
/about
/contact
/editorial-standards
/evidence-method
/corrections
/privacy
/terms
/accessibility
/medical-disclaimer
```

All public information, seasonal, and article routes are statically generated.
Legacy seasonal article links remain valid and declare the canonical
`/journal/[slug]` route.

## Development

```bash
npm ci
npx tsc --noEmit
npx eslint app next.config.ts
npx next build
```

Vercel uses `npx next build`, as defined in `vercel.json`.

## Seasonal content

Temporary media, article metadata, article blocks, related-story references,
and the four seasonal visual identities live in:

```text
app/seasons/data.ts
```

See [docs/SEASONAL-CONTENT.md](docs/SEASONAL-CONTENT.md) for replacement and
future CMS integration guidance.

Publication status, visibility, evidence labels, review records, corrections,
and the claim-register integration boundary are typed in:

```text
app/editorial/model.ts
```

See [docs/EDITORIAL-GOVERNANCE.md](docs/EDITORIAL-GOVERNANCE.md) for the rule
that only public, published records may reach public routes, metadata, and
sitemaps. The current implementation is CMS-ready but does not pretend an
authenticated publishing backend exists.

## Editorial note

XYLENS content is educational journalism and is not a substitute for
individualized medical advice, diagnosis, or treatment.

The newsletter and production contact provider are deliberately represented as
not yet connected; the public UI does not simulate a successful subscription or
collect health details.
