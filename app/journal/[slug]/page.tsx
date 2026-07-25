import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleReader from "../../components/ArticleReader";
import {
  getAllArticles,
  getRelatedArticles,
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
  const publicArticles = getAllArticles();
  const article = publicArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  const articleIndex = publicArticles.findIndex((item) => item.slug === slug);
  const previous =
    publicArticles[
      (articleIndex - 1 + publicArticles.length) % publicArticles.length
    ];
  const next = publicArticles[(articleIndex + 1) % publicArticles.length];

  return (
    <ArticleReader
      article={article}
      related={getRelatedArticles(article)}
      previous={previous}
      next={next}
    />
  );
}
