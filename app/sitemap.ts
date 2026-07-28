import type { MetadataRoute } from "next";
import { editorialPageOrder } from "./editorial/pages";
import { getAllArticles } from "./seasons/data";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const updatedAt = new Date(
    Math.max(...articles.map((article) => Date.parse(article.reviewedAtISO))),
  );
  return [
    { url: siteUrl, lastModified: updatedAt, priority: 1 },
    ...editorialPageOrder.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: updatedAt,
      priority: slug === "journal" ? 0.9 : 0.7,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/journal/${article.slug}`,
      lastModified: new Date(article.reviewedAtISO),
      priority: 0.75,
    })),
  ];
}
