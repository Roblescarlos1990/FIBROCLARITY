import { articles } from "../content";
import { editorialPages } from "../editorial/pages";
import { foundation } from "../foundation";

export type AdminView =
  | "overview"
  | "editor"
  | "articles"
  | "media"
  | "inbox"
  | "analytics"
  | "navigation"
  | "settings";

export type ContentStatus = "Draft" | "In review" | "Published";

export type AdminTile = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
  linkLabel: string;
  linkHref: string;
  accent: string;
  visible: boolean;
};

export type AdminSection = {
  id: string;
  type: "hero" | "tile-grid" | "article-list" | "text" | "newsletter";
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  layout: "full" | "split" | "grid-2" | "grid-3";
  visible: boolean;
  tiles: AdminTile[];
};

export type AdminPage = {
  id: string;
  name: string;
  path: string;
  description: string;
  status: ContentStatus;
  updatedAt: string;
  sections: AdminSection[];
};

export type AdminMediaItem = {
  id: string;
  name: string;
  kind: "image" | "video" | "document";
  src: string;
  alt: string;
  size: string;
};

export type AdminNavigationItem = {
  id: string;
  label: string;
  href: string;
  visible: boolean;
};

export type AdminDocument = {
  version: number;
  site: {
    title: string;
    masthead: string;
    tagline: string;
    description: string;
    primaryColor: string;
    accentColor: string;
  };
  pages: AdminPage[];
  navigation: AdminNavigationItem[];
  media: AdminMediaItem[];
};

const homeSections: AdminSection[] = [
  {
    id: "home-hero",
    type: "hero",
    label: "Living Lens hero",
    eyebrow: foundation.publication.eyebrow,
    title: `${foundation.publication.hero.headline_primary} ${foundation.publication.hero.headline_accent}`,
    description: foundation.publication.hero.description,
    layout: "split",
    visible: true,
    tiles: [
      {
        id: "home-hero-cta",
        eyebrow: "Primary action",
        title: foundation.publication.hero.primary_action,
        body: foundation.publication.hero.secondary_action,
        meta: "Hero navigation",
        linkLabel: foundation.publication.hero.primary_action,
        linkHref: "#journal",
        accent: "#39766d",
        visible: true,
      },
    ],
  },
  {
    id: "home-featured",
    type: "tile-grid",
    label: "Editor’s picks",
    eyebrow: "The Edit · Editor’s picks",
    title: "Ideas worth sitting with.",
    description:
      "Long reads and field notes selected for clarity, consequence, and their ability to change the way we see health.",
    layout: "grid-3",
    visible: true,
    tiles: articles
      .filter((article) => article.featured)
      .map((article, index) => ({
        id: `featured-${index + 1}`,
        eyebrow: article.topic,
        title: article.title,
        body: article.dek,
        meta: `${article.category} · ${article.readTime}`,
        linkLabel: "Explore story",
        linkHref: "/journal",
        accent:
          index === 0 ? "#816c79" : index === 1 ? "#61908d" : "#b17352",
        visible: true,
      })),
  },
  {
    id: "home-library",
    type: "article-list",
    label: "Recently published",
    eyebrow: "The learning center",
    title: "Recently published",
    description:
      "The unified journal archive for medicine, wellness, research, and field reporting.",
    layout: "full",
    visible: true,
    tiles: articles.map((article, index) => ({
      id: `article-${index + 1}`,
      eyebrow: article.category,
      title: article.title,
      body: article.dek,
      meta: `${article.date} · ${article.readTime}`,
      linkLabel: "Open article",
      linkHref: "/journal",
      accent: ["#816c79", "#61908d", "#b17352", "#708f75"][index % 4],
      visible: true,
    })),
  },
  {
    id: "home-standard",
    type: "text",
    label: "Editorial standard",
    eyebrow: "The XYLENS standard",
    title: "Holistic does not mean uncritical.",
    description:
      "Whole-person health deserves context and curiosity—along with explicit sourcing, careful language, and a visible line between evidence, interpretation, and possibility.",
    layout: "split",
    visible: true,
    tiles: [],
  },
  {
    id: "home-newsletter",
    type: "newsletter",
    label: "Field Notes signup",
    eyebrow: "Field Notes · Twice monthly",
    title: "A slower kind of health news.",
    description:
      "One important study, one restorative idea, and one observation from the living world. No panic. No miracle language.",
    layout: "split",
    visible: true,
    tiles: [],
  },
];

const editorialAdminPages: AdminPage[] = Object.values(editorialPages).map(
  (page) => ({
    id: `page-${page.slug}`,
    name: page.slug
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" "),
    path: `/${page.slug}`,
    description: page.deck,
    status: "Published",
    updatedAt: "Jul 25, 2026",
    sections: [
      {
        id: `${page.slug}-hero`,
        type: "hero",
        label: "Page introduction",
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.deck,
        layout: "full",
        visible: true,
        tiles: [
          {
            id: `${page.slug}-takeaway`,
            eyebrow: "Takeaway",
            title: "Essential context",
            body: page.takeaway,
            meta: "Reader orientation",
            linkLabel: "",
            linkHref: "",
            accent: "#39766d",
            visible: true,
          },
          ...page.facts.map((fact, index) => ({
            id: `${page.slug}-fact-${index + 1}`,
            eyebrow: `Point ${String(index + 1).padStart(2, "0")}`,
            title: "Essential point",
            body: fact,
            meta: "Fact tile",
            linkLabel: "",
            linkHref: "",
            accent: "#9b8358",
            visible: true,
          })),
        ],
      },
      ...page.sections.map((section, index) => ({
        id: `${page.slug}-section-${index + 1}`,
        type: "text" as const,
        label: section.title,
        eyebrow: "Depth on demand",
        title: section.title,
        description: section.body,
        layout: "full" as const,
        visible: true,
        tiles: (section.points ?? []).map((point, pointIndex) => ({
          id: `${page.slug}-section-${index + 1}-point-${pointIndex + 1}`,
          eyebrow: `Point ${pointIndex + 1}`,
          title: point,
          body: "",
          meta: "Supporting point",
          linkLabel: "",
          linkHref: "",
          accent: "#6d8e87",
          visible: true,
        })),
      })),
    ],
  }),
);

export const adminSeed: AdminDocument = {
  version: 1,
  site: {
    title: foundation.company.short_name,
    masthead: foundation.publication.masthead,
    tagline: foundation.company.tagline,
    description: foundation.company.region_description,
    primaryColor: foundation.branding.primary_color,
    accentColor: foundation.branding.accent_color,
  },
  pages: [
    {
      id: "page-home",
      name: "Homepage",
      path: "/",
      description: foundation.publication.hero.description,
      status: "Published",
      updatedAt: "Jul 26, 2026",
      sections: homeSections,
    },
    ...editorialAdminPages,
  ],
  navigation: [
    { id: "nav-home", label: "Home", href: "/", visible: true },
    { id: "nav-journal", label: "Journal", href: "/journal", visible: true },
    {
      id: "nav-evidence",
      label: "Evidence",
      href: "/evidence-reviews",
      visible: true,
    },
    {
      id: "nav-standard",
      label: "Our standard",
      href: "/editorial-standards",
      visible: true,
    },
    { id: "nav-about", label: "About", href: "/about", visible: true },
    { id: "nav-contact", label: "Contact", href: "/contact", visible: true },
  ],
  media: [
    {
      id: "media-lens",
      name: "XYLENS lens mark",
      kind: "image",
      src: "/xylens-lens-mark.svg",
      alt: "XYLENS botanical lens mark",
      size: "4 KB",
    },
    {
      id: "media-oak",
      name: "Archive oak mark",
      kind: "image",
      src: "/xylens-oak-mark.svg",
      alt: "XYLENS oak archive mark",
      size: "6 KB",
    },
  ],
};

export const adminViewLabels: Record<AdminView, string> = {
  overview: "Overview",
  editor: "Site editor",
  articles: "Articles",
  media: "Media",
  inbox: "Inbox",
  analytics: "Traffic",
  navigation: "Navigation",
  settings: "Settings",
};
