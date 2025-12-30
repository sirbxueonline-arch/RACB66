"use client";

import { useLocale, useTranslations } from "next-intl";
import { faqsData, getLocalizedText } from "@/lib/data";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";

export default function FAQ() {
  const t = useTranslations("home.faq");
  const locale = useLocale();
  const items = faqsData.map((faq) => ({
    id: faq.id,
    title: getLocalizedText(faq.question, locale as never),
    content: getLocalizedText(faq.answer, locale as never),
  }));

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-black">
                {t("title")}
              </h2>
            </div>
            <p className="text-sm text-black/60">{t("subtitle")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
