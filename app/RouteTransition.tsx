"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

type TransitionPhase = "idle" | "leaving" | "entering";

type RouteTransitionDetail = {
  href: string;
};

type TransitionTheme = {
  label: string;
  accent: string;
  deep: string;
  wash: string;
};

type TransitionCssProperties = CSSProperties & {
  "--route-accent": string;
  "--route-deep": string;
  "--route-wash": string;
};

const themes: Record<string, TransitionTheme> = {
  wellness: {
    label: "XYLENS · Wellness",
    accent: "#7fa58f",
    deep: "#274b42",
    wash: "#e3eee5",
  },
  reading: {
    label: "XYLENS · The Journal",
    accent: "#6c9ba0",
    deep: "#264a4d",
    wash: "#dfebea",
  },
  research: {
    label: "XYLENS · Evidence",
    accent: "#9aafb4",
    deep: "#334d53",
    wash: "#e4ebec",
  },
  journal: {
    label: "XYLENS · The Journal",
    accent: "#b79254",
    deep: "#213d38",
    wash: "#f3f0e7",
  },
};

function resolveTheme(pathname: string) {
  if (pathname === "/wellness") return themes.wellness;
  if (pathname === "/research" || pathname === "/evidence-reviews") {
    return themes.research;
  }
  if (pathname === "/journal" || pathname.startsWith("/journal/")) {
    return themes.reading;
  }
  return themes.journal;
}

export function navigateWithTransition(href: string) {
  window.dispatchEvent(
    new CustomEvent<RouteTransitionDetail>("xylens:navigate", {
      detail: { href },
    }),
  );
}

export default function RouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [theme, setTheme] = useState<TransitionTheme>(() =>
    resolveTheme(pathname),
  );
  const phaseRef = useRef<TransitionPhase>("idle");
  const previousPathRef = useRef(pathname);
  const leaveTimerRef = useRef<number | null>(null);
  const enterTimerRef = useRef<number | null>(null);
  const failsafeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;
    phaseRef.current = "entering";
    setPhase("entering");
    setTheme(resolveTheme(pathname));

    if (failsafeTimerRef.current) {
      window.clearTimeout(failsafeTimerRef.current);
      failsafeTimerRef.current = null;
    }
    enterTimerRef.current = window.setTimeout(() => {
      phaseRef.current = "idle";
      setPhase("idle");
    }, 780);

    return () => {
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
    };
  }, [pathname]);

  useEffect(() => {
    const beginNavigation = (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (phaseRef.current !== "idle") return;

      const destination = `${url.pathname}${url.search}${url.hash}`;
      phaseRef.current = "leaving";
      setTheme(resolveTheme(url.pathname));
      setPhase("leaving");

      leaveTimerRef.current = window.setTimeout(() => {
        router.push(destination);
        failsafeTimerRef.current = window.setTimeout(() => {
          phaseRef.current = "entering";
          setPhase("entering");
          window.setTimeout(() => {
            phaseRef.current = "idle";
            setPhase("idle");
          }, 780);
        }, 1800);
      }, 460);
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const sameDocument =
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (sameDocument) return;

      event.preventDefault();
      beginNavigation(url.href);
    };

    const onRequestedNavigation = (event: Event) => {
      const navigationEvent =
        event as CustomEvent<RouteTransitionDetail>;
      beginNavigation(navigationEvent.detail.href);
    };

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("xylens:navigate", onRequestedNavigation);
    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("xylens:navigate", onRequestedNavigation);
      if (leaveTimerRef.current) window.clearTimeout(leaveTimerRef.current);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (failsafeTimerRef.current) {
        window.clearTimeout(failsafeTimerRef.current);
      }
    };
  }, [router]);

  const transitionStyle = {
    "--route-accent": theme.accent,
    "--route-deep": theme.deep,
    "--route-wash": theme.wash,
  } as TransitionCssProperties;

  return (
    <div
      className={`route-transition is-${phase}`}
      style={transitionStyle}
      aria-hidden="true"
    >
      <div className="route-transition-surface">
        <span className="route-flow route-flow-primary" />
        <span className="route-flow route-flow-secondary" />
        <span className="route-flow-glint" />
      </div>
      <div className="route-transition-lockup">
        <Image src="/xylens-lens-mark.svg" alt="" width={84} height={84} />
        <div>
          <small>Refocusing</small>
          <strong>{theme.label}</strong>
        </div>
      </div>
      <span className="route-transition-progress" />
    </div>
  );
}
