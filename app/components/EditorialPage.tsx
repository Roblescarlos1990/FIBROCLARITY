import Link from "next/link";
import { getAllArticles } from "../seasons/data";
import type { EditorialPageDefinition } from "../editorial/pages";
import { EditorialFooter, EditorialHeader } from "./EditorialChrome";

export default function EditorialPage({
  page,
}: {
  page: EditorialPageDefinition;
}) {
  const publicArticles = getAllArticles();
  const showJournal = page.slug === "journal";
  const showEvidence = page.slug === "evidence-reviews";
  const articles = showEvidence
    ? publicArticles.filter(
        (article) => article.evidenceStatus === "Evidence Review",
      )
    : publicArticles;

  return (
    <main id="main-content" className="editorial-page">
      <EditorialHeader active={page.slug} />

      <section className="editorial-page-hero">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <strong>{page.deck}</strong>
        <div className="editorial-takeaway">
          <span>Takeaway</span>
          <p>{page.takeaway}</p>
        </div>
      </section>

      <section className="editorial-fact-grid" aria-label="Essential points">
        {page.facts.map((fact, index) => (
          <article key={fact}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{fact}</p>
          </article>
        ))}
      </section>

      {(showJournal || showEvidence) && (
        <section className="editorial-index">
          <div className="editorial-section-title">
            <p>{showEvidence ? "Evidence record" : "Current issue"}</p>
            <h2>{showEvidence ? "Published reviews" : "Latest writing"}</h2>
          </div>
          <div className="editorial-index-list">
            {articles.map((article) => (
              <Link href={`/journal/${article.slug}`} key={article.slug}>
                <span>{article.evidenceStatus}</span>
                <h3>{article.title}</h3>
                <p>{article.takeaway}</p>
                <small>
                  By {article.author} · Reviewed {article.reviewedAt} ·{" "}
                  {article.readingTime}
                </small>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="editorial-depth-layout">
        <aside>
          <span>Depth on demand</span>
          <p>
            The point stays visible. Supporting context follows in a calm,
            readable sequence.
          </p>
        </aside>
        <div>
          {page.sections.map((section) => (
            <section key={section.title} className="editorial-depth-section">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>

      <section className="editorial-next-step">
        <p>Continue with the standard</p>
        <h2>See how evidence becomes public writing.</h2>
        <Link href="/editorial-standards">Read editorial standards ↗</Link>
      </section>

      <EditorialFooter />
    </main>
  );
}
