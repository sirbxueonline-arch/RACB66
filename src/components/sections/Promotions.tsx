"use client";

import { useLocale, useTranslations } from "next-intl";
import { promosData, getLocalizedText } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";

export default function Promotions() {
  const t = useTranslations("home.promos");
  const locale = useLocale();

  return (
    <section className="section-grid bg-surface py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-black">
                {t("title")}
              </h2>
            </div>
            <Badge>{t("badge")}</Badge>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promosData.map((promo, index) => (
            <Reveal key={promo.id} delay={index * 0.05}>
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-black/60">
                    {getLocalizedText(promo.badge, locale as never)}
                  </span>
                  <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold text-black">
                    {promo.code}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-black">
                  {getLocalizedText(promo.title, locale as never)}
                </h3>
                <p className="mt-3 text-sm text-black/70">
                  {getLocalizedText(promo.description, locale as never)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
