"use client";

import { useState } from "react";

export default function ArticleShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button type="button" className="article-share" onClick={share}>
      {copied ? "Link copied" : "Share story"} <span aria-hidden="true">↗</span>
    </button>
  );
}
