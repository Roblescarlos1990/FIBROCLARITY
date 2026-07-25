import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleReader from "../../components/ArticleReader";
import {
  getAllArticles,
  getRelatedArticles,
  getSeasonArticle,
  seasonOrder,
  seasons,
} from "../../seasons/data";

type JournalArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: JournalArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getAllArticles().find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: "article",
      url: `/journal/${article.slug}`,
      images: [{ url: article.featuredImage, alt: article.imageAlt }],
      publishedTime: article.publishedAtISO,
      modifiedTime: article.reviewedAtISO,
      authors: [article.author],
    },
  };
}

export default async function JournalArticleRoute({
  params,
}: JournalArticleRouteProps) {
  const { slug } = await params;
  const article = getAllArticles().find((item) => item.slug === slug);
  if (!article) notFound();
  const season = article.season;
  const seasonIndex = seasonOrder.indexOf(season);
  const seasonArticles = seasons[season].articles;
  const articleIndex = seasonArticles.findIndex((item) => item.slug === slug);
  const previous =
    seasonArticles[
      (articleIndex - 1 + seasonArticles.length) % seasonArticles.length
    ];
  const next = seasonArticles[(articleIndex + 1) % seasonArticles.length];
  const canonicalArticle = getSeasonArticle(season, slug);
  if (!canonicalArticle) notFound();

  return (
    <ArticleReader
      article={canonicalArticle}
      season={seasons[season]}
      related={getRelatedArticles(canonicalArticle)}
      previous={previous}
      next={next}
      seasonPosition={seasonIndex}
    />
  );
}
