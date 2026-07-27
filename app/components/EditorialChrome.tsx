import Image from "next/image";
import Link from "next/link";

const primaryLinks = [
  { href: "/journal", label: "Journal" },
  { href: "/evidence-reviews", label: "Evidence" },
  { href: "/research", label: "Research" },
  { href: "/wellness", label: "Wellness" },
  { href: "/navigator", label: "Navigator" },
  { href: "/about", label: "About" },
];

const trustLinks = [
  { href: "/editorial-standards", label: "Editorial standards" },
  { href: "/evidence-method", label: "Evidence method" },
  { href: "/corrections", label: "Corrections" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/medical-disclaimer", label: "Medical information" },
  { href: "/contact", label: "Contact" },
];

export function EditorialBrand() {
  return (
    <Link className="editorial-brand" href="/" aria-label="XYLENS home">
      <Image src="/xylens-lens-mark.svg" alt="" width={44} height={44} />
      <span>
        <strong>XYLENS</strong>
        <small>Journal of Medicine &amp; Wellness</small>
      </span>
    </Link>
  );
}

export function EditorialHeader({ active }: { active?: string }) {
  return (
    <header className="editorial-header">
      <EditorialBrand />
      <nav aria-label="Primary navigation">
        {primaryLinks.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            aria-current={active === link.href.slice(1) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link className="editorial-header-action" href="/contact">
        Field Notes <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}

export function EditorialFooter() {
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer-intro">
        <EditorialBrand />
        <p>
          Independent evidence, education, and journalism from the Southern
          California coast.
        </p>
      </div>
      <nav aria-label="Editorial and legal information">
        {trustLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="editorial-footer-record">
        <p>
          Educational journalism—not individualized medical advice, diagnosis,
          or treatment.
        </p>
        <span>© 2026 XYLENS · San Diego, California</span>
      </div>
    </footer>
  );
}
