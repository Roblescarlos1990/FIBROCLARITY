"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import IntroSequence from "./IntroSequence";
import LivingLensScene, { type SeasonKey } from "./LivingLensScene";
import { articles, lensCopy, type Lens } from "./content";
import { foundation, type FoundationLens } from "./foundation";

const seasonOptions = foundation.publication.lenses;
const categories = [
  "All",
  ...Array.from(new Set(seasonOptions.map((option) => option.lens))),
] as Array<"All" | Lens>;

const weatherCopy: Record<
  SeasonKey,
  { title: string; detail: string }
> = {
  spring: {
    title: "Mineral mist",
    detail: "Fresh growth · cool water · soft light",
  },
  summer: {
    title: "Pacific light",
    detail: "Marine air · sun particles · open water",
  },
  autumn: {
    title: "Copper current",
    detail: "Dry botanicals · amber light · warm wind",
  },
  winter: {
    title: "Silver atmosphere",
    detail: "Mineral forms · low fog · clear focus",
  },
};

function Brand() {
  const { company, publication } = foundation;
  return (
    <a
      className="brand"
      href="#top"
      aria-label={`${company.short_name} home`}
    >
      <span className="brand-mark" aria-hidden="true">
        <Image
          src="/xylens-lens-mark.svg"
          alt=""
          width={42}
          height={42}
        />
      </span>
      <span>
        <strong>{company.short_name}</strong>
        <small>{publication.masthead}</small>
      </span>
    </a>
  );
}

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

export default function Home() {
  const router = useRouter();
  const [introComplete, setIntroComplete] = useState(false);
  const [activeSeason, setActiveSeason] = useState<SeasonKey>("summer");
  const [activeCategory, setActiveCategory] = useState<"All" | Lens>("All");
  const [query, setQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const seasonIndex = seasonOptions.findIndex(
    (item) => item.key === activeSeason,
  );
  const current = seasonOptions[seasonIndex];
  const weather = weatherCopy[activeSeason];
  const featured = articles.filter((article) => article.featured);
  const completeIntro = useCallback(() => setIntroComplete(true), []);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const categoryMatch =
        activeCategory === "All" || article.category === activeCategory;
      const queryMatch =
        !normalizedQuery ||
        `${article.title} ${article.dek} ${article.topic} ${article.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  const selectLens = (option: FoundationLens) => {
    setActiveSeason(option.key);
    setActiveCategory(option.lens);
    router.push(`/seasons/${option.key}`);
  };

  return (
    <>
      {!introComplete && <IntroSequence onComplete={completeIntro} />}
    <main
      id="top"
      className="site-shell"
      data-season={activeSeason}
      data-template={foundation.project.template_id}
      style={foundation.cssProperties}
    >
      <section className="hero">
        <div className="atmosphere" aria-hidden="true">
          <span className="orb orb-one" />
          <span className="orb orb-two" />
          <span className="grain" />
        </div>

        <header className="site-header">
          <Brand />
          <nav className="primary-nav" aria-label="Primary navigation">
            {foundation.publication.primary_navigation.map((item) => (
              <a href={item.target} key={item.target}>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="header-action"
            href={foundation.publication.header_action.target}
          >
            {foundation.publication.header_action.label} <Arrow />
          </a>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{foundation.publication.eyebrow}</p>
            <h1>
              {foundation.publication.hero.headline_primary}
              <br />
              <em>{foundation.publication.hero.headline_accent}</em>
            </h1>
            <p className="hero-dek">
              {foundation.publication.hero.description}
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#journal">
                {foundation.publication.hero.primary_action} <Arrow />
              </a>
              <a className="text-link" href="#standard">
                {foundation.publication.hero.secondary_action}
              </a>
            </div>
          </div>

          <div className="lens-stage">
            <LivingLensScene season={activeSeason} />
            <div className="lens-caption">
              <span>
                {current.number} / 04
              </span>
              <p>
                {current.season}
                <small>{current.label} lens</small>
              </p>
            </div>
            <p className="interaction-note">
              Move through the lens · choose a perspective below
            </p>
            <div className="weather-readout" aria-live="polite">
              <span aria-hidden="true" />
              <p>
                {weather.title}
                <small>{weather.detail}</small>
              </p>
            </div>
          </div>
        </div>

        <div className="season-nav" role="tablist" aria-label="Editorial lenses">
          {seasonOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={activeSeason === option.key}
              className={activeSeason === option.key ? "is-active" : ""}
              onClick={() => selectLens(option)}
            >
              <span>{option.number}</span>
              <strong>{option.label}</strong>
              <small>{option.season}</small>
            </button>
          ))}
        </div>
      </section>

      <div
        className="manifesto-strip"
        aria-label={`${foundation.company.short_name} principles`}
      >
        {foundation.publication.principles.map((principle, index) => (
          <span className="manifesto-item" key={principle}>
            <span>{principle}</span>
            {index < foundation.publication.principles.length - 1 && <i />}
          </span>
        ))}
      </div>

      <section id="journal" className="section editorial-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">The Edit · Editor’s picks</p>
            <h2>Ideas worth sitting with.</h2>
          </div>
          <p>
            Long reads and field notes selected for clarity, consequence, and
            their ability to change the way we see health.
          </p>
        </div>

        <div className="featured-grid">
          <article className="feature-card feature-main">
            <div className="feature-art art-plum" aria-hidden="true">
              <span className="cell cell-a" />
              <span className="cell cell-b" />
              <span className="cell cell-c" />
              <span className="feature-roman">I</span>
              <small>Central sensitivity / 2026</small>
            </div>
            <div className="feature-content">
              <div className="article-meta">
                <span>{featured[0].category}</span>
                <span>{featured[0].readTime}</span>
              </div>
              <h3>{featured[0].title}</h3>
              <p>{featured[0].dek}</p>
              <a href="#library" aria-label={`Read ${featured[0].title}`}>
                Read the evidence review <Arrow />
              </a>
            </div>
          </article>

          <div className="feature-stack">
            {featured.slice(1).map((article, index) => (
              <article className="feature-card feature-small" key={article.title}>
                <div
                  className={`feature-mini-art art-${article.accent}`}
                  aria-hidden="true"
                >
                  <span className="contour contour-one" />
                  <span className="contour contour-two" />
                  <strong>0{index + 2}</strong>
                </div>
                <div className="feature-content">
                  <div className="article-meta">
                    <span>{article.topic}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.dek}</p>
                  <a href="#library" aria-label={`Read ${article.title}`}>
                    Explore <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lenses" className="section lenses-section">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-kicker">Explore by lens</p>
            <h2>Four seasons of inquiry.</h2>
          </div>
        </div>

        <div className="lens-grid">
          {seasonOptions.map((option) => {
            const copy = lensCopy[option.lens];
            const active = activeSeason === option.key;
            return (
              <button
                type="button"
                className={`lens-card lens-${option.key} ${active ? "is-active" : ""}`}
                key={option.key}
                onClick={() => selectLens(option)}
              >
                <span className="lens-number">{option.number}</span>
                <span className="lens-season">{copy.kicker}</span>
                <strong>{copy.title}</strong>
                <p>{copy.description}</p>
                <span className="lens-cta">
                  View this lens <Arrow />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="library" className="section library-section">
        <div className="library-header">
          <div>
            <p className="section-kicker">The learning center</p>
            <h2>Recently published</h2>
          </div>
          <label className="search-field">
            <span className="sr-only">Search the journal</span>
            <input
              type="search"
              placeholder="Search symptoms, topics, research…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span aria-hidden="true">⌕</span>
          </label>
        </div>

        <div className="filter-row" role="group" aria-label="Filter articles">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? "is-active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="article-list" aria-live="polite">
          {filteredArticles.map((article, index) => (
            <article className="article-row" key={article.title}>
              <div
                className={`article-index accent-${article.accent}`}
                aria-hidden="true"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="article-body">
                <div className="article-meta">
                  <span>{article.category}</span>
                  <span>{article.topic}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.dek}</p>
              </div>
              <div className="article-tail">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
                <a href="#standard" aria-label={`Open ${article.title}`}>
                  <Arrow />
                </a>
              </div>
            </article>
          ))}
          {filteredArticles.length === 0 && (
            <div className="empty-state">
              <p>No stories match that search yet.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="standard" className="section standard-section">
        <div className="standard-copy">
          <p className="section-kicker">The XYLENS standard</p>
          <h2>Holistic does not mean uncritical.</h2>
          <p>
            We believe whole-person health deserves more context and more
            curiosity—along with explicit sourcing, careful language, and a
            visible line between evidence, interpretation, and possibility.
          </p>
          <a className="button button-outline" href="#newsletter">
            How we review a story <Arrow />
          </a>
        </div>
        <div className="standard-ledger">
          <div className="ledger-head">
            <span>XYL / EDITORIAL RECORD</span>
            <span>REV. 01</span>
          </div>
          <dl>
            <div>
              <dt>Evidence tier</dt>
              <dd>
                <strong>A–D</strong>
                Named on every clinical review
              </dd>
            </div>
            <div>
              <dt>Last reviewed</dt>
              <dd>
                <strong>Jul 2026</strong>
                Date-stamped and versioned
              </dd>
            </div>
            <div>
              <dt>Uncertainty</dt>
              <dd>
                <strong>Visible</strong>
                Limitations stay in the story
              </dd>
            </div>
            <div>
              <dt>Reader promise</dt>
              <dd>
                <strong>No hype</strong>
                No diagnosis by headline
              </dd>
            </div>
          </dl>
          <p>
            Educational journalism, not personal medical advice. Clinical claims
            require qualified editorial review before publication.
          </p>
        </div>
      </section>

      <section id="newsletter" className="newsletter-section">
        <div className="newsletter-orbit" aria-hidden="true">
          <span className="newsletter-ring ring-one" />
          <span className="newsletter-ring ring-two" />
          <span className="newsletter-ring ring-three" />
          <strong>X</strong>
        </div>
        <div className="newsletter-copy">
          <p className="section-kicker">Field Notes · Twice monthly</p>
          <h2>A slower kind of health news.</h2>
          <p>
            One important study, one restorative idea, and one observation from
            the living world. No panic. No miracle language.
          </p>
          {subscribed ? (
            <div className="subscribe-success" role="status">
              You’re on the list. Watch the seasons.
            </div>
          ) : (
            <form
              className="subscribe-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <label>
                <span className="sr-only">Email address</span>
                <input type="email" required placeholder="Your email address" />
              </label>
              <button type="submit">
                Join Field Notes <Arrow />
              </button>
            </form>
          )}
          <small>Unsubscribe anytime. Your attention stays yours.</small>
        </div>
      </section>

      <footer className="site-footer">
        <Brand />
        <div className="footer-links">
          <a href="#journal">Journal</a>
          <a href="#standard">Editorial standard</a>
          <a href="#newsletter">Newsletter</a>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <p>
            {foundation.publication.editorial_disclaimer}
          </p>
          <span>
            © 2026 {foundation.company.short_name} ·{" "}
            {foundation.company.service_area}
          </span>
        </div>
      </footer>
    </main>
    </>
  );
}
