import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleReader from "../../../../components/ArticleReader";
import {
  getAllArticles,
  getRelatedArticles,
  getSeasonArticle,
  isSeasonSlug,
  seasonOrder,
  seasons,
} from "../../../data";

type ArticleRouteProps = {
  params: Promise<{ season: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    season: article.season,
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata> {
  const { season, slug } = await params;
  if (!isSeasonSlug(season)) return {};
  const article = getSeasonArticle(season, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleRoute({ params }: ArticleRouteProps) {
  const { season, slug } = await params;
  if (!isSeasonSlug(season)) notFound();
  const article = getSeasonArticle(season, slug);
  if (!article) notFound();

  const seasonIndex = seasonOrder.indexOf(season);
  const seasonArticles = seasons[season].articles;
  const articleIndex = seasonArticles.findIndex((item) => item.slug === slug);
  const previous =
    seasonArticles[(articleIndex - 1 + seasonArticles.length) % seasonArticles.length];
  const next = seasonArticles[(articleIndex + 1) % seasonArticles.length];

  return (
    <ArticleReader
      article={article}
      season={seasons[season]}
      related={getRelatedArticles(article)}
      previous={previous}
      next={next}
      seasonPosition={seasonIndex}
    />
  );
}
