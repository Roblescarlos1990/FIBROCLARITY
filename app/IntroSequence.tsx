"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type IntroSequenceProps = {
  onComplete: () => void;
};

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
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

  return (
    <div
      className={`intro-sequence ${leaving ? "is-leaving" : ""}`}
      aria-label="XYLENS opening"
    >
      <div className="intro-weather" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="intro-rings" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="intro-lockup">
        <Image
          className="intro-mark"
          src="/xylens-oak-mark.svg"
          alt=""
          width={360}
          height={360}
        />
        <p>Journal of Medicine &amp; Wellness</p>
        <strong>XYLENS</strong>
        <small>Where evidence takes root.</small>
      </div>
      <button type="button" className="intro-skip" onClick={dismiss}>
        Enter the journal <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
