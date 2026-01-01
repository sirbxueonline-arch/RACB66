"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { carsData, getLocalizedText } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const maxSelected = 3;

export default function CompareFleet() {
  const t = useTranslations("compare");
  const tCars = useTranslations("cars");
  const tCategories = useTranslations("categories");
  const locale = useLocale();
  const [selected, setSelected] = useState<string[]>([]);

  const selectedCars = useMemo(
    () => carsData.filter((car) => selected.includes(car.slug)),
    [selected]
  );

  const rows = useMemo(
    () => [
      {
        id: "price",
        label: t("rows.price"),
        value: (car: typeof carsData[number]) =>
          formatCurrency(car.dailyPrice, locale as never),
      },
      {
        id: "category",
        label: t("rows.category"),
        value: (car: typeof carsData[number]) => tCategories(car.category),
      },
      {
        id: "transmission",
        label: t("rows.transmission"),
        value: (car: typeof carsData[number]) =>
          tCars(`transmission.${car.transmission}`),
      },
      {
        id: "fuel",
        label: t("rows.fuel"),
        value: (car: typeof carsData[number]) =>
          tCars(`fuel.${car.fuelType}`),
      },
      {
        id: "seats",
        label: t("rows.seats"),
        value: (car: typeof carsData[number]) =>
          `${car.seats} ${tCars("seats")}`,
      },
      {
        id: "luggage",
        label: t("rows.luggage"),
        value: (car: typeof carsData[number]) =>
          `${car.luggage} ${tCars("luggage")}`,
      },
      {
        id: "year",
        label: t("rows.year"),
        value: (car: typeof carsData[number]) => String(car.year),
      },
      {
        id: "engine",
        label: t("rows.engine"),
        value: (car: typeof carsData[number]) => car.engine,
      },
      {
        id: "economy",
        label: t("rows.economy"),
        value: (car: typeof carsData[number]) => car.fuelEconomy,
      },
      {
        id: "availability",
        label: t("rows.availability"),
        value: (car: typeof carsData[number]) =>
          tCars(`availability.${car.availability}`),
      },
    ],
    [locale, t, tCars, tCategories]
  );

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      }
      if (prev.length >= maxSelected) {
        return prev;
      }
      return [...prev, slug];
    });
  };

  const clear = () => setSelected([]);

  return (
    <section className="py-12">
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

        <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-black">
                {t("selectedTitle", { count: selectedCars.length })}
              </p>
              <p className="text-xs text-black/60">
                {t("selectedHint", { max: maxSelected })}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clear}
              disabled={selectedCars.length === 0}
            >
              {t("clear")}
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedCars.length === 0 && (
              <p className="text-sm text-black/60">{t("empty")}</p>
            )}
            {selectedCars.map((car) => (
              <span
                key={car.slug}
                className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white"
              >
                {car.name}
                <button
                  type="button"
                  onClick={() => toggle(car.slug)}
                  className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]"
                  aria-label={t("remove", { name: car.name })}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {carsData.map((car) => {
            const isSelected = selected.includes(car.slug);
            const disabled = !isSelected && selected.length >= maxSelected;
            return (
              <Reveal key={car.id}>
                <div
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition",
                    isSelected ? "border-brand-yellow" : "border-black/10"
                  )}
                >
                  <div className="relative h-40">
                    <Image
                      src={car.images[0]}
                      alt={car.name}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black">
                      {tCategories(car.category)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-black">{car.name}</p>
                      <p className="text-xs text-black/60">
                        {formatCurrency(car.dailyPrice, locale as never)}
                      </p>
                    </div>
                    <p className="mt-2 text-xs text-black/60">
                      {getLocalizedText(car.description, locale as never)}
                    </p>
                    <Button
                      type="button"
                      variant={isSelected ? "secondary" : "outline"}
                      size="sm"
                      className="mt-4"
                      onClick={() => toggle(car.slug)}
                      disabled={disabled}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? t("removeCta") : t("selectCta")}
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
          {selectedCars.length === 0 ? (
            <p className="text-sm text-black/60">{t("tableEmpty")}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[640px] w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-black/10 text-left text-xs uppercase tracking-[0.25em] text-black/40">
                    <th className="py-3 pr-4">{t("tableLabel")}</th>
                    {selectedCars.map((car) => (
                      <th key={car.slug} className="py-3 pr-4">
                        {car.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-black/5">
                      <th className="py-3 pr-4 text-left font-semibold text-black">
                        {row.label}
                      </th>
                      {selectedCars.map((car) => (
                        <td key={car.slug} className="py-3 pr-4 text-black/70">
                          {row.value(car)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
