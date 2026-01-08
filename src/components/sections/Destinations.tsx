"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { destinationsData, getLocalizedText } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Stagger from "@/components/ui/Stagger";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

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
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinationsData.slice(0, 3).map((city) => (
            <motion.div key={city.slug} variants={fadeUp}>
              <Link href={`/cities/${city.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={city.image}
                  alt={getLocalizedText(city.name, locale as any)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white">
                    {getLocalizedText(city.name, locale as any)}
                  </h3>
                  <p className="text-white/80">49 {t("recommended").toLowerCase().replace(":", "")}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
