"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type IntroSequenceProps = {
  onComplete: () => void;
};

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("xylens:intro-seen")) {
      onComplete();
      return;
    }
    window.sessionStorage.setItem("xylens:intro-seen", "true");
    const readyFrame = window.requestAnimationFrame(() => setReady(true));

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealDelay = reducedMotion ? 300 : 3300;
    const exitDelay = reducedMotion ? 80 : 720;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const revealTimer = window.setTimeout(() => setLeaving(true), revealDelay);
    const completeTimer = window.setTimeout(
      onComplete,
      revealDelay + exitDelay,
    );

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  const dismiss = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onComplete, 540);
  };

  if (!ready) return null;

  return (
    <div
      className={`public-intro-sequence ${leaving ? "is-leaving" : ""}`}
      aria-label="XYLENS opening"
    >
      <div className="public-intro-weather" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="public-intro-rings" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="public-intro-lockup">
        <Image
          className="public-intro-mark"
          src="/xylens-lens-mark.svg"
          alt=""
          width={360}
          height={360}
        />
        <p>Journal of Medicine &amp; Wellness</p>
        <strong>XYLENS</strong>
        <small>Where evidence comes into focus.</small>
      </div>
      <button type="button" className="public-intro-skip" onClick={dismiss}>
        Enter the journal <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
