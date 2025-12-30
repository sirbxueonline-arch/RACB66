"use client";

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

const flags: Record<Locale, string> = {
  az: "/icons/flags/az.png",
  en: "/icons/flags/en.png",
  ru: "/icons/flags/ru.png",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const { setLocale } = useLocaleActions();

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
        >
          <Image
            src={flags[loc]}
            alt={`${labels[loc]} flag`}
            width={18}
            height={18}
            className="h-4 w-4 rounded-full object-cover"
          />
          <span>{labels[loc]}</span>
        </button>
      ))}
    </div>
  );
}
