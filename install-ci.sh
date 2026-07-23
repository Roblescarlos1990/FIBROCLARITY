# Website Intake — XYLENS

## 1. Project identity

| Field | Decision |
| --- | --- |
| Project | XYLENS |
| Full name | XYLENS Journal of Medicine & Wellness |
| Product type | Editorial learning center and independent health journal |
| Initial release | Brand and homepage foundation |
| Primary geography | San Diego / coastal Southern California sensibility |
| Shared foundation | VoltFlow White-Label Website + CLIENT-INTAKE.json |
| Source content | FibroClarity Education GitHub export |

## 2. Purpose

Build a credible, high-design publication that helps readers learn about
medicine, wellness, research, and the lived experience of health. The experience
should feel restorative and curious without sacrificing scientific rigor.

## 3. Audience

- Curious general readers navigating complex or chronic health questions
- Patients and caregivers looking for understandable evidence context
- Clinicians and researchers who value clear synthesis
- Wellness-minded readers who dislike miracle claims and trend-driven hype
- Coastal, environmentally aware readers drawn to independent journalism

## 4. Positioning

**Core idea:** Where evidence takes root.

XYLENS sits between a medical learning center, an independent magazine, and a
nature-aware wellness journal. Its holistic framing expands context; it does
not lower the standard for clinical claims.

## 5. Brand direction

| Element | Direction |
| --- | --- |
| Base palette | Charcoal, near-black, bone |
| Metals | Aged gold and cool silver |
| Spring / Wellness | Eucalyptus, sea glass, young leaf |
| Summer / Journal | Deep canopy, warm coastal sun |
| Autumn / Medicine | Rust, ember, persimmon, muted red |
| Winter / Research | Slate, marine layer, silver-blue |
| Display type | Literary old-style serif |
| Utility type | Clean modern sans serif |
| Data / evidence type | Compact monospaced labels |
| Mood | San Diego coast, independent press, ecological, precise, unhurried |

## 6. Signature experience

A procedural 3D oak anchors the first viewport. Choosing an editorial lens
changes the tree's foliage and the surrounding light:

| Lens | Season | Editorial meaning |
| --- | --- | --- |
| Journal / Field Notes | Summer | Observation, culture, life in full view |
| Wellness | Spring | Renewal and restorative practice |
| Medicine | Autumn | The body in change and clinical decisions |
| Research | Winter | Structure, uncertainty, and what remains |

The tree responds subtly to pointer movement. Motion reduces for readers who
request reduced motion.

## 7. Information architecture

### Current starter

- Hero / seasonal lens selector
- Editor's picks
- Explore by lens
- Searchable learning center
- Editorial standard
- Newsletter concept
- Medical disclaimer

### Planned

- `/journal`
- `/wellness`
- `/medicine`
- `/research`
- `/field-notes`
- `/article/[slug]`
- `/authors/[slug]`
- `/topics/[slug]`
- `/editorial-standard`
- `/about`

## 8. Functional requirements

- Responsive desktop, tablet, and mobile layouts
- Search and category filtering
- Keyboard-accessible lens controls
- 3D/WebGL fallback and reduced-motion support
- CMS-ready article data model
- Search metadata and social-sharing metadata
- Newsletter-provider integration in a later phase
- Versioned medical articles with visible review dates and sources

## 9. Editorial safety requirements

- Separate evidence, interpretation, and possibility
- Name evidence strength and limitations
- Show author and qualified reviewer where clinical claims are present
- Date-stamp publication and clinical review
- Use source links and a complete reference section
- Avoid diagnosis-by-headline, miracle claims, and unsupported treatment advice
- Display a clear education-only disclaimer without using it as a substitute
  for responsible editing

## 10. Success measures

- Readers can identify the publication's four lenses in one viewport
- The seasonal interaction feels meaningful rather than decorative
- A reader can find a relevant topic in under 30 seconds
- The evidence standard is visible before opening an article
- The system can absorb the existing FibroClarity reviews without redesign
- Performance remains acceptable on a modern phone

## 11. Scope boundaries for version 1

Included: brand system, homepage, seasonal interaction, sample content, project
documentation, and scalable front-end structure.

Deferred: production CMS, authentication, live newsletter submission, full
legacy-article migration, clinical sign-off, analytics, and public launch.

## 12. Foundation implementation

This intake is represented in machine-readable form at
`/CLIENT-INTAKE.json`. The shared Company, Brand, Services, Integrations, and
Deployment sections remain intact. XYLENS adds a `publication` extension for
its editorial masthead, hero, seasonal lenses, principles, and disclaimer.

The interface reads those values through `/app/foundation.ts`; client identity
and brand decisions should not be duplicated directly in page components.
