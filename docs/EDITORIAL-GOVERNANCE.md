# XYLENS Editorial Governance Boundary

Public content is rendered only when its record is both `published` and
`public`. The typed contract lives in `app/editorial/model.ts`.

Required editorial fields include:

- publication status and visibility
- content and evidence status
- author and reviewer roles
- published and last-reviewed dates
- takeaway, key findings, and limitations
- review method, citations, disclosures, and correction history
- route-specific SEO title and description

The current implementation is a static integration boundary, not a pretend
CMS. A future authenticated editor may write draft, review, schedule, and
publication data to a protected backend. Draft, team, private, preview, and
administrative records must never be imported into public client bundles,
route metadata, search data, or sitemaps.

Claims intended for public surfaces should be reviewed through the
`PublicClaimRecord` interface before publication. Public approval must name the
source, owner, allowed surface, and re-review date.
