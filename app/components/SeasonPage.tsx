"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SeasonFooter, SeasonHeader } from "./SeasonChrome";
import type {
  SeasonDefinition,
  SeasonalMedia,
} from "../seasons/data";

type SeasonPageProps = {
  season: SeasonDefinition;
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function MediaKind({ item }: { item: SeasonalMedia }) {
  const labels: Record<SeasonalMedia["type"], string> = {
    photo: "Photograph",
    gallery: "Gallery",
    video: "Video",
    interview: "Interview",
    documentary: "Documentary",
  };
  return (
    <span className="media-kind">
      {item.type === "video" ||
      item.type === "interview" ||
      item.type === "documentary" ? (
        <i aria-hidden="true">▶</i>
      ) : (
        <i aria-hidden="true">◎</i>
      )}
      {labels[item.type]}
    </span>
  );
}

export default function SeasonPage({ season }: SeasonPageProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeArticle, setActiveArticle] = useState(0);
  const [activeMedia, setActiveMedia] = useState(0);
  const mediaRailRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const selectedMedia =
    selectedIndex === null ? null : season.media[selectedIndex];
  const viewerImages = useMemo(() => {
    if (!selectedMedia) return [];
    if (selectedMedia.galleryImages?.length) {
      return selectedMedia.galleryImages;
    }
    return [selectedMedia.mediaSource || selectedMedia.thumbnail];
  }, [selectedMedia]);

  const openMedia = (index: number) => {
    returnFocusRef.current = document.activeElement as HTMLElement;
    setGalleryIndex(0);
    setActiveMedia(index);
    setSelectedIndex(index);
  };

  const closeMedia = () => setSelectedIndex(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedIndex(null);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setGalleryIndex(0);
        setSelectedIndex((current) =>
          current === null ? 0 : (current + 1) % season.media.length,
        );
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setGalleryIndex(0);
        setSelectedIndex((current) =>
          current === null
            ? 0
            : (current - 1 + season.media.length) % season.media.length,
        );
        return;
      }
      if (event.key !== "Tab" || !viewerRef.current) return;
      const focusable = Array.from(
        viewerRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      requestAnimationFrame(() => returnFocusRef.current?.focus());
    };
  }, [season.media.length, selectedIndex]);

  const moveRail = (direction: -1 | 1) => {
    setActiveMedia((current) => {
      const next = Math.max(
        0,
        Math.min(season.media.length - 1, current + direction),
      );
      const card = mediaRailRef.current?.children[next] as HTMLElement | undefined;
      card?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      return next;
    });
  };

  const selectMediaPosition = (index: number) => {
    setActiveMedia(index);
    const card = mediaRailRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const syncRailPosition = () => {
    const rail = mediaRailRef.current;
    if (!rail) return;
    const cards = Array.from(rail.children) as HTMLElement[];
    const railCenter = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const bounds = card.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - railCenter);
      if (distance < closestDistance) {
        closest = index;
        closestDistance = distance;
      }
    });
    setActiveMedia(closest);
  };

  const onRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") moveRail(1);
    if (event.key === "ArrowLeft") moveRail(-1);
  };

  const currentArticle = season.articles[activeArticle];

  return (
    <main
      id="main-content"
      className={`season-page season-${season.slug}`}
      style={
        {
          "--season-hero-image": `url("${season.heroImage}")`,
        } as CSSProperties
      }
    >
      <section className="season-hero">
        <div className="season-hero-image" role="img" aria-label={season.heroAlt} />
        <div className="season-hero-wash" aria-hidden="true" />
        <div className="season-weather" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <SeasonHeader activeSeason={season.slug} />

        <div className="season-hero-content">
          <p className="season-issue">
            <span>{season.number} / 04</span>
            {season.lens}
          </p>
          <p className="season-kicker">{season.kicker}</p>
          <h1>{season.title}</h1>
          <p className="season-subtitle">{season.subtitle}</p>
          <div className="season-hero-meta">
            <span>{season.location}</span>
            <span>{season.atmosphere}</span>
          </div>
        </div>

        <a className="season-scroll-cue" href="#featured-media">
          <span>Scroll to explore</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section id="featured-media" className="season-section media-section">
        <div className="season-section-heading">
          <div>
            <p>Featured media · {season.label}</p>
            <h2>Stories you can enter.</h2>
          </div>
          <p>
            Photography, field films, and quiet conversations selected for this
            seasonal chapter.
          </p>
        </div>

        <div className="media-controls" aria-label="Media carousel controls">
          <button
            type="button"
            onClick={() => moveRail(-1)}
            aria-label="Previous media"
          >
            ←
          </button>
          <span>Drag · swipe · use arrow keys</span>
          <button
            type="button"
            onClick={() => moveRail(1)}
            aria-label="Next media"
          >
            →
          </button>
        </div>

        <div
          className="media-rail"
          ref={mediaRailRef}
          tabIndex={0}
          onKeyDown={onRailKeyDown}
          onScroll={syncRailPosition}
          aria-label={`${season.label} featured media`}
        >
          {season.media.map((item, index) => (
            <article className="media-card" key={item.id}>
              <button
                type="button"
                className="media-card-action"
                onClick={() => openMedia(index)}
                aria-label={`Open ${item.title}`}
              >
                <span className="media-card-image">
                  <Image
                    src={item.thumbnail}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 820px) 86vw, 46vw"
                  />
                  <span className="media-card-overlay" aria-hidden="true" />
                  <MediaKind item={item} />
                  {item.duration && (
                    <span className="media-duration">{item.duration}</span>
                  )}
                  <span className="media-open" aria-hidden="true">
                    Open <Arrow />
                  </span>
                </span>
                <span className="media-card-copy">
                  <span className="media-card-meta">
                    <span>{item.category}</span>
                    <span>{item.publishedAt}</span>
                  </span>
                  <strong>{item.title}</strong>
                  <span className="media-description">{item.description}</span>
                  <span className="media-author">By {item.author}</span>
                </span>
              </button>
            </article>
          ))}
        </div>

        <div className="media-pagination" aria-label="Media position">
          {season.media.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={index === activeMedia ? "is-active" : ""}
              aria-current={index === activeMedia ? "true" : undefined}
              aria-label={`Show media ${index + 1} of ${season.media.length}`}
              onClick={() => selectMediaPosition(index)}
            />
          ))}
        </div>
      </section>

      <section className="season-section article-rail-section">
        <div className="season-section-heading">
          <div>
            <p>The written journal · {season.lens}</p>
            <h2>Read slowly.</h2>
          </div>
          <p>
            Reporting and essays by the XYLENS editorial desk, presented as a
            fading story rail.
          </p>
        </div>

        <div className="article-story-shell">
          <article className="active-story" key={currentArticle.slug}>
            <div className="active-story-image">
              <Image
                src={currentArticle.featuredImage}
                alt={currentArticle.imageAlt}
                fill
                sizes="(max-width: 820px) 100vw, 55vw"
              />
              <span aria-hidden="true" />
            </div>
            <div className="active-story-copy">
              <p>
                {currentArticle.category} · {currentArticle.readingTime}
              </p>
              <span className="story-evidence-status">
                {currentArticle.evidenceStatus}
              </span>
              <h3>{currentArticle.title}</h3>
              <strong>{currentArticle.subtitle}</strong>
              <span>{currentArticle.excerpt}</span>
              <div className="active-story-byline">
                <span>By {currentArticle.author}</span>
                <span>Reviewed {currentArticle.reviewedAt}</span>
              </div>
              <Link
                href={`/journal/${currentArticle.slug}`}
              >
                Read the full story <Arrow />
              </Link>
            </div>
          </article>

          <div className="story-selector" aria-label="Choose an article">
            {season.articles.map((article, index) => (
              <button
                type="button"
                key={article.slug}
                className={index === activeArticle ? "is-active" : ""}
                aria-pressed={index === activeArticle}
                onClick={() => setActiveArticle(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{article.title}</strong>
                <small>{article.category}</small>
              </button>
            ))}
            <div className="story-step-controls">
              <button
                type="button"
                onClick={() =>
                  setActiveArticle(
                    (activeArticle - 1 + season.articles.length) %
                      season.articles.length,
                  )
                }
                aria-label="Previous article"
              >
                ←
              </button>
              <span>
                {String(activeArticle + 1).padStart(2, "0")} /{" "}
                {String(season.articles.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveArticle(
                    (activeArticle + 1) % season.articles.length,
                  )
                }
                aria-label="Next article"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="season-editorial-note">
        <p>Built for a living publication</p>
        <h2>One calm front end. A future editorial system behind it.</h2>
        <div>
          <span>
            <strong>Structured stories</strong>
            Articles and media already use reusable typed content objects.
          </span>
          <span>
            <strong>Season-aware publishing</strong>
            Every story carries a season, category, author, and publication
            state-ready identity.
          </span>
          <span>
            <strong>CMS-ready architecture</strong>
            Temporary content can later come from Supabase or another editorial
            API without rebuilding these pages.
          </span>
        </div>
      </section>

      <SeasonFooter activeSeason={season.slug} />

      {selectedMedia && selectedIndex !== null && (
        <div
          className="media-viewer-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMedia();
          }}
        >
          <div
            className="media-viewer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-viewer-title"
            ref={viewerRef}
          >
            <div className="viewer-topbar">
              <span>
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(season.media.length).padStart(2, "0")}
              </span>
              <MediaKind item={selectedMedia} />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMedia}
                aria-label="Close media viewer"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="viewer-stage">
              {selectedMedia.type === "video" ||
              selectedMedia.type === "interview" ||
              selectedMedia.type === "documentary" ? (
                <video
                  key={selectedMedia.id}
                  controls
                  preload="metadata"
                  poster={selectedMedia.thumbnail}
                  aria-label={selectedMedia.title}
                >
                  <source src={selectedMedia.mediaSource} type="video/mp4" />
                  {selectedMedia.captionSource && (
                    <track
                      kind="captions"
                      src={selectedMedia.captionSource}
                      srcLang="en"
                      label="English captions"
                      default
                    />
                  )}
                  Your browser does not support HTML video.
                </video>
              ) : (
                <Image
                  src={viewerImages[galleryIndex]}
                  alt={`${selectedMedia.alt}${
                    viewerImages.length > 1
                      ? `, image ${galleryIndex + 1} of ${viewerImages.length}`
                      : ""
                  }`}
                  fill
                  sizes="100vw"
                />
              )}

              <button
                type="button"
                className="viewer-nav viewer-prev"
                onClick={() => {
                  setGalleryIndex(0);
                  setSelectedIndex(
                    (selectedIndex - 1 + season.media.length) %
                      season.media.length,
                  );
                }}
                aria-label="Previous media item"
              >
                ←
              </button>
              <button
                type="button"
                className="viewer-nav viewer-next"
                onClick={() => {
                  setGalleryIndex(0);
                  setSelectedIndex((selectedIndex + 1) % season.media.length);
                }}
                aria-label="Next media item"
              >
                →
              </button>
            </div>

            {viewerImages.length > 1 && (
              <div className="viewer-gallery-nav" aria-label="Gallery images">
                {viewerImages.map((image, index) => (
                  <button
                    type="button"
                    key={image}
                    onClick={() => setGalleryIndex(index)}
                    className={index === galleryIndex ? "is-active" : ""}
                    aria-label={`Show gallery image ${index + 1}`}
                  >
                    <Image src={image} alt="" fill sizes="78px" />
                  </button>
                ))}
              </div>
            )}

            <div className="viewer-caption">
              <div>
                <p>{selectedMedia.category}</p>
                <h2 id="media-viewer-title">{selectedMedia.title}</h2>
              </div>
              <div>
                <p>{selectedMedia.description}</p>
                <span>
                  By {selectedMedia.author} · {selectedMedia.publishedAt}
                  <br />
                  Credit: {selectedMedia.credit || selectedMedia.author}
                </span>
              </div>
            </div>
            {(selectedMedia.type === "video" ||
              selectedMedia.type === "interview" ||
              selectedMedia.type === "documentary") && (
              <details className="viewer-transcript">
                <summary>Transcript and accessibility note</summary>
                <p>
                  {selectedMedia.transcript ||
                    "This temporary media preview is illustrative. A verified transcript and captions must accompany final editorial media before publication."}
                </p>
              </details>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
