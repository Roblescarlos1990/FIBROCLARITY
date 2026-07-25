import Image from "next/image";
import Link from "next/link";
import ArticleShare from "./ArticleShare";
import { EditorialFooter, EditorialHeader } from "./EditorialChrome";
import type { SeasonalArticle } from "../seasons/data";
import { siteUrl } from "../site";

type ArticleReaderProps = {
  article: SeasonalArticle;
  related: SeasonalArticle[];
  previous: SeasonalArticle;
  next: SeasonalArticle;
};

export default function ArticleReader({
  article,
  related,
  previous,
  next,
}: ArticleReaderProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    image: article.featuredImage,
    datePublished: article.publishedAtISO,
    dateModified: article.reviewedAtISO,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "XYLENS" },
    mainEntityOfPage: `${siteUrl}/journal/${article.slug}`,
  };

  return (
    <main id="main-content" className="article-reader">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <EditorialHeader active="journal" />

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
          <Link href="/journal" className="article-back-link">
            ← Back to the journal
          </Link>
          <p>{article.category} · {article.evidenceStatus}</p>
          <h1>{article.title}</h1>
          <strong>{article.subtitle}</strong>
          <div className="article-hero-meta">
            <span>By {article.author}</span>
            <span>Published {article.publishedAt}</span>
            <span>Reviewed {article.reviewedAt}</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </section>

      <div className="article-layout">
        <aside className="article-aside">
          <span>XYLENS / ARTICLE RECORD</span>
          <p>
            Evidence and interpretation are identified separately. Uncertainty
            remains visible.
          </p>
          <dl className="article-record-mini">
            <div>
              <dt>Evidence status</dt>
              <dd>{article.evidenceStatus}</dd>
            </div>
            <div>
              <dt>Reviewer</dt>
              <dd>{article.reviewer}</dd>
            </div>
            <div>
              <dt>Review role</dt>
              <dd>{article.reviewerRole}</dd>
            </div>
          </dl>
          <ArticleShare title={article.title} />
        </aside>

        <article className="article-body-copy">
          <section className="article-takeaway" aria-labelledby="takeaway-title">
            <span id="takeaway-title">One-sentence takeaway</span>
            <p>{article.takeaway}</p>
          </section>

          <section className="article-evidence-record">
            <div className="evidence-record-heading">
              <span title={article.evidenceDefinition}>
                {article.evidenceStatus}
              </span>
              <p>{article.evidenceDefinition}</p>
            </div>
            <div className="evidence-record-columns">
              <div>
                <h2>Essential findings</h2>
                <ol>
                  {article.keyFindings.map((finding) => (
                    <li key={finding}>{finding}</li>
                  ))}
                </ol>
              </div>
              <div className="evidence-limitations">
                <h2>Limitations</h2>
                <ul>
                  {article.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

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

          <div className="article-depth-record">
            <details>
              <summary>Review approach</summary>
              <p>{article.reviewMethod}</p>
            </details>
            {article.citations.length > 0 && (
              <details>
                <summary>Sources and stable links</summary>
                <ol>
                  {article.citations.map((citation) => (
                    <li key={citation.id}>
                      <a href={citation.href}>{citation.label}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <details>
              <summary>Disclosures and version history</summary>
              {article.disclosures.map((disclosure) => (
                <p key={disclosure}>{disclosure}</p>
              ))}
              <ul>
                {article.correctionHistory.map((correction) => (
                  <li key={`${correction.version}-${correction.date}`}>
                    <strong>Version {correction.version}</strong> ·{" "}
                    {correction.date} — {correction.summary}
                  </li>
                ))}
              </ul>
            </details>
          </div>

          <div className="article-disclaimer">
            <span>Medical information</span>
            <p>
              This story is educational journalism and is not a substitute for
              individualized medical advice, diagnosis, or treatment.{" "}
              <Link href="/medical-disclaimer">Read the full boundary.</Link>
            </p>
          </div>
        </article>
      </div>

      {related.length > 0 && (
        <section className="related-stories">
          <div>
            <p>Continue reading</p>
            <h2>Related stories</h2>
          </div>
          <div className="related-story-grid">
            {related.map((story) => (
              <Link
                href={`/journal/${story.slug}`}
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
          href={`/journal/${previous.slug}`}
          rel="prev"
        >
          <span>← Previous story</span>
          <strong>{previous.title}</strong>
        </Link>
        <Link href={`/journal/${next.slug}`} rel="next">
          <span>Next story →</span>
          <strong>{next.title}</strong>
        </Link>
      </nav>

      <EditorialFooter />
    </main>
  );
}
