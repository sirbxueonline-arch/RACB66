"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  label: string;
};

export default function Tabs({
  tabs,
  value,
  onChange,
  className,
  ariaLabel,
}: {
  tabs: Tab[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  ariaLabel: string;
}) {
  const baseId = useId();

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "flex flex-wrap gap-2 rounded-2xl border border-black/10 bg-white p-2 shadow-sm",
        className
      )}
      onKeyDown={(event) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === value);
        if (event.key === "ArrowRight") {
          const next = tabs[(currentIndex + 1) % tabs.length];
          onChange(next.id);
        }
        if (event.key === "ArrowLeft") {
          const prev = tabs[(currentIndex - 1 + tabs.length) % tabs.length];
          onChange(prev.id);
        }
      }}
    >
      {tabs.map((tab, index) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            id={`${baseId}-${index}`}
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              "focus-ring rounded-full px-4 py-2 text-sm font-semibold transition",
              selected
                ? "bg-brand-yellow text-black shadow-soft"
                : "text-black/60 hover:bg-black/5"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
