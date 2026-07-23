# Shared Website Foundation

XYLENS uses the existing VoltFlow white-label website foundation rather than a
separate one-off configuration system.

## Source of truth

`/CLIENT-INTAKE.json` is the filled client intake for this project. It preserves
the established foundation sections:

| Foundation section | XYLENS use |
| --- | --- |
| `project` | Client name, slug, template identity, template version |
| `company` | Publication name, short name, tagline, location, domain |
| `branding` | Primary, secondary, accent, silver, logos, watermarks |
| `services` | The six public editorial/navigation labels |
| `integrations` | Reserved public Supabase, newsletter, and analytics settings |
| `deployment` | Existing regional and monitoring settings |

The `publication` object is an XYLENS extension. It holds the editorial
masthead, hero language, navigation targets, seasonal lenses, principles, and
medical disclaimer without breaking the original intake contract.

## Runtime adapter

`/app/foundation.ts` is the only adapter between the reusable intake contract
and the website. It:

- validates the expected TypeScript shape;
- maps the six service labels into the public lens system;
- exposes company and publication metadata;
- converts brand colors into CSS custom properties;
- leaves integration settings centralized for later connection.

The homepage and global metadata import this adapter. Identity, masthead,
navigation, hero copy, lens labels, principles, footer location, disclaimer,
and core brand colors are therefore configuration-driven.

## Reusing the foundation

1. Duplicate the master project.
2. Generate or fill `CLIENT-INTAKE.json` with the shared intake builder.
3. Add a client-specific extension only when the product requires fields the
   base contract does not cover.
4. Add brand assets at the paths declared under `branding`.
5. Keep content collections separate from identity configuration.
6. Run validation and publish a new project version.

## Content and master data

The same separation used by the original foundation is retained:

- `CLIENT-INTAKE.json` — client identity and configuration
- `app/foundation.ts` — reusable adapter
- `app/content.ts` — editable publication master content
- `app/page.tsx` — presentation and interactions
- `app/globals.css` — shared visual system

This means future XYLENS content changes do not require changing the client
intake, and future brand changes do not require rewriting the page.

## Integration safety

Only public, publishable integration values belong in `CLIENT-INTAKE.json`.
Private keys and service credentials must remain in deployment environment
variables.
