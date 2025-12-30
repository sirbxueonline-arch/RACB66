"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import { useLocaleActions } from "@/components/providers/I18nProvider";

const labels: Record<string, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const { setLocale } = useLocaleActions();

  return (
    <label className="focus-ring flex items-center rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-wide text-black/70">
      <span className="sr-only">{t("language")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="bg-transparent text-xs font-semibold uppercase tracking-wide text-black outline-none"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {labels[loc]}
          </option>
        ))}
      </select>
    </label>
  );
}
