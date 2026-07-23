# XYLENS Content Model

## Article

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes | Human-readable headline |
| `slug` | string | Yes | Stable URL identifier |
| `dek` | string | Yes | One- or two-sentence summary |
| `lens` | enum | Yes | Medicine, Wellness, Research, Field Notes |
| `topic` | string | Yes | E.g. Neuro-otology or Care Access |
| `format` | enum | Yes | Evidence Review, Explainer, Field Note, Interview, Guide |
| `authors` | reference[] | Yes | One or more contributors |
| `clinicalReviewers` | reference[] | Conditional | Required when clinical claims are present |
| `publishedAt` | datetime | Yes | Original publication |
| `reviewedAt` | datetime | Conditional | Latest clinical/source review |
| `revision` | string | Yes | Reader-visible revision identifier |
| `evidenceTier` | enum | Conditional | A, B, C, D, or Not Applicable |
| `body` | rich text | Yes | Structured headings, tables, notes, and media |
| `keyTakeaways` | string[] | Recommended | Short reader orientation |
| `limitations` | rich text | Conditional | Required for research synthesis |
| `references` | reference[] | Conditional | Required for evidence and clinical pieces |
| `disclaimerType` | enum | Yes | Editorial, Educational Medical, or Clinical Review |
| `seo` | object | Yes | Title, description, image, canonical |
| `featured` | boolean | Yes | Homepage/editor selection |

## Evidence reference

| Field | Type | Notes |
| --- | --- | --- |
| `citation` | string | Human-readable citation |
| `doi` | string | Optional |
| `url` | URL | Prefer primary source |
| `publicationYear` | number | Used for freshness checks |
| `studyType` | enum | RCT, systematic review, cohort, guideline, etc. |
| `population` | string | Population and sample size when available |
| `editorialNote` | string | Why the source supports the associated claim |

## Person

Fields: name, slug, role, credentials, biography, specialties, disclosures,
profile image, and social/contact links.

## Topic

Fields: name, slug, description, parent topic, visual lens, related topics, and
featured articles.

## Revision record

Fields: article reference, revision number, date, editor, reviewer, change
summary, evidence-impact level, and prior-version URL.

## Recommended CMS rules

- Slugs remain immutable after publication.
- Clinical articles cannot publish without a reviewer and review date.
- Every in-text clinical claim can link to one or more evidence references.
- Material changes create a revision record.
- Search indexing excludes drafts and archived superseded copies.
