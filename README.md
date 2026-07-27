# XYLENS Journal of Medicine & Wellness

XYLENS is an independent coastal health publication built around a unified
journal, evidence desk, research coverage, wellness writing, and public trust
center.

The homepage introduces the publication through an interactive Three.js
refractive Living Lens composition. The earlier seasonal tab and chapter
experience has been retired from the public site.

The public experience follows a "takeaway first, depth on demand" reading
pattern. Article records surface evidence status, author, editorial reviewer,
review date, essential findings, limitations, disclosure, and version history
before deeper narrative content.

The Living Lens combines glass transmission, metallic orbital rings, a
faceted evidence core, botanical specimen fragments, droplets, and atmospheric
particles. Pointer movement alters the composition without sacrificing its
light coastal palette.

Internal navigation uses a destination-aware cinematic shutter transition, and
the full opening ident plays once per browser session. Homepage, article,
evidence, and related-story surfaces share a refined glass-and-metal editorial
tile system.

The previous oak prototype remains in `app/OakScene.tsx` as an inactive concept
for possible Blender/GLB exploration. It is not imported by the live website.

## Routes

```text
/
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
/admin
```

All public information and article routes are statically generated. Canonical
long-form writing lives at `/journal/[slug]`.

## Admin Studio

`/admin` opens the XYLENS editorial workspace. The first release includes:

- a dashboard for publication health and content status;
- page, section, and individual tile editing;
- native drag-to-reorder sections and add-section patterns;
- article, media, inbox, traffic, navigation, and settings workspaces;
- browser autosave, manual checkpoints, JSON import/export, and draft preview;
- explicit integration states for authentication, storage, email, and analytics.

Until authenticated shared storage is connected, admin edits remain browser-local
and the production publish control stays locked. This is intentional: the admin
does not present preview data as live traffic or simulate a production inbox.
The route is marked `noindex` and excluded in `robots.txt`, but it must not hold
sensitive or patient information before production authentication is enabled.

Production publishing remains locked until a private authentication layer,
shared content database, and server-side publishing adapter are connected.

## Development

```bash
npm ci
npx tsc --noEmit
npx eslint app next.config.ts
npx next build
```

Vercel uses `npx next build`, as defined in `vercel.json`.

## Editorial content

Temporary article metadata, article blocks, and related-story references live
in:

```text
app/seasons/data.ts
```

The source file retains internal grouping only as a temporary data shape for
future CMS migration; it does not create public seasonal navigation or routes.

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
