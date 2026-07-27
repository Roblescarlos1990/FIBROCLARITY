"use client";

import { useCallback, useEffect, useState } from "react";
import AdminIntroSequence from "./AdminIntroSequence";
import AdminStudio from "./AdminStudio";

export default function AdminEntry({
  publishingConfigured,
}: {
  publishingConfigured: boolean;
}) {
  const [introComplete, setIntroComplete] = useState(false);
  const completeIntro = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    const replayIntro = () => setIntroComplete(false);
    window.addEventListener("xylens:replay-admin-intro", replayIntro);
    return () =>
      window.removeEventListener("xylens:replay-admin-intro", replayIntro);
  }, []);

  return (
    <>
      {!introComplete && <AdminIntroSequence onComplete={completeIntro} />}
      <AdminStudio publishingConfigured={publishingConfigured} />
    </>
  );
}
