"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { defaultLocale, locales } from "@/i18n/routing";
import azMessages from "@/messages/az.json";
import enMessages from "@/messages/en.json";
import ruMessages from "@/messages/ru.json";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
const storageKey = "rent66-locale";
const messagesByLocale: Record<Locale, Record<string, unknown>> = {
  az: azMessages,
  en: enMessages,
  ru: ruMessages,
};

export function useLocaleActions() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocaleActions must be used within I18nProvider");
  }
  return value;
}

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, unknown>>(
    messagesByLocale[defaultLocale]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(storageKey);
    if (stored && locales.includes(stored as Locale)) {
      setLocale(stored as Locale);
    }
  }, []);

  useEffect(() => {
    setMessages(messagesByLocale[locale]);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, locale);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }

  }, [locale]);

  const contextValue = useMemo(
    () => ({ locale, setLocale }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
