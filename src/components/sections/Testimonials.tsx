"use client";

import { useLocale, useTranslations } from "next-intl";
import { reviewsData, getLocalizedText } from "@/lib/data";
import { formatDate } from "@/lib/format";
import Carousel from "@/components/ui/Carousel";
import { IconStar } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";

export default function Testimonials() {
  const t = useTranslations("home.testimonials");
  const locale = useLocale();
  const items = reviewsData.slice(0, 8);

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
          <Carousel
            items={items}
            label={t("carouselLabel")}
            prevLabel={t("prev")}
            nextLabel={t("next")}
            getSlideLabel={(index) => t("slideLabel", { index })}
            renderItem={(review) => (
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-brand-yellow">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <IconStar key={idx} className="h-4 w-4" />
                  ))}
                </div>
                <p className="text-lg font-medium text-black">
                  &ldquo;{getLocalizedText(review.text, locale as never)}&rdquo;
                </p>
                <div className="text-sm text-black/60">
                  <p className="font-semibold text-black">{review.name}</p>
                  <p>
                    {t("reviewMeta", {
                      date: formatDate(review.date, locale as never),
                    })}
                  </p>
                </div>
              </div>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
