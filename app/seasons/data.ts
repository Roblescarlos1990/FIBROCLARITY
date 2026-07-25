import {
  assertPublicRecord,
  evidenceStatusDefinitions,
  type EditorialGovernance,
  type EvidenceStatus,
} from "../editorial/model";

export type SeasonSlug = "spring" | "summer" | "autumn" | "winter";

export type MediaType =
  | "photo"
  | "gallery"
  | "video"
  | "interview"
  | "documentary";

export type SeasonalMedia = {
  id: string;
  season: SeasonSlug;
  type: MediaType;
  title: string;
  description: string;
  thumbnail: string;
  mediaSource?: string;
  galleryImages?: string[];
  author: string;
  publishedAt: string;
  category: string;
  duration?: string;
  alt: string;
  credit?: string;
  transcript?: string;
  captionSource?: string;
};

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image"; src: string; alt: string; caption: string };

type SeasonalArticleCore = {
  slug: string;
  season: SeasonSlug;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  featuredImage: string;
  imageAlt: string;
  content: ArticleBlock[];
  relatedArticles: string[];
};

export type SeasonalArticle = SeasonalArticleCore &
  EditorialGovernance & {
    publishedAtISO: string;
    reviewedAtISO: string;
  };

type SeasonalArticleInput = SeasonalArticleCore;

export type SeasonDefinition = {
  slug: SeasonSlug;
  number: string;
  label: string;
  lens: string;
  kicker: string;
  title: string;
  subtitle: string;
  location: string;
  atmosphere: string;
  heroImage: string;
  heroAlt: string;
  media: SeasonalMedia[];
  articles: SeasonalArticle[];
};

const images = {
  coast:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=88",
  greenCoast:
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=2200&q=88",
  wetForest:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=88",
  leaves:
    "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1800&q=86",
  wildCoast:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2200&q=88",
  warmBeach:
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=2200&q=88",
  water:
    "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=2000&q=86",
  desert:
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2200&q=88",
  amberForest:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2200&q=88",
  driftwood:
    "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=2000&q=86",
  mountain:
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2200&q=88",
  winterForest:
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=88",
  fog:
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=88",
} as const;

const coastalVideo =
  "https://videos.pexels.com/video-files/1550080/1550080-hd_1920_1080_30fps.mp4";

const commonArticleImage = {
  spring: images.wetForest,
  summer: images.coast,
  autumn: images.amberForest,
  winter: images.mountain,
} satisfies Record<SeasonSlug, string>;

export const seasonOrder: SeasonSlug[] = [
  "spring",
  "summer",
  "autumn",
  "winter",
];

export const seasons: Record<SeasonSlug, SeasonDefinition> = {
  spring: {
    slug: "spring",
    number: "01",
    label: "Spring",
    lens: "Wellness",
    kicker: "Restorative practice · Coastal fieldwork",
    title: "The season of return.",
    subtitle:
      "Fresh evidence, small rituals, and observations from a coast waking slowly beneath the marine layer.",
    location: "Torrey Pines · San Diego",
    atmosphere: "Light rain · New growth · 61°F",
    heroImage: images.greenCoast,
    heroAlt: "Green coastal meadow opening toward a misty horizon",
    media: [
      {
        id: "spring-rain-study",
        season: "spring",
        type: "gallery",
        title: "After the first rain",
        description:
          "A photographic field study of water, attention, and the return of green along the coastal bluffs.",
        thumbnail: images.greenCoast,
        galleryImages: [images.greenCoast, images.wetForest, images.leaves],
        author: "Mara Vale",
        publishedAt: "March 18, 2026",
        category: "Photo essay",
        alt: "Green coastal landscape after rain",
      },
      {
        id: "spring-breath",
        season: "spring",
        type: "video",
        title: "Five minutes beneath the canopy",
        description:
          "A quiet, evidence-aware orientation practice filmed beneath rain-darkened oak branches.",
        thumbnail: images.wetForest,
        mediaSource: coastalVideo,
        author: "Dr. Lena Ortiz",
        publishedAt: "March 25, 2026",
        category: "Guided practice",
        duration: "05:12",
        alt: "Sunlight passing through a wet forest canopy",
      },
      {
        id: "spring-plants",
        season: "spring",
        type: "interview",
        title: "What plants can—and cannot—promise",
        description:
          "An herbalist and a pharmacologist discuss tradition, active compounds, uncertainty, and safety.",
        thumbnail: images.leaves,
        mediaSource: coastalVideo,
        author: "Jonah Reed",
        publishedAt: "April 02, 2026",
        category: "Conversation",
        duration: "18:40",
        alt: "Lush green leaves in soft spring light",
      },
    ],
    articles: [],
  },
  summer: {
    slug: "summer",
    number: "02",
    label: "Summer",
    lens: "Field Notes",
    kicker: "Independent journalism · Life in full view",
    title: "A wider horizon.",
    subtitle:
      "Long light, salt air, and reporting on the systems that shape how coastal communities live and heal.",
    location: "Sunset Cliffs · San Diego",
    atmosphere: "Warm marine air · Clear water · 74°F",
    heroImage: images.coast,
    heroAlt: "Turquoise ocean meeting a pale sun-washed shore",
    media: [
      {
        id: "summer-waterline",
        season: "summer",
        type: "documentary",
        title: "Life at the waterline",
        description:
          "A short documentary about public coastlines, access, heat, and the health of a city by the sea.",
        thumbnail: images.coast,
        mediaSource: coastalVideo,
        author: "XYLENS Films",
        publishedAt: "June 12, 2026",
        category: "Documentary",
        duration: "12:08",
        alt: "Bright turquoise water along a sandy coast",
      },
      {
        id: "summer-blue-hour",
        season: "summer",
        type: "gallery",
        title: "The blue hour swimmers",
        description:
          "Portraits of the people who enter the Pacific before the city has fully awakened.",
        thumbnail: images.warmBeach,
        galleryImages: [images.warmBeach, images.water, images.wildCoast],
        author: "Sofia Merritt",
        publishedAt: "June 28, 2026",
        category: "Photo essay",
        alt: "Warm early light over a coastal beach",
      },
      {
        id: "summer-tide",
        season: "summer",
        type: "photo",
        title: "Tide as a clock",
        description:
          "A visual meditation on repetition, circadian cues, and the difference between rhythm and routine.",
        thumbnail: images.water,
        mediaSource: images.water,
        author: "Calder North",
        publishedAt: "July 06, 2026",
        category: "Field study",
        alt: "Textured blue ocean surface in sunlight",
      },
    ],
    articles: [],
  },
  autumn: {
    slug: "autumn",
    number: "03",
    label: "Autumn",
    lens: "Medicine",
    kicker: "Clinical context · The body in change",
    title: "Read the turning light.",
    subtitle:
      "Medicine, uncertainty, and the body’s adaptations—reported in copper weather and late-afternoon clarity.",
    location: "La Jolla · San Diego",
    atmosphere: "Dry turning wind · Amber light · 67°F",
    heroImage: images.amberForest,
    heroAlt: "Warm copper landscape under cinematic late-afternoon light",
    media: [
      {
        id: "autumn-pain-map",
        season: "autumn",
        type: "video",
        title: "Pain is not a single signal",
        description:
          "A visual explainer on nociception, prediction, context, and why persistent pain resists simple stories.",
        thumbnail: images.amberForest,
        mediaSource: coastalVideo,
        author: "Dr. Elias Wynn",
        publishedAt: "September 14, 2025",
        category: "Clinical explainer",
        duration: "09:22",
        alt: "Amber hillside beneath dramatic autumn light",
      },
      {
        id: "autumn-driftwood",
        season: "autumn",
        type: "gallery",
        title: "Structures left by the tide",
        description:
          "Driftwood, scar tissue, and a photographic study of repair without erasure.",
        thumbnail: images.driftwood,
        galleryImages: [images.driftwood, images.desert, images.amberForest],
        author: "Sofia Merritt",
        publishedAt: "October 03, 2025",
        category: "Photo essay",
        alt: "Weathered natural forms in warm brown tones",
      },
      {
        id: "autumn-clinic",
        season: "autumn",
        type: "interview",
        title: "Inside the long appointment",
        description:
          "A clinician explains what careful history-taking reveals when symptoms cross specialties.",
        thumbnail: images.desert,
        mediaSource: coastalVideo,
        author: "Mara Vale",
        publishedAt: "October 17, 2025",
        category: "Interview",
        duration: "21:05",
        alt: "Weathered copper desert forms at dusk",
      },
    ],
    articles: [],
  },
  winter: {
    slug: "winter",
    number: "04",
    label: "Winter",
    lens: "Research",
    kicker: "Evidence review · The structure beneath",
    title: "Clarity in the quiet.",
    subtitle:
      "Deep reviews, visible uncertainty, and the patient work of seeing what remains when noise falls away.",
    location: "Pacific Headlands · California",
    atmosphere: "Low fog · Silver weather · 52°F",
    heroImage: images.mountain,
    heroAlt: "Cold mountain ridge fading into a pale winter sky",
    media: [
      {
        id: "winter-evidence",
        season: "winter",
        type: "documentary",
        title: "How evidence changes shape",
        description:
          "From observation to trial to clinical guideline: a quiet tour through the hierarchy and its limits.",
        thumbnail: images.mountain,
        mediaSource: coastalVideo,
        author: "XYLENS Research Desk",
        publishedAt: "December 08, 2025",
        category: "Research film",
        duration: "14:32",
        alt: "Pale winter mountains beneath a cold blue sky",
      },
      {
        id: "winter-fog-index",
        season: "winter",
        type: "gallery",
        title: "An index of fog",
        description:
          "Four kinds of uncertainty, photographed along a coastline where distance keeps changing.",
        thumbnail: images.fog,
        galleryImages: [images.fog, images.winterForest, images.mountain],
        author: "Calder North",
        publishedAt: "December 19, 2025",
        category: "Visual index",
        alt: "Fog moving across a muted winter landscape",
      },
      {
        id: "winter-review",
        season: "winter",
        type: "interview",
        title: "What a systematic review can miss",
        description:
          "A methodologist on publication bias, lived experience, and reading confidence intervals with humility.",
        thumbnail: images.winterForest,
        mediaSource: coastalVideo,
        author: "Jonah Reed",
        publishedAt: "January 11, 2026",
        category: "Methods interview",
        duration: "24:18",
        alt: "Dark evergreen forest softened by winter mist",
      },
    ],
    articles: [],
  },
};

const articleSets: Record<SeasonSlug, SeasonalArticleInput[]> = {
  spring: [
    {
      slug: "the-restorative-hour",
      season: "spring",
      title: "The restorative hour",
      subtitle:
        "Why a useful recovery practice begins with capacity, not optimization.",
      excerpt:
        "Rest is often marketed as a performance tool. The evidence points toward something slower, more individual, and less measurable.",
      author: "Dr. Lena Ortiz",
      publishedAt: "April 09, 2026",
      readingTime: "8 min read",
      category: "Wellness",
      featuredImage: images.greenCoast,
      imageAlt: "Green coastal field beneath diffuse spring light",
      relatedArticles: ["attention-after-rain"],
      content: [
        {
          type: "paragraph",
          text: "The modern wellness industry tends to describe rest as preparation for more work. That framing is efficient, appealing, and incomplete. Recovery is not only a way to restore output; it is also a biological and psychological need with its own value.",
        },
        {
          type: "heading",
          text: "Begin with the nervous system you have",
        },
        {
          type: "paragraph",
          text: "A practice that settles one person may feel effortful to another. Breath pacing, quiet walking, gentle mobility, and time outdoors can all be useful, but none should be treated as a universal prescription. The relevant question is whether the practice reduces demand without creating a new test to pass.",
        },
        {
          type: "quote",
          text: "Rest becomes restorative when it stops asking us to prove that we are doing it correctly.",
          attribution: "XYLENS editorial note",
        },
        {
          type: "image",
          src: images.wetForest,
          alt: "Wet woodland path beneath spring leaves",
          caption:
            "Environmental cues can support downshifting, but access, safety, pain, and sensory tolerance all shape the experience.",
        },
        {
          type: "heading",
          text: "Keep the claim proportional",
        },
        {
          type: "paragraph",
          text: "A short restorative practice may change perceived stress, breathing rate, or attention in the moment. It is not a substitute for treatment, sleep, structural support, or medical evaluation. Its value does not need to be exaggerated to be real.",
        },
      ],
    },
    {
      slug: "attention-after-rain",
      season: "spring",
      title: "Attention after rain",
      subtitle:
        "A field note on novelty, sensory detail, and the limits of the nature prescription.",
      excerpt:
        "The coast looks newly made after a storm. What changes in us when a familiar place becomes noticeable again?",
      author: "Mara Vale",
      publishedAt: "April 21, 2026",
      readingTime: "6 min read",
      category: "Field Notes",
      featuredImage: images.wetForest,
      imageAlt: "Rain-darkened woodland glowing with new leaves",
      relatedArticles: ["the-restorative-hour"],
      content: [
        {
          type: "paragraph",
          text: "After rain, the ordinary world acquires edges. Bark darkens. Dust settles. Small leaves reflect more light than their size should allow. Attention arrives before interpretation.",
        },
        {
          type: "quote",
          text: "Observation can be useful without becoming a cure.",
        },
        {
          type: "paragraph",
          text: "Research on green space and wellbeing is encouraging, but it is shaped by access, neighborhood conditions, mobility, culture, and the difficulty of separating nature from everything that surrounds it. A walk is not the same intervention for every body or every place.",
        },
        {
          type: "heading",
          text: "Notice first",
        },
        {
          type: "paragraph",
          text: "The practice here is deliberately modest: notice three changes in a familiar environment. No score, no streak, no promise. The point is not to become better at attention. It is to let the world become specific again.",
        },
      ],
    },
  ],
  summer: [
    {
      slug: "the-public-coast",
      season: "summer",
      title: "The public coast",
      subtitle:
        "Heat, access, and the health infrastructure hidden inside a day at the beach.",
      excerpt:
        "A shoreline can be recreation, refuge, workplace, and public-health resource at the same time.",
      author: "Mara Vale",
      publishedAt: "July 02, 2026",
      readingTime: "11 min read",
      category: "Journalism",
      featuredImage: images.coast,
      imageAlt: "Bright blue water beside a public beach",
      relatedArticles: ["morning-light-without-hype"],
      content: [
        {
          type: "paragraph",
          text: "On a hot afternoon, the coast operates like public infrastructure. The air is cooler, movement is possible, and people gather without purchasing admission. But the benefits depend on transit, parking, shade, water quality, disability access, and who can afford the time required to arrive.",
        },
        {
          type: "heading",
          text: "Access is a health variable",
        },
        {
          type: "paragraph",
          text: "Studies that link coastal proximity with wellbeing often describe an average. The lived distribution is less even. A view from a private terrace and a two-hour bus ride to an unshaded beach are both counted as contact with the coast, yet they represent different exposures and different burdens.",
        },
        {
          type: "image",
          src: images.warmBeach,
          alt: "Sun-washed beach with water meeting the horizon",
          caption:
            "The restorative potential of a place depends on whether people can reach it, remain safely, and feel that they belong there.",
        },
        {
          type: "quote",
          text: "A healthy coastline is not only clean water. It is meaningful access to clean water.",
          attribution: "XYLENS field desk",
        },
        {
          type: "paragraph",
          text: "Coastal policy therefore belongs in a health conversation. Shade structures, safe crossings, frequent transit, public bathrooms, water testing, and multilingual warnings may matter as much as the scenic qualities that make the coast easy to romanticize.",
        },
      ],
    },
    {
      slug: "morning-light-without-hype",
      season: "summer",
      title: "Morning light, without the hype",
      subtitle:
        "What circadian science supports—and where popular advice outruns the evidence.",
      excerpt:
        "Early daylight is a meaningful biological cue. It is not a moral achievement or a cure-all.",
      author: "Jonah Reed",
      publishedAt: "July 16, 2026",
      readingTime: "9 min read",
      category: "Evidence in context",
      featuredImage: images.warmBeach,
      imageAlt: "Warm sunrise light over a quiet beach",
      relatedArticles: ["the-public-coast"],
      content: [
        {
          type: "paragraph",
          text: "Light is one of the strongest signals used by the circadian system. Morning exposure can help anchor timing, particularly when nights are dim and daily schedules are consistent. The practical story, however, is more conditional than the internet version.",
        },
        {
          type: "heading",
          text: "Timing, intensity, and the person",
        },
        {
          type: "paragraph",
          text: "The effect of light depends on when it is received, how bright it is, what the prior light environment looked like, and the individual’s circadian phase. Shift work, medications, eye conditions, migraine, bipolar disorder, and sleep disorders can change what advice is appropriate.",
        },
        {
          type: "quote",
          text: "A useful cue is not the same thing as a universal protocol.",
        },
        {
          type: "paragraph",
          text: "For many people, spending a little time outside after waking is a reasonable low-cost habit. It should be presented as one supportive input among many—not as a test of discipline and not as a replacement for clinical care.",
        },
      ],
    },
  ],
  autumn: [
    {
      slug: "pain-is-a-protection-system",
      season: "autumn",
      title: "Pain is a protection system",
      subtitle:
        "A clearer model for understanding persistent pain without implying that symptoms are imagined.",
      excerpt:
        "Pain is real, biological, and influenced by more than tissue damage. That complexity should expand care—not diminish it.",
      author: "Dr. Elias Wynn",
      publishedAt: "October 08, 2025",
      readingTime: "13 min read",
      category: "Medicine",
      featuredImage: images.amberForest,
      imageAlt: "Copper-colored ridgeline in late afternoon",
      relatedArticles: ["the-long-appointment"],
      content: [
        {
          type: "paragraph",
          text: "Pain is often described as if it were a direct meter of tissue damage. Acute injury can make that relationship feel obvious, but the nervous system is not a passive wire. It evaluates threat using sensory input, context, memory, immune activity, expectation, and the state of the body.",
        },
        {
          type: "heading",
          text: "Complex does not mean imaginary",
        },
        {
          type: "paragraph",
          text: "When pain persists after tissues have healed—or exceeds what imaging appears to explain—the experience remains real. The mismatch is not proof of fabrication. It is evidence that protection systems can become sensitized, predictions can remain cautious, and multiple biological layers may be involved.",
        },
        {
          type: "quote",
          text: "The opposite of a simple structural explanation is not ‘all in your head.’ It is a more complete nervous-system explanation.",
        },
        {
          type: "image",
          src: images.driftwood,
          alt: "Weathered driftwood with layered grain",
          caption:
            "Persistent pain often reflects layered history: injury, inflammation, sleep, stress physiology, movement, meaning, and environment.",
        },
        {
          type: "paragraph",
          text: "Good care may include medical evaluation, targeted rehabilitation, medication, pacing, sleep support, psychological tools, and social changes. The mix varies. Any model that blames the patient or promises a single reset is too small for the evidence.",
        },
      ],
    },
    {
      slug: "the-long-appointment",
      season: "autumn",
      title: "The long appointment",
      subtitle:
        "Why complex symptoms often require time that the healthcare system does not routinely provide.",
      excerpt:
        "A careful history is diagnostic work. What happens when the schedule makes that work nearly impossible?",
      author: "Mara Vale",
      publishedAt: "October 22, 2025",
      readingTime: "10 min read",
      category: "Care systems",
      featuredImage: images.desert,
      imageAlt: "Layered desert landscape in muted copper tones",
      relatedArticles: ["pain-is-a-protection-system"],
      content: [
        {
          type: "paragraph",
          text: "Complex symptoms rarely arrive in chronological order. Patients compress years into minutes, clinicians search for red flags, and administrative systems reward a level of speed that can make pattern recognition harder.",
        },
        {
          type: "heading",
          text: "Time changes the quality of the data",
        },
        {
          type: "paragraph",
          text: "A longer appointment does not guarantee a diagnosis, but it can reveal relationships among symptoms, medications, sleep, exposures, function, and prior treatment. The history becomes more than a preface to testing; it becomes evidence in its own right.",
        },
        {
          type: "quote",
          text: "Listening is not the absence of medical action. Done carefully, it is part of medical action.",
        },
        {
          type: "paragraph",
          text: "The burden cannot fall entirely on individual clinicians. Better templates, pre-visit histories, multidisciplinary pathways, and payment models that recognize cognitive work are system-level interventions. Without them, the long appointment remains a privilege rather than a standard.",
        },
      ],
    },
  ],
  winter: [
    {
      slug: "reading-uncertainty",
      season: "winter",
      title: "Reading uncertainty",
      subtitle:
        "Confidence intervals, missing data, and a more useful way to ask whether a result matters.",
      excerpt:
        "A study can be statistically persuasive and clinically modest—or genuinely important while still uncertain.",
      author: "Jonah Reed",
      publishedAt: "January 08, 2026",
      readingTime: "12 min read",
      category: "Research methods",
      featuredImage: images.mountain,
      imageAlt: "Snowy mountain ridge under a restrained winter sky",
      relatedArticles: ["when-the-review-is-not-the-final-word"],
      content: [
        {
          type: "paragraph",
          text: "Scientific findings are often translated into a binary: the intervention worked or it did not. The underlying estimate is usually less certain. A confidence interval describes a range of values compatible with the data and model, not a guarantee that the true effect sits neatly at its center.",
        },
        {
          type: "heading",
          text: "Precision is part of the result",
        },
        {
          type: "paragraph",
          text: "A wide interval may include meaningful benefit, negligible change, and possible harm. That does not make the study useless. It tells us that the estimate is imprecise and that decisions should reflect the stakes, alternatives, costs, and preferences involved.",
        },
        {
          type: "quote",
          text: "Uncertainty is not a defect to hide. It is information about how firmly the evidence can carry a claim.",
        },
        {
          type: "image",
          src: images.fog,
          alt: "A distant landscape partially obscured by fog",
          caption:
            "A transparent evidence review shows what can be seen clearly, what remains obscured, and why.",
        },
        {
          type: "paragraph",
          text: "Readers deserve more than significance stars. They need absolute effects, comparison groups, follow-up time, missing data, conflicts of interest, and an explanation of whether the measured outcome resembles the outcome people actually care about.",
        },
      ],
    },
    {
      slug: "when-the-review-is-not-the-final-word",
      season: "winter",
      title: "When the review is not the final word",
      subtitle:
        "Systematic reviews sit high in the evidence hierarchy, but their conclusions inherit the limits of what was studied.",
      excerpt:
        "Combining weak, narrow, or inconsistent studies does not automatically produce a complete answer.",
      author: "XYLENS Research Desk",
      publishedAt: "January 21, 2026",
      readingTime: "10 min read",
      category: "Evidence review",
      featuredImage: images.winterForest,
      imageAlt: "Evergreen forest softened by winter mist",
      relatedArticles: ["reading-uncertainty"],
      content: [
        {
          type: "paragraph",
          text: "A systematic review is a method, not a magic transformation. Its reliability depends on the search, inclusion criteria, measurement quality, comparability of studies, and whether unpublished results remain invisible.",
        },
        {
          type: "heading",
          text: "The map reflects the territory surveyed",
        },
        {
          type: "paragraph",
          text: "If trials exclude older adults, complex patients, pregnant people, or those taking multiple medications, the review may be internally careful and still difficult to apply. Evidence hierarchies help organize confidence; they do not remove the need for judgment.",
        },
        {
          type: "quote",
          text: "The strongest available evidence can still be incomplete evidence.",
        },
        {
          type: "paragraph",
          text: "A responsible summary should name the population, intervention, comparator, outcomes, time horizon, and certainty. It should also state who was not represented and what questions the review was never designed to answer.",
        },
      ],
    },
  ],
};

function toISODate(value: string) {
  return new Date(`${value} 12:00:00 UTC`).toISOString().slice(0, 10);
}

function resolveEvidenceStatus(article: SeasonalArticleInput): EvidenceStatus {
  const label = `${article.category} ${article.title}`.toLowerCase();
  if (label.includes("evidence") || label.includes("research")) {
    return "Evidence Review";
  }
  if (article.category === "Medicine") {
    return "Research Update";
  }
  return "Research Update";
}

function publishArticle(article: SeasonalArticleInput): SeasonalArticle {
  const evidenceStatus = resolveEvidenceStatus(article);
  const reviewedAt = article.publishedAt;
  const published: SeasonalArticle = {
    ...article,
    status: "published",
    visibility: "public",
    contentType: article.category,
    evidenceStatus,
    evidenceDefinition: evidenceStatusDefinitions[evidenceStatus],
    reviewer: "XYLENS Editorial Desk",
    reviewerRole: "Editorial review",
    reviewedAt,
    publishedAtISO: toISODate(article.publishedAt),
    reviewedAtISO: toISODate(reviewedAt),
    takeaway: article.excerpt,
    keyFindings: [
      article.subtitle,
      "The practical meaning depends on context, access, and the individual.",
      "The claim should remain proportional to the evidence described.",
    ],
    limitations: [
      "This article is educational journalism and cannot account for an individual medical history or examination.",
      "Source coverage and interpretation should be revisited as stronger evidence becomes available.",
    ],
    reviewMethod:
      "Editorial synthesis of the stated topic, reviewed for clarity, proportional language, internal consistency, and visible limitations.",
    citations: [],
    disclosures: ["No commercial sponsorship is represented in this edition."],
    correctionHistory: [
      {
        version: "1.0",
        date: reviewedAt,
        summary: "Initial public edition.",
      },
    ],
    seoTitle: article.title,
    seoDescription: article.excerpt,
  };
  assertPublicRecord(published);
  return published;
}

for (const slug of seasonOrder) {
  seasons[slug].articles = articleSets[slug].map(publishArticle);
}

export function isSeasonSlug(value: string): value is SeasonSlug {
  return seasonOrder.includes(value as SeasonSlug);
}

export function getSeasonArticle(
  season: SeasonSlug,
  slug: string,
): SeasonalArticle | undefined {
  return seasons[season].articles.find(
    (article) =>
      article.slug === slug &&
      article.status === "published" &&
      article.visibility === "public",
  );
}

export function getAllArticles() {
  return seasonOrder
    .flatMap((season) => seasons[season].articles)
    .filter(
      (article) =>
        article.status === "published" && article.visibility === "public",
    );
}

export function getRelatedArticles(article: SeasonalArticle) {
  return article.relatedArticles
    .map((slug) => getSeasonArticle(article.season, slug))
    .filter((item): item is SeasonalArticle => Boolean(item));
}

export const seasonFallbackImage = commonArticleImage;
