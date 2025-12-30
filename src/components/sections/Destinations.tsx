"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { destinationsData, getLocalizedText } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export default function Destinations() {
  const t = useTranslations("home.destinations");
  const locale = useLocale();
  const featured = destinationsData.slice(0, 5);

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-black">
                {t("title")}
              </h2>
            </div>
            <Link
              href="/cities/gabala"
              className="text-sm font-semibold text-black/60 hover:text-black"
            >
              {t("cta")}
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((destination, index) => (
            <Reveal key={destination.id} delay={index * 0.05}>
              <Link
                href={`/cities/${destination.slug}`}
                className="group block overflow-hidden rounded-3xl border border-black/10 bg-white shadow-soft"
              >
                <Image
                  src={destination.image}
                  alt={getLocalizedText(destination.name, locale as never)}
                  width={420}
                  height={280}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black">
                    {getLocalizedText(destination.name, locale as never)}
                  </h3>
                  <p className="mt-2 text-sm text-black/70">
                    {getLocalizedText(destination.description, locale as never)}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                    {getLocalizedText(destination.highlight, locale as never)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
