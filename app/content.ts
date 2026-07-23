export type Lens = "Medicine" | "Wellness" | "Research" | "Field Notes";

export type Article = {
  title: string;
  dek: string;
  category: Lens;
  topic: string;
  readTime: string;
  date: string;
  accent: "moss" | "rust" | "tide" | "silver" | "gold" | "plum";
  featured?: boolean;
};

export const articles: Article[] = [
  {
    title: "Fibromyalgia, Reframed",
    dek: "A systems-level review of pain processing, phenotype diversity, and the evidence gaps that still shape care.",
    category: "Research",
    topic: "State of the science",
    readTime: "18 min read",
    date: "Jul 19, 2026",
    accent: "plum",
    featured: true,
  },
  {
    title: "When Balance Becomes a Prediction Problem",
    dek: "Understanding persistent postural-perceptual dizziness through sensory weighting, threat appraisal, and rehabilitation.",
    category: "Medicine",
    topic: "Neuro-otology",
    readTime: "14 min read",
    date: "Jul 17, 2026",
    accent: "tide",
    featured: true,
  },
  {
    title: "The Skin–Nervous System Conversation",
    dek: "What neurodermatology can teach us about itch, pain, stress, and the boundary between body systems.",
    category: "Research",
    topic: "Neurodermatology",
    readTime: "11 min read",
    date: "Jul 15, 2026",
    accent: "rust",
    featured: true,
  },
  {
    title: "A Five-Minute Practice for Nervous-System Downshifting",
    dek: "A grounded breathing and orientation ritual—with a clear look at what it can and cannot do.",
    category: "Wellness",
    topic: "Restorative practice",
    readTime: "5 min read",
    date: "Jul 12, 2026",
    accent: "moss",
  },
  {
    title: "The True Cost of Finding Specialized Care",
    dek: "Travel, wait times, insurance friction, and the hidden labor behind access to multidisciplinary treatment.",
    category: "Medicine",
    topic: "Care access",
    readTime: "9 min read",
    date: "Jul 09, 2026",
    accent: "gold",
  },
  {
    title: "After the Marine Layer",
    dek: "A coastal field note on morning light, circadian timing, and letting observation stay separate from prescription.",
    category: "Field Notes",
    topic: "Coastal journal",
    readTime: "4 min read",
    date: "Jul 05, 2026",
    accent: "silver",
  },
  {
    title: "TMJ, Trigeminal Input, and Persistent Dizziness",
    dek: "Mapping a plausible clinical overlap without turning correlation into certainty.",
    category: "Research",
    topic: "Evidence review",
    readTime: "16 min read",
    date: "Jun 28, 2026",
    accent: "rust",
  },
  {
    title: "What We Mean When We Say Holistic",
    dek: "Whole-person care should widen the evidence frame—not lower the standard of evidence.",
    category: "Field Notes",
    topic: "Editorial",
    readTime: "6 min read",
    date: "Jun 21, 2026",
    accent: "moss",
  },
];

export const lensCopy: Record<
  Lens,
  { kicker: string; title: string; description: string }
> = {
  Medicine: {
    kicker: "Autumn · The body in change",
    title: "Medicine",
    description:
      "Clinical explanations, care pathways, and practical context for complex health questions.",
  },
  Wellness: {
    kicker: "Spring · Restorative practice",
    title: "Wellness",
    description:
      "Nature-aware rituals and daily practices—held to an honest standard of evidence.",
  },
  Research: {
    kicker: "Winter · The structure beneath",
    title: "Research",
    description:
      "Deep reviews, uncertainty maps, and clear translations of emerging science.",
  },
  "Field Notes": {
    kicker: "Summer · Life in full view",
    title: "Field Notes",
    description:
      "Independent journalism at the intersection of health, place, culture, and ecology.",
  },
};
