import Link from "next/link";
import { EditorialFooter, EditorialHeader } from "./components/EditorialChrome";

export default function NotFound() {
  return (
    <main id="main-content" className="editorial-page editorial-not-found">
      <EditorialHeader />
      <section className="editorial-page-hero">
        <p>Page not found · XYLENS</p>
        <h1>This part of the journal has moved—or has not been published.</h1>
        <strong>
          Return to the current issue or browse the evidence desk for public,
          reviewed writing.
        </strong>
        <div className="editorial-takeaway">
          <span>Next step</span>
          <p>
            <Link href="/journal">Open the journal ↗</Link>
          </p>
        </div>
      </section>
      <EditorialFooter />
    </main>
  );
}
