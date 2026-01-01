"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        className="focus-ring rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide"
        onClick={() => setOpen(true)}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {menuLabel}
      </button>
      {mounted
        ? createPortal(
            <AnimatePresence>
              {open && (
                <>
                  <motion.div
                    className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : transition}
                    onClick={() => setOpen(false)}
                  />
                  <motion.div
                    id="mobile-nav"
                    role="dialog"
                    aria-modal="true"
                    aria-label={navigationLabel}
                    className="fixed inset-0 z-[210] flex h-full flex-col bg-white"
                    initial={{ y: "8%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "8%", opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : transition}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
                      <span className="text-black">
                        <span className="font-display text-lg font-semibold tracking-tight">
                          Prime<span className="text-brand-yellow">.</span>
                        </span>
                      </span>
                      <button
                        className="focus-ring rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-black/60"
                        onClick={() => setOpen(false)}
                        type="button"
                      >
                        {closeLabel}
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <nav className="flex flex-col gap-3">
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="focus-ring flex items-center justify-between rounded-2xl border border-black/5 px-4 py-3 text-base font-semibold text-black/80 transition hover:border-black/15 hover:bg-black/5"
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                            <span aria-hidden="true" className="text-black/30">
                              &gt;
                            </span>
                          </Link>
                        ))}
                      </nav>
                    </div>
                    <div className="border-t border-black/10 px-6 py-5">
                      <div className="flex justify-center">
                        <LanguageSwitcher />
                      </div>
                      <Link
                        href="/booking"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-black shadow-soft"
                        onClick={() => setOpen(false)}
                      >
                        {ctaLabel}
                      </Link>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
