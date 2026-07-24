# Seasonal Content Guide

## Current content source

The front end reads all temporary editorial data from:

```text
app/seasons/data.ts
```

The file exports:

- `seasons` — season-level visual direction, hero copy, media, and articles
- `seasonOrder` — navigation order
- `getSeasonArticle()` — article lookup by season and slug
- `getAllArticles()` — static-route generation input
- `getRelatedArticles()` — related-story resolution

## Replacing media

Each featured media object supports:

```ts
{
  id,
  season,
  type,
  title,
  description,
  thumbnail,
  mediaSource,
  galleryImages,
  author,
  publishedAt,
  category,
  duration,
  alt
}
```

Replace the temporary Unsplash image URLs and Pexels video URL with approved
assets. Keep descriptive `alt` text for photographs. Replace
`public/captions/placeholder.vtt` with a caption file for every published
video.

For production media, prefer an image CDN or object storage that can provide
responsive sizes. Add its hostname to `next.config.ts`.

## Replacing articles

Each article supports:

```ts
{
  slug,
  season,
  title,
  subtitle,
  excerpt,
  author,
  publishedAt,
  readingTime,
  category,
  featuredImage,
  imageAlt,
  content,
  relatedArticles
}
```

`content` uses typed blocks for paragraphs, headings, pull quotes, and inline
images. `relatedArticles` contains slugs from the same season.

## CMS migration

The recommended next backend phase is:

1. Create `articles`, `article_blocks`, `media_items`, and `media_gallery_items`
   tables.
2. Store authors separately and reference them by ID.
3. Add `draft`, `scheduled`, `published`, and `archived` states.
4. Add `featured_order` and `season` fields for editorial placement.
5. Store media in object storage and preserve caption, credit, alt-text, width,
   and height metadata.
6. Replace the exports in `app/seasons/data.ts` with server-side data loaders
   that return the same TypeScript shapes.
7. Keep preview and publishing permissions behind authenticated administrator
   routes.

Because the page components consume reusable content shapes, the visual layer
does not need to be rewritten when a CMS is introduced.
