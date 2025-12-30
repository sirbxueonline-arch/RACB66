"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { transition } from "@/lib/motion";

export default function MobileNav({
  navItems,
  ctaLabel,
  menuLabel,
  closeLabel,
  navigationLabel,
}: {
  navItems: { href: string; label: string }[];
  ctaLabel: string;
  menuLabel: string;
  closeLabel: string;
  navigationLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="lg:hidden">
      <button
        className="focus-ring rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {menuLabel}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : transition}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              id="mobile-nav"
              className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-soft"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduceMotion ? { duration: 0 } : transition}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{navigationLabel}</p>
                <button
                  className="focus-ring rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/60"
                  onClick={() => setOpen(false)}
                >
                  {closeLabel}
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-black/70"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <LanguageSwitcher />
              </div>
              <Link
                href="/booking"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-black"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
