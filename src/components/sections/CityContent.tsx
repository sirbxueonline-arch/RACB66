"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Car, Destination } from "@/lib/data";
import { getLocalizedText } from "@/lib/data";

export default function CityContent({
  city,
  recommended,
}: {
  city: Destination;
  recommended: Car[];
}) {
  const t = useTranslations("cities");
  const locale = useLocale();

  return (
    <section className="py-14">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-black">
              {getLocalizedText(city.name, locale as never)}
            </h1>
            <p className="mt-3 text-sm text-black/70">
              {getLocalizedText(city.description, locale as never)}
            </p>
            <div className="mt-6 grid gap-3 text-sm text-black/70 md:grid-cols-2">
              {(city.attractions ?? []).map((attraction) => (
                <div
                  key={attraction.az}
                  className="rounded-2xl border border-black/10 bg-white p-4"
                >
                  {getLocalizedText(attraction, locale as never)}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-soft">
            <Image
              src={city.image}
              alt={getLocalizedText(city.name, locale as never)}
              width={560}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-black">
            {t("recommended")}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {recommended.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.slug}`}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-soft"
              >
                <div className="relative h-40">
                  <Image
                    src={car.images[0]}
                    alt={car.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-black">{car.name}</p>
                  <p className="text-xs text-black/60">{car.brand}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
