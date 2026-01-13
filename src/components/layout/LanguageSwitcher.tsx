"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import { useLocaleActions } from "@/components/providers/I18nProvider";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
};

const flagSources: Record<Locale, { primary: string; fallback: string }> = {
  az: { primary: "/icons/AZ.png", fallback: "/icons/AZ.png" },
  en: { primary: "/icons/EN.png", fallback: "/icons/EN.png" },
  ru: { primary: "/icons/RU.png", fallback: "/icons/RU.png" },
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const { setLocale } = useLocaleActions();
  const [isOpen, setIsOpen] = useState(false);
  const [flagSrcs, setFlagSrcs] = useState<Record<Locale, string>>({
    az: flagSources.az.primary,
    en: flagSources.en.primary,
    ru: flagSources.ru.primary,
  });
  const [flagHidden, setFlagHidden] = useState<Record<Locale, boolean>>({
    az: false,
    en: false,
    ru: false,
  });

  const handleFlagError = (loc: Locale) => {
    setFlagSrcs((prev) => {
      const current = prev[loc];
      const { primary, fallback } = flagSources[loc];
      if (current === primary && fallback !== primary) {
        return { ...prev, [loc]: fallback };
      }
      return prev;
    });
    setFlagHidden((prev) => {
      const current = flagSrcs[loc];
      const { primary } = flagSources[loc];
      if (current === primary) {
        return prev;
      }
      return { ...prev, [loc]: true };
    });
  };

  const handleSelect = (loc: Locale) => {
    setLocale(loc);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="focus-ring flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-black/70 transition hover:bg-black/5"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("language")}
      >
        {flagHidden[locale] ? (
          <span
            aria-hidden="true"
            className="h-4 w-4 rounded-full bg-black/10"
          />
        ) : (
          <Image
            src={flagSrcs[locale]}
            alt=""
            width={18}
            height={18}
            className="h-4 w-4 rounded-full object-cover"
            onError={() => handleFlagError(locale)}
          />
        )}
        <span>{labels[locale]}</span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 top-full z-50 mt-1 min-w-[100px] overflow-hidden rounded-xl border border-black/10 bg-white py-1 shadow-lg"
            role="listbox"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelect(loc)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide transition hover:bg-black/5",
                  loc === locale ? "bg-brand-yellow/10 text-black" : "text-black/70"
                )}
                role="option"
                aria-selected={loc === locale}
              >
                {flagHidden[loc] ? (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-full bg-black/10"
                  />
                ) : (
                  <Image
                    src={flagSrcs[loc]}
                    alt=""
                    width={18}
                    height={18}
                    className="h-4 w-4 rounded-full object-cover"
                    onError={() => handleFlagError(loc)}
                  />
                )}
                <span>{labels[loc]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
