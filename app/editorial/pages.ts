export type EditorialPageSection = {
  title: string;
  body: string;
  points?: string[];
};

export type EditorialPageDefinition = {
  slug: string;
  eyebrow: string;
  title: string;
  deck: string;
  takeaway: string;
  facts: string[];
  sections: EditorialPageSection[];
};

export const editorialPages: Record<string, EditorialPageDefinition> = {
  journal: {
    slug: "journal",
    eyebrow: "The journal · Current writing",
    title: "Medicine and wellness, read in full context.",
    deck:
      "Reporting, evidence interpretation, and restorative ideas for readers who want rigor without losing sight of lived experience.",
    takeaway:
      "Every XYLENS story begins with the point, names its evidence status, and keeps uncertainty visible.",
    facts: [
      "Authorship and review dates remain visible.",
      "Evidence, interpretation, and possibility are identified separately.",
      "Corrections stay attached to the record.",
    ],
    sections: [
      {
        title: "A calmer reading route",
        body:
          "The journal is organized for readers who may be tired, overloaded, or returning to a subject over several visits. Start with the takeaway, continue through the essential findings, then open methods and source notes when deeper review is useful.",
      },
    ],
  },
  "evidence-reviews": {
    slug: "evidence-reviews",
    eyebrow: "Evidence desk · Review method",
    title: "What the research supports—and what it cannot settle.",
    deck:
      "Structured reviews that show the question, the strongest available sources, the limits of the evidence, and the practical meaning of uncertainty.",
    takeaway:
      "An evidence review is a transparent synthesis of existing research, not a diagnosis, prescription, or new clinical study.",
    facts: [
      "The review question and search boundaries are stated.",
      "Limitations appear before recommendations or interpretation.",
      "Sources and review dates are part of the permanent record.",
    ],
    sections: [
      {
        title: "How confidence is communicated",
        body:
          "XYLENS avoids turning one study or one statistical result into a universal conclusion. Population, comparison, follow-up, missing data, conflicts, and real-world relevance all affect how firmly a finding can carry a claim.",
      },
      {
        title: "What this section does not do",
        body:
          "These pages do not replace individualized medical evaluation. They help readers understand the evidence landscape and prepare better questions for qualified care.",
      },
    ],
  },
  research: {
    slug: "research",
    eyebrow: "Research · Winter lens",
    title: "The structure beneath the headline.",
    deck:
      "Methods, uncertainty, and careful translations of emerging science for people who want to see how a conclusion was built.",
    takeaway:
      "Research coverage should make uncertainty more legible, not make it disappear.",
    facts: [
      "Research updates are time-stamped.",
      "Primary research and evidence synthesis are labeled differently.",
      "Forward-looking ideas are never presented as available care.",
    ],
    sections: [
      {
        title: "Research without theater",
        body:
          "The strongest research communication is proportionate. It explains the design, the population, the outcome, and the remaining questions without using complexity to manufacture authority.",
      },
    ],
  },
  wellness: {
    slug: "wellness",
    eyebrow: "Wellness · Spring lens",
    title: "Restorative practice, held to an honest standard.",
    deck:
      "Nature-aware rituals and daily practices described with practical boundaries, safety context, and no miracle language.",
    takeaway:
      "A modest practice does not need an exaggerated promise to be useful.",
    facts: [
      "Low-burden ideas are framed as optional support.",
      "Safety and access limitations remain visible.",
      "Wellness content never substitutes for needed clinical care.",
    ],
    sections: [
      {
        title: "Whole-person, not evidence-free",
        body:
          "Whole-person health widens the frame to include sleep, place, work, culture, access, movement, and meaning. It does not lower the standard used to evaluate a claim.",
      },
    ],
  },
  navigator: {
    slug: "navigator",
    eyebrow: "Navigator · Practical orientation",
    title: "A clearer path through care information.",
    deck:
      "Plain-language orientation to records, referrals, insurance questions, and the preparation that can make a complex appointment easier to use.",
    takeaway:
      "Navigator content is factual orientation—not personalized medical or legal advice.",
    facts: [
      "No health history is collected on this public page.",
      "Resources are described without promising eligibility or outcomes.",
      "Urgent symptoms belong with emergency or qualified local care.",
    ],
    sections: [
      {
        title: "Prepare without self-diagnosing",
        body:
          "A concise timeline, current medication list, prior results, functional changes, and three priority questions can improve orientation. They cannot determine the cause of symptoms or replace examination.",
      },
      {
        title: "Privacy boundary",
        body:
          "Do not send medical records, symptoms, insurance identifiers, or other sensitive health details through the general contact channel.",
      },
    ],
  },
  about: {
    slug: "about",
    eyebrow: "About XYLENS",
    title: "Independent journalism with clinical discipline.",
    deck:
      "XYLENS translates complex medicine and wellness research into clear, accountable, human-readable guidance from a coastal Southern California perspective.",
    takeaway:
      "The publication exists to make evidence understandable without flattening its uncertainty or the reader’s lived experience.",
    facts: [
      "Independent editorial identity.",
      "Visible authorship, review, and correction records.",
      "Clear boundaries between education, research, and care.",
    ],
    sections: [
      {
        title: "Why the seasons",
        body:
          "Spring, summer, autumn, and winter are editorial lenses—not separate brands. They help the publication shift atmosphere while keeping one consistent standard for clarity, access, and evidence.",
      },
    ],
  },
  contact: {
    slug: "contact",
    eyebrow: "Contact · Subscribe",
    title: "Stay close to the work.",
    deck:
      "Editorial questions, correction requests, accessibility feedback, and partnership inquiries belong here.",
    takeaway:
      "The public contact channel is not monitored for urgent care and should never include private health information.",
    facts: [
      "Newsletter signup will open after a privacy-reviewed provider is connected.",
      "Correction requests are documented and reviewed.",
      "Sensitive medical information should not be submitted.",
    ],
    sections: [
      {
        title: "Contact channel",
        body:
          "A production email and privacy-reviewed newsletter provider are being configured. Until then, the site does not collect or pretend to store subscriber information.",
      },
    ],
  },
  "editorial-standards": {
    slug: "editorial-standards",
    eyebrow: "Trust center · Editorial standards",
    title: "Clarity, accountability, and proportionate claims.",
    deck:
      "The public standard used to separate evidence from interpretation, identify review status, and correct the record.",
    takeaway:
      "Holistic does not mean uncritical: context expands the evidence frame without lowering the standard.",
    facts: [
      "Clinical claims require source support and appropriate review.",
      "Evidence status is explained in plain language.",
      "Sponsorship and conflicts are disclosed where relevant.",
      "Material corrections remain versioned.",
    ],
    sections: [
      {
        title: "Takeaway first, depth on demand",
        body:
          "Important pages begin with one concise statement and a small set of essential findings. Methods, tables, and source notes follow without forcing every reader through the same cognitive load.",
      },
      {
        title: "Claims remain bounded",
        body:
          "XYLENS does not imply diagnosis, prescribing authority, personal treatment, or guaranteed outcomes. Available information and future-facing concepts are kept visibly separate.",
      },
    ],
  },
  "evidence-method": {
    slug: "evidence-method",
    eyebrow: "Trust center · Evidence method",
    title: "How an evidence review is assembled.",
    deck:
      "A practical explanation of question framing, source selection, interpretation, limitation review, and publication checks.",
    takeaway:
      "A transparent review shows both what was found and the boundaries created by the search and source material.",
    facts: [
      "Define the question before searching.",
      "Prefer stable identifiers and primary sources.",
      "Evaluate population, methods, outcomes, and bias.",
      "Name uncertainty and applicability limits.",
    ],
    sections: [
      {
        title: "Review sequence",
        body:
          "Question definition comes first, followed by source discovery, eligibility checks, structured extraction, comparison, limitation review, editorial synthesis, and a dated final review.",
      },
      {
        title: "Living record",
        body:
          "A review can change when stronger evidence appears. Modified dates and correction notes help readers understand what changed without erasing the earlier record.",
      },
    ],
  },
  corrections: {
    slug: "corrections",
    eyebrow: "Trust center · Corrections",
    title: "Correct the record without hiding the history.",
    deck:
      "How factual errors, clarity changes, evidence-impacting updates, and reader concerns are reviewed.",
    takeaway:
      "Material corrections remain attached to the article with a date, version, and plain-language summary.",
    facts: [
      "Minor copy edits may not require a public note.",
      "Factual and evidence-impacting changes do.",
      "A correction request is reviewed, not automatically accepted or dismissed.",
    ],
    sections: [
      {
        title: "Correction record",
        body:
          "When a change affects meaning, evidence interpretation, attribution, or safety context, the article receives a visible correction entry and a new review date.",
      },
    ],
  },
  privacy: {
    slug: "privacy",
    eyebrow: "Trust center · Privacy",
    title: "Collect less. Explain what remains.",
    deck:
      "The public publication is designed to minimize collection and keep health details out of general communication channels.",
    takeaway:
      "XYLENS does not currently operate a public patient intake or collect health information through its newsletter area.",
    facts: [
      "No advertising profile is needed to read the journal.",
      "No health details should be submitted through general contact.",
      "New providers require privacy and data-flow review before launch.",
    ],
    sections: [
      {
        title: "Current state",
        body:
          "The site serves public editorial pages. A newsletter provider, analytics provider, and production contact workflow are not represented as active until they are configured and reviewed.",
      },
    ],
  },
  terms: {
    slug: "terms",
    eyebrow: "Trust center · Terms",
    title: "Terms for using the public journal.",
    deck:
      "Plain-language boundaries for educational use, intellectual property, external links, and responsible access.",
    takeaway:
      "XYLENS provides educational journalism, not individualized professional services.",
    facts: [
      "Content may not be presented as personal medical advice.",
      "External sources remain responsible for their own content.",
      "Access may change as the publication develops.",
    ],
    sections: [
      {
        title: "Educational use",
        body:
          "Readers may use the publication to learn and prepare questions. Decisions about symptoms, diagnosis, medication, treatment, or emergencies require appropriately qualified care.",
      },
    ],
  },
  accessibility: {
    slug: "accessibility",
    eyebrow: "Trust center · Accessibility",
    title: "A journal that does not make attention a test.",
    deck:
      "XYLENS aims for WCAG 2.2 AA and designs for keyboard access, reduced motion, readable contrast, and lower cognitive burden.",
    takeaway:
      "Accessibility is part of editorial accuracy: information is not clear if a reader cannot reach or process it.",
    facts: [
      "Keyboard-visible focus and skip navigation.",
      "Reduced-motion behavior for cinematic effects.",
      "Captions, transcripts, alt text, and readable line lengths.",
      "No essential status communicated by color alone.",
    ],
    sections: [
      {
        title: "Feedback",
        body:
          "Accessibility issues are treated as publication issues. The production contact channel will include a dedicated path for reporting barriers when it is configured.",
      },
    ],
  },
  "medical-disclaimer": {
    slug: "medical-disclaimer",
    eyebrow: "Trust center · Medical information",
    title: "Education is not individualized care.",
    deck:
      "The journal explains evidence and health topics for general readers. It does not evaluate symptoms, diagnose conditions, prescribe treatment, or establish a clinician-patient relationship.",
    takeaway:
      "Use XYLENS to understand a subject and prepare questions—not to replace qualified medical care.",
    facts: [
      "Urgent or severe symptoms require appropriate local emergency care.",
      "Personal circumstances can change what information applies.",
      "No article guarantees benefit or rules out harm.",
    ],
    sections: [
      {
        title: "Scope",
        body:
          "Even careful educational material cannot account for examination findings, medical history, medication interactions, pregnancy, disability, access, or individual risk. Those boundaries should remain visible wherever clinical topics appear.",
      },
    ],
  },
};

export const editorialPageOrder = Object.keys(editorialPages);
