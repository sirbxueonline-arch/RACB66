"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { servicesData, getLocalizedText } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

function ServiceIcon({ icon }: { icon: string }) {
  if (icon === "airport") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M3 12h18M12 3l4 9-4 9-4-9 4-9z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  if (icon === "chauffeur") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M4 16l2-6h12l2 6M6 16v3h12v-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4v8l5 3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ServicesContent() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-black/60">{t("subtitle")}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.05}>
              <div className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-black">
                    <ServiceIcon icon={service.icon} />
                  </span>
                  <h2 className="text-xl font-semibold text-black">
                    {getLocalizedText(service.title, locale as never)}
                  </h2>
                </div>
                <p className="mt-4 text-sm text-black/70">
                  {getLocalizedText(service.description, locale as never)}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                  {getLocalizedText(service.priceRange, locale as never)}
                </p>
                <div className="mt-6">
                  <Link href="/booking">
                    <Button size="sm">{t("cta")}</Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
