import type { MetadataRoute } from "next";
import { editorialPageOrder } from "./editorial/pages";
import { getAllArticles, seasonOrder } from "./seasons/data";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date("2026-07-25");
  return [
    { url: siteUrl, lastModified: updatedAt, priority: 1 },
    ...editorialPageOrder.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: updatedAt,
      priority: slug === "journal" ? 0.9 : 0.7,
    })),
    ...seasonOrder.map((season) => ({
      url: `${siteUrl}/seasons/${season}`,
      lastModified: updatedAt,
      priority: 0.8,
    })),
    ...getAllArticles().map((article) => ({
      url: `${siteUrl}/journal/${article.slug}`,
      lastModified: new Date(article.reviewedAtISO),
      priority: 0.75,
    })),
  ];
}
