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
```

All seasonal and article routes are statically generated.

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

## Editorial note

XYLENS content is educational journalism and is not a substitute for
individualized medical advice, diagnosis, or treatment.
