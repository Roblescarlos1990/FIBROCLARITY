import Image from "next/image";
import Link from "next/link";
import ArticleShare from "./ArticleShare";
import { SeasonFooter, SeasonHeader } from "./SeasonChrome";
import type {
  SeasonDefinition,
  SeasonalArticle,
} from "../seasons/data";

type ArticleReaderProps = {
  article: SeasonalArticle;
  season: SeasonDefinition;
  related: SeasonalArticle[];
  previous: SeasonalArticle;
  next: SeasonalArticle;
  seasonPosition: number;
};

export default function ArticleReader({
  article,
  season,
  related,
  previous,
  next,
  seasonPosition,
}: ArticleReaderProps) {
  return (
    <main className={`article-reader season-${season.slug}`}>
      <SeasonHeader activeSeason={season.slug} compact />

      <section className="article-hero">
        <div className="article-hero-image">
          <Image
            src={article.featuredImage}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 820px) 100vw, 55vw"
            priority
          />
          <span aria-hidden="true" />
        </div>
        <div className="article-hero-copy">
          <Link href={`/seasons/${season.slug}`} className="article-back-link">
            ← Back to {season.label}
          </Link>
          <p>
            {season.number} / 04 · {article.category}
          </p>
          <h1>{article.title}</h1>
          <strong>{article.subtitle}</strong>
          <div className="article-hero-meta">
            <span>By {article.author}</span>
            <span>{article.publishedAt}</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
        <span className="article-season-watermark" aria-hidden="true">
          {String(seasonPosition + 1).padStart(2, "0")}
        </span>
      </section>

      <div className="article-layout">
        <aside className="article-aside">
          <span>XYLENS / {season.label.toUpperCase()}</span>
          <p>
            Evidence and interpretation are identified separately. Uncertainty
            remains visible.
          </p>
          <ArticleShare title={article.title} />
        </aside>

        <article className="article-body-copy">
          <p className="article-standfirst">{article.excerpt}</p>
          {article.content.map((block, index) => {
            if (block.type === "heading") {
              return <h2 key={`${block.type}-${index}`}>{block.text}</h2>;
            }
            if (block.type === "quote") {
              return (
                <blockquote key={`${block.type}-${index}`}>
                  <p>{block.text}</p>
                  {block.attribution && <cite>{block.attribution}</cite>}
                </blockquote>
              );
            }
            if (block.type === "image") {
              return (
                <figure key={`${block.type}-${index}`}>
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={1800}
                    height={1120}
                    sizes="(max-width: 820px) 100vw, 1020px"
                  />
                  <figcaption>{block.caption}</figcaption>
                </figure>
              );
            }
            return <p key={`${block.type}-${index}`}>{block.text}</p>;
          })}

          <div className="article-disclaimer">
            <span>Editorial note</span>
            <p>
              This story is educational journalism and is not a substitute for
              individualized medical advice, diagnosis, or treatment.
            </p>
          </div>
        </article>
      </div>

      {related.length > 0 && (
        <section className="related-stories">
          <div>
            <p>Continue through {season.label}</p>
            <h2>Related stories</h2>
          </div>
          <div className="related-story-grid">
            {related.map((story) => (
              <Link
                href={`/seasons/${season.slug}/articles/${story.slug}`}
                key={story.slug}
              >
                <span className="related-story-image">
                  <Image
                    src={story.featuredImage}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 820px) 100vw, 50vw"
                  />
                </span>
                <small>{story.category}</small>
                <strong>{story.title}</strong>
                <p>{story.excerpt}</p>
                <span>Read story ↗</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <nav className="article-pagination" aria-label="Article navigation">
        <Link
          href={`/seasons/${season.slug}/articles/${previous.slug}`}
          rel="prev"
        >
          <span>← Previous story</span>
          <strong>{previous.title}</strong>
        </Link>
        <Link href={`/seasons/${season.slug}/articles/${next.slug}`} rel="next">
          <span>Next story →</span>
          <strong>{next.title}</strong>
        </Link>
      </nav>

      <SeasonFooter activeSeason={season.slug} />
    </main>
  );
}
