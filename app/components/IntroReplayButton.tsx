"use client";

import { usePathname, useRouter } from "next/navigation";

export default function IntroReplayButton() {
  const pathname = usePathname();
  const router = useRouter();

  const replay = () => {
    window.sessionStorage.removeItem("xylens:intro-seen");
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("xylens:replay-intro"));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/?intro=replay");
  };

  return (
    <button type="button" className="intro-replay-control" onClick={replay}>
      <span aria-hidden="true">◌</span>
      Replay opening
    </button>
  );
}
