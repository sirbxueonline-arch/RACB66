"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
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

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center rounded-full border border-black/10 bg-white p-1 text-xs font-semibold uppercase tracking-wide text-black/70"
    >
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={cn(
            "focus-ring flex items-center gap-2 rounded-full px-3 py-2 transition",
            loc === locale
              ? "bg-brand-yellow text-black shadow-sm"
              : "text-black/70 hover:bg-black/5"
          )}
          aria-pressed={loc === locale}
          aria-label={labels[loc]}
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
    </div>
  );
}
