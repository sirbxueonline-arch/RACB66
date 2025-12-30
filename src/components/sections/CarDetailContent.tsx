"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Car, Review } from "@/lib/data";
import { getLocalizedText } from "@/lib/data";
import CarGallery from "@/components/sections/CarGallery";
import CarDetailPricing from "@/components/sections/CarDetailPricing";
import { IconFuel, IconGear, IconLuggage, IconSeat, IconStar } from "@/components/icons";

export default function CarDetailContent({
  car,
  related,
  reviews,
}: {
  car: Car;
  related: Car[];
  reviews: Review[];
}) {
  const t = useTranslations("carDetail");
  const locale = useLocale();
  const carReviews = reviews.length ? reviews : [];

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-black">
              {car.name}
            </h1>
            <p className="mt-2 text-sm text-black/60">
              {getLocalizedText(car.description, locale as never)}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-black/70">
              <span className="inline-flex items-center gap-2">
                <IconFuel className="h-4 w-4" />
                {t(`fuel.${car.fuelType}`)}
              </span>
              <span className="inline-flex items-center gap-2">
                <IconGear className="h-4 w-4" />
                {t(`transmission.${car.transmission}`)}
              </span>
              <span className="inline-flex items-center gap-2">
                <IconSeat className="h-4 w-4" />
                {car.seats} {t("seats")}
              </span>
              <span className="inline-flex items-center gap-2">
                <IconLuggage className="h-4 w-4" />
                {car.luggage} {t("luggage")}
              </span>
            </div>
            <div className="mt-8">
              <CarGallery images={car.images} name={car.name} />
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-4">
                <h3 className="text-sm font-semibold text-black">
                  {t("specs")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li>
                    {t("year")}: {car.year}
                  </li>
                  <li>
                    {t("engine")}: {car.engine}
                  </li>
                  <li>
                    {t("economy")}: {car.fuelEconomy}
                  </li>
                  <li>
                    {t("availability")}:{` `}
                    <span className="font-medium text-black">
                      {t(`availabilityStatus.${car.availability}`)}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-black/10 p-4">
                <h3 className="text-sm font-semibold text-black">
                  {t("highlights")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  {car.highlights.map((highlight) => (
                    <li key={highlight.az}>
                      {getLocalizedText(highlight, locale as never)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <CarDetailPricing car={car} />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-semibold text-black">
              {t("reviews")}
            </h2>
            <div className="mt-6 space-y-4">
              {(carReviews.length ? carReviews : []).map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-black/10 bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-black">
                      {review.name}
                    </p>
                    <div className="flex items-center gap-1 text-brand-yellow">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <IconStar key={idx} className="h-4 w-4" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-black/70">
                    &ldquo;{getLocalizedText(review.text, locale as never)}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-black">
              {t("similar")}
            </h2>
            <div className="mt-6 space-y-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/cars/${item.slug}`}
                  className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4"
                >
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={120}
                    height={80}
                    className="h-20 w-28 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {item.name}
                    </p>
                    <p className="text-xs text-black/60">{item.brand}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
