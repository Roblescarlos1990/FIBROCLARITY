import Image from "next/image";
import Link from "next/link";
import { seasonOrder, seasons, type SeasonSlug } from "../seasons/data";

type SeasonHeaderProps = {
  activeSeason: SeasonSlug;
  compact?: boolean;
};

export function SeasonHeader({
  activeSeason,
  compact = false,
}: SeasonHeaderProps) {
  return (
    <header className={`season-header ${compact ? "is-compact" : ""}`}>
      <Link className="season-brand" href="/" aria-label="XYLENS home">
        <Image src="/xylens-lens-mark.svg" alt="" width={42} height={42} />
        <span>
          <strong>XYLENS</strong>
          <small>Journal of Medicine &amp; Wellness</small>
        </span>
      </Link>

      <nav className="season-route-nav" aria-label="Seasonal chapters">
        {seasonOrder.map((slug) => (
          <Link
            href={`/seasons/${slug}`}
            key={slug}
            aria-current={slug === activeSeason ? "page" : undefined}
            className={slug === activeSeason ? "is-active" : ""}
          >
            <span>{seasons[slug].number}</span>
            {seasons[slug].label}
          </Link>
        ))}
      </nav>

      <Link className="season-home-link" href="/#journal">
        Journal <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}

export function SeasonFooter({ activeSeason }: { activeSeason: SeasonSlug }) {
  const activeIndex = seasonOrder.indexOf(activeSeason);
  const nextSeason = seasonOrder[(activeIndex + 1) % seasonOrder.length];

  return (
    <footer className="season-footer">
      <div className="season-footer-brand">
        <Image src="/xylens-lens-mark.svg" alt="" width={54} height={54} />
        <div>
          <strong>XYLENS</strong>
          <span>Independent medicine · research · restorative living</span>
        </div>
      </div>
      <Link className="next-season-link" href={`/seasons/${nextSeason}`}>
        <span>Next chapter</span>
        <strong>
          {seasons[nextSeason].label} <i aria-hidden="true">→</i>
        </strong>
      </Link>
      <div className="season-footer-legal">
        <nav aria-label="Editorial and legal information">
          <Link href="/editorial-standards">Editorial standards</Link>
          <Link href="/evidence-method">Evidence method</Link>
          <Link href="/corrections">Corrections</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/medical-disclaimer">Medical information</Link>
        </nav>
        <div>
          <p>
            Educational journalism, not individualized medical advice,
            diagnosis, or treatment.
          </p>
          <span>© 2026 XYLENS · San Diego, California</span>
        </div>
      </div>
    </footer>
  );
}
