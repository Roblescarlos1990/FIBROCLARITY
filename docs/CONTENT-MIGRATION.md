# FibroClarity → XYLENS Content Migration

## Source audit

The uploaded repository is a static HTML learning hub with three primary focus
areas:

1. Art State
2. Phenotype Case Vignettes
3. HEOR & Care Access

The strongest content assets are two large, highly formatted evidence reviews:

- Fibromyalgia: A Comprehensive Disease Review
- Persistent Postural-Perceptual Dizziness with Concurrent TMJ and
  Trigeminocervical Involvement

Supporting navigation also identifies neuro-otology and neurodermatology as
important phenotype groupings. The source already contains citations, tables,
callouts, section anchors, references, and explicit uncertainty language.

## What should be retained

- Long-form review structure
- Section anchors and reference lists
- Evidence tables and interpretive caveats
- Phenotype and specialty taxonomy
- Care-access and health-economics perspective
- Educational-not-medical-advice boundary

## What should change

- Move inline CSS into the shared XYLENS design system
- Replace page-to-page static navigation with CMS-backed routes
- Convert embedded images/data into optimized media assets
- Convert citation tooltips into accessible reference links and endnotes
- Add author, reviewer, review date, revision, and evidence-tier metadata
- Standardize table behavior for mobile readers
- Preserve medical nuance while editing headlines and summaries for plain
  language

## Proposed mapping

| Source area | XYLENS destination | Format |
| --- | --- | --- |
| Art State | Research | State of the Science |
| Fibromyalgia comprehensive review | Research | Evidence Review |
| Phenotype Case Vignettes | Medicine | Case Context / Phenotype Guide |
| FM + NeuroOtology | Medicine | Specialty Lens |
| FM + NeuroDermatology | Medicine | Specialty Lens |
| PPPD + TMJ review | Research | Evidence Review |
| HEOR & Care Access | Medicine | Access & Systems |

## Migration sequence

1. Extract headings, tables, citations, callouts, and media from each large
   source article.
2. Normalize the material to the XYLENS article and reference models.
3. Run citation integrity, recency, and claim-to-source checks.
4. Complete medical/editorial review and document conflicts or uncertainty.
5. Publish as a new revision with the original source archive retained.

## Important caution

The source appears editorially sophisticated, but repository presence is not
clinical validation. All clinical claims, treatment descriptions, cost figures,
guideline references, and dates should be independently verified before public
publication.
