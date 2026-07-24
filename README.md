# XYLENS Journal of Medicine & Wellness

XYLENS is an independent coastal health publication organized around four
seasonal editorial lenses:

- Spring — Wellness
- Summer — Field Notes
- Autumn — Medicine
- Winter — Research

The homepage introduces the publication through an interactive Three.js oak.
Each seasonal chapter has its own palette, atmospheric hero, media carousel,
immersive media viewer, fading article rail, and long-form article routes.

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
