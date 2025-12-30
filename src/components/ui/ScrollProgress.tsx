"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const current = window.scrollY;
      const next = total > 0 ? (current / total) * 100 : 0;
      setProgress(next);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 h-1 w-full bg-transparent">
      <div
        className="h-full bg-brand-yellow transition-[width]"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
