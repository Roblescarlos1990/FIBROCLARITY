"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import DeepNetworkScene from "./DeepNetworkScene";

type IntroSequenceProps = {
  onComplete: () => void;
};

const matrixStreams = [
  "XYL//EVIDENCE::01 01001101 43.126N",
  "JOURNAL_NODE 7F-A9 CITE/VERIFY/REVIEW",
  "MED//WELL 00110110 SOURCE_CHAIN::ACTIVE",
  "FIELD_NOTE 32.7157N SIGNAL::PACIFIC",
  "CLAIM_REGISTER 0101 STATUS::BOUNDED",
  "METHOD_LAYER 8E-4B HUMAN_CONTEXT::TRUE",
  "RESEARCH_DESK 00101100 UNCERTAINTY::VISIBLE",
  "XYLENS_CORE REV.01 TRUST_PROTOCOL",
  "COASTAL_NODE 117.1611W DATA::FLOW",
  "EDITORIAL_RECORD 01100010 NO_HYPE",
  "SOURCE_GRAPH A7-31 ACCESS::PUBLIC",
  "LIVING_SYSTEM 01001110 INQUIRY::OPEN",
];

const phases = [
  "SYSTEM AWAKENING",
  "NETWORK FORMATION",
  "IDENTITY RECONSTRUCTION",
  "PUBLICATION READY",
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const [phase, setPhase] = useState(0);

  const dismiss = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onComplete, reducedMotion ? 120 : 860);
  }, [leaving, onComplete, reducedMotion]);

  useEffect(() => {
    if (window.sessionStorage.getItem("xylens:intro-seen")) {
      onComplete();
      return;
    }

    window.sessionStorage.setItem("xylens:intro-seen", "true");
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const shouldReduceMotion = motionQuery.matches;
    const readyFrame = window.requestAnimationFrame(() => {
      setReducedMotion(shouldReduceMotion);
      setReady(true);
    });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const phaseTimers = shouldReduceMotion
      ? []
      : [
          window.setTimeout(() => setPhase(1), 1150),
          window.setTimeout(() => setPhase(2), 2450),
          window.setTimeout(() => setPhase(3), 3900),
        ];
    const revealDelay = shouldReduceMotion ? 900 : 6100;
    const exitDelay = shouldReduceMotion ? 140 : 920;
    const revealTimer = window.setTimeout(() => setLeaving(true), revealDelay);
    const completeTimer = window.setTimeout(
      onComplete,
      revealDelay + exitDelay,
    );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        setLeaving(true);
        window.setTimeout(
          onComplete,
          shouldReduceMotion ? 120 : 860,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(readyFrame);
      phaseTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  const markWebglUnavailable = useCallback(
    () => setWebglUnavailable(true),
    [],
  );

  if (!ready) return null;

  return (
    <section
      className={`intro-sequence intro-deep-network ${
        leaving ? "is-leaving" : ""
      } ${webglUnavailable ? "is-static-fallback" : ""}`}
      aria-label="XYLENS opening introduction"
      aria-live="polite"
    >
      <div className="intro-network-stage" aria-hidden="true">
        {!webglUnavailable && (
          <DeepNetworkScene
            reducedMotion={reducedMotion}
            onUnavailable={markWebglUnavailable}
          />
        )}
        <div className="intro-grid-plane" />
        <div className="intro-horizon" />
        <div className="intro-scan-beam" />
        <div className="intro-vignette" />
      </div>

      <div className="intro-codefield" aria-hidden="true">
        {matrixStreams.map((stream) => (
          <span key={stream}>{stream}</span>
        ))}
      </div>

      <div className="intro-system-meta intro-system-meta-left" aria-hidden="true">
        <span>XYLENS // PUBLICATION NODE</span>
        <span>32.7157° N · 117.1611° W</span>
        <span>ENCRYPTED EDITORIAL LAYER</span>
      </div>
      <div
        className="intro-system-meta intro-system-meta-right"
        aria-hidden="true"
      >
        <span>SESSION / {String(phase + 1).padStart(2, "0")}</span>
        <span>RENDER / {webglUnavailable ? "SAFE MODE" : "WEBGL ACTIVE"}</span>
        <span>MOTION / {reducedMotion ? "REDUCED" : "ADAPTIVE"}</span>
      </div>

      <div className="intro-phase-readout" aria-hidden="true">
        <span>{String(phase + 1).padStart(2, "0")}</span>
        <i />
        <p>{phases[phase]}</p>
      </div>

      <div className="intro-lockup">
        <div className="intro-logo-stage">
          <span className="intro-logo-orbit intro-logo-orbit-one" />
          <span className="intro-logo-orbit intro-logo-orbit-two" />
          <span className="intro-logo-crosshair" />
          <Image
            className="intro-mark intro-mark-wire"
            src="/xylens-lens-mark.svg"
            alt=""
            width={360}
            height={360}
            priority
          />
          <Image
            className="intro-mark intro-mark-solid"
            src="/xylens-lens-mark.svg"
            alt=""
            width={360}
            height={360}
            priority
          />
          <span className="intro-logo-scan" />
          <span className="intro-logo-fragment fragment-one" />
          <span className="intro-logo-fragment fragment-two" />
          <span className="intro-logo-fragment fragment-three" />
        </div>

        <p className="intro-publication">Journal of Medicine &amp; Wellness</p>
        <h1>
          XYLENS<sup>™</sup>
        </h1>
        <p className="intro-slogan">Where evidence comes into focus.</p>

        <div className="intro-voltflow-signature">
          <span>Engineered on the VoltFlow platform</span>
          <Image
            src="/voltflow-signature-alt.jpg"
            alt="Powered by VoltFlow"
            width={1232}
            height={832}
            priority
          />
        </div>
      </div>

      <button type="button" className="intro-skip" onClick={dismiss}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>
      <p className="intro-access-note">Press Enter or Esc to continue</p>
    </section>
  );
}
