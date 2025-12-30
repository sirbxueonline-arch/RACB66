"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { transition } from "@/lib/motion";

export default function Carousel<T>({
  items,
  renderItem,
  className,
  autoPlay = true,
  interval = 6000,
  label,
  prevLabel,
  nextLabel,
  getSlideLabel,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  label: string;
  prevLabel: string;
  nextLabel: string;
  getSlideLabel?: (index: number) => string;
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const id = useId();

  useEffect(() => {
    if (!autoPlay || reduceMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length, reduceMotion]);

  const goTo = (next: number) => {
    setIndex((next + items.length) % items.length);
  };

  return (
    <div
      className={cn("relative rounded-3xl border border-black/10", className)}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={`${id}-label`}
    >
      <p id={`${id}-label`} className="sr-only">
        {label}
      </p>
      <div
        className="overflow-hidden"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            goTo(index + 1);
          }
          if (event.key === "ArrowLeft") {
            goTo(index - 1);
          }
        }}
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={reduceMotion ? { duration: 0 } : transition}
            className="p-6 md:p-10"
          >
            {renderItem(items[index])}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between px-6 pb-6 md:px-10">
        <div className="flex gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={cn(
                "h-2.5 w-2.5 rounded-full",
                idx === index ? "bg-brand-yellow" : "bg-black/15"
              )}
              onClick={() => goTo(idx)}
              aria-label={
                getSlideLabel ? getSlideLabel(idx + 1) : `Go to slide ${idx + 1}`
              }
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            className="focus-ring rounded-full border border-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/70"
            onClick={() => goTo(index - 1)}
            aria-label={prevLabel}
          >
            {prevLabel}
          </button>
          <button
            className="focus-ring rounded-full border border-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/70"
            onClick={() => goTo(index + 1)}
            aria-label={nextLabel}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
