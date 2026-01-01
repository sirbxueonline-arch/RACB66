"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function CarGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0 } : transition}
            className="relative h-[320px] md:h-[420px]"
          >
            <Image
              src={images[active]}
              alt={name}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-4 gap-3 md:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActive(index)}
            className={cn(
              "focus-ring relative h-20 overflow-hidden rounded-2xl border",
              index === active
                ? "border-brand-yellow"
                : "border-black/10 opacity-60"
            )}
          >
            <Image
              src={image}
              alt={`${name} thumbnail`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
