"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { carsData, deliveryFeesData, getLocalizedText } from "@/lib/data";
import { calculatePricing } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";
import Tabs from "@/components/ui/Tabs";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import PricingBreakdown from "@/components/ui/PricingBreakdown";
import Modal from "@/components/ui/Modal";
import { IconFuel, IconGear, IconLuggage, IconSeat, IconStar } from "@/components/icons";
import { cn } from "@/lib/utils";

const categoryTabs = [
  "all",
  "economy",
  "business",
  "premium",
  "suv",
  "minivan",
  "transport",
  "transfer",
];
const previewDates = {
  startDate: "2025-01-15T10:00",
  endDate: "2025-01-17T10:00",
};

export default function CarsListing() {
  const t = useTranslations("cars");
  const tCategories = useTranslations("categories");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [seats, setSeats] = useState("any");
  const [fuel, setFuel] = useState("any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("price-asc");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const previewLocation = deliveryFeesData[0]
    ? getLocalizedText(deliveryFeesData[0].location, locale as never)
    : "";

  const brands = useMemo(
    () => Array.from(new Set(carsData.map((car) => car.brand))),
    []
  );

  /* Grouping logic logic changed to support price ranges */
  const filteredCars = useMemo(() => {
    let data = carsData;

    // 1. Filter by Category
    if (category !== "all") {
      data = data.filter((car) => car.category === category);
    } else {
      // Hide "Quote" items (price 0) from "All" view
      data = data.filter((car) => car.dailyPrice > 0);
    }

    // 2. Filter by props
    data = data
      .filter((car) => (brand === "all" ? true : car.brand === brand))
      .filter((car) => {
        if (seats === "any") return true;
        return car.seats >= Number(seats);
      })
      .filter((car) => (fuel === "any" ? true : car.fuelType === fuel))
      .filter((car) => {
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Number.POSITIVE_INFINITY;
        return car.dailyPrice >= min && car.dailyPrice <= max;
      });

    // 3. Group by Name
    const groups = new Map<string, typeof carsData>();
    data.forEach((car) => {
      if (!groups.has(car.name)) {
        groups.set(car.name, []);
      }
      groups.get(car.name)!.push(car);
    });

    // 4. Create display items (one per group)
    const displayItems: Array<{
      car: typeof carsData[0];
      minPrice: number;
      maxPrice: number;
      count: number;
      variants: typeof carsData;
    }> = [];

    groups.forEach((groupCars) => {
      // Sort variants by price ASC
      groupCars.sort((a, b) => a.dailyPrice - b.dailyPrice);
      
      const min = groupCars[0].dailyPrice;
      const max = groupCars[groupCars.length - 1].dailyPrice;
      
      // Use the cheapest car as the representative for image/info
      displayItems.push({
        car: groupCars[0],
        minPrice: min,
        maxPrice: max,
        count: groupCars.length,
        variants: groupCars
      });
    });

    // 5. Sort final list
    return displayItems.sort((a, b) => {
      if (sort === "price-asc") return a.minPrice - b.minPrice;
      if (sort === "price-desc") return b.minPrice - a.minPrice;
      // For rating, use the representative car's rating
      return b.car.rating - a.car.rating;
    });
  }, [brand, category, fuel, maxPrice, minPrice, seats, sort]);

  const pricingInput = useMemo(() => {
    return {
      carId: "preview",
      startDate: previewDates.startDate,
      endDate: previewDates.endDate,
      pickupLocation: previewLocation,
      dropoffLocation: previewLocation,
      insurance: "standard" as const,
      extras: {
        gps: false,
        childSeat: false,
        additionalDriver: false,
      },
      promoCode: "BAKU66",
    };
  }, [previewLocation]);

  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-black">
              {t("title")}
            </h1>
            <p className="mt-2 text-sm text-black/60">{t("subtitle")}</p>
          </div>
        <div className="flex gap-3">
          <Link
            href="/compare"
            className="focus-ring inline-flex items-center whitespace-nowrap rounded-lg border border-black/15 px-5 py-2 text-sm font-semibold text-black transition hover:border-black/40 hover:bg-black/5"
          >
            {t("compareCta")}
          </Link>
          <Button variant="outline" onClick={() => setFiltersOpen(true)}>
            {t("filtersLabel")}
          </Button>
            <Select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-w-[160px]"
              aria-label={t("sort")}
            >
              <option value="price-asc">{t("sortAsc")}</option>
              <option value="price-desc">{t("sortDesc")}</option>
              <option value="rating">{t("sortRating")}</option>
            </Select>
          </div>
        </div>
        <div className="mt-8">
          <Tabs
            tabs={categoryTabs.map((cat) => ({
              id: cat,
              label: tCategories(cat),
            }))}
            value={category}
            onChange={setCategory}
            ariaLabel={t("tabsLabel")}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden space-y-5 rounded-3xl border border-black/10 bg-white p-5 shadow-sm lg:block">
            <FilterFields
              brand={brand}
              brands={brands}
              fuel={fuel}
              seats={seats}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onBrand={setBrand}
              onFuel={setFuel}
              onSeats={setSeats}
              onMinPrice={setMinPrice}
              onMaxPrice={setMaxPrice}
            />
          </aside>

          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredCars.map((item) => {
                const { car, minPrice, maxPrice, count } = item;
                const result = calculatePricing(car, pricingInput); // Calculates based on the base car (min price)
                
                const isRange = minPrice !== maxPrice;

                return (
                  <motion.div
                    key={car.id} // Use the ID of the representative car
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-soft"
                  >
                    <div className="relative h-52">
                      <Image
                        src={car.images[0]}
                        alt={car.name}
                        fill
                        sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span
                        className={cn(
                          "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                          car.availability === "available" &&
                            "bg-brand-yellow text-black",
                          car.availability === "limited" &&
                            "bg-black text-white",
                          car.availability === "unavailable" &&
                            "bg-red-600 text-white"
                        )}
                      >
                        {t(`availability.${car.availability}`)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-black">
                          {car.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-black/60">
                          <IconStar className="h-4 w-4 text-brand-yellow" />
                          {car.rating.toFixed(1)}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-black/60">
                        {getLocalizedText(car.description, locale as never)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-black/60">
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
                        {/* Show count/variants if range? Maybe just luggage is fine */}
                        <span className="inline-flex items-center gap-2">
                          <IconLuggage className="h-4 w-4" />
                          {car.luggage} {t("luggage")}
                        </span>
                      </div>
                      <div className="mt-5 flex items-end justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                            {t("daily")}
                          </p>
                          <div className="flex items-baseline gap-1">
                             {minPrice === 0 ? (
                               <p className="text-xl font-bold uppercase text-black">
                                 Quote
                               </p>
                             ) : isRange ? (
                                <>
                                  <p className="text-2xl font-semibold text-black">
                                    {minPrice}-{maxPrice}
                                  </p>
                                  <span className="text-sm font-medium text-black/60">AZN</span>
                                </>
                             ) : (
                              <p className="text-2xl font-semibold text-black">
                                {formatCurrency(car.dailyPrice, locale as never)}
                              </p>
                             )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/cars/${car.slug}`}
                            className="focus-ring whitespace-nowrap rounded-lg border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/70"
                          >
                            {t("details")}
                          </Link>
                          <Link
                            href={`/booking?car=${car.slug}`}
                            className="focus-ring whitespace-nowrap rounded-lg bg-brand-yellow px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black"
                          >
                            {t("order")}
                          </Link>
                        </div>
                      </div>
                      {!isRange && (
                        <PricingBreakdown
                          result={result}
                          collapsible
                          className="mt-4"
                        />
                      )}
                      {isRange && (
                         <div className="mt-4 text-xs text-black/40">
                           {count} {count === 1 ? 'variant' : 'variants'} available
                         </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Modal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title={t("filtersLabel")}
        closeLabel={tNav("close")}
      >
        <FilterFields
          brand={brand}
          brands={brands}
          fuel={fuel}
          seats={seats}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onBrand={setBrand}
          onFuel={setFuel}
          onSeats={setSeats}
          onMinPrice={setMinPrice}
          onMaxPrice={setMaxPrice}
        />
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setFiltersOpen(false)}>{t("apply")}</Button>
        </div>
      </Modal>
    </section>
  );
}

function FilterFields({
  brand,
  brands,
  seats,
  fuel,
  minPrice,
  maxPrice,
  onBrand,
  onSeats,
  onFuel,
  onMinPrice,
  onMaxPrice,
}: {
  brand: string;
  brands: string[];
  seats: string;
  fuel: string;
  minPrice: string;
  maxPrice: string;
  onBrand: (value: string) => void;
  onSeats: (value: string) => void;
  onFuel: (value: string) => void;
  onMinPrice: (value: string) => void;
  onMaxPrice: (value: string) => void;
}) {
  const t = useTranslations("cars.filters");
  const id = useId();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor={`${id}-brand`}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50"
        >
          {t("brand")}
        </label>
        <Select
          id={`${id}-brand`}
          value={brand}
          onChange={(event) => onBrand(event.target.value)}
        >
          <option value="all">{t("all")}</option>
          {brands.map((brandItem) => (
            <option key={brandItem} value={brandItem}>
              {brandItem}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label
          htmlFor={`${id}-seats`}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50"
        >
          {t("seats")}
        </label>
        <Select
          id={`${id}-seats`}
          value={seats}
          onChange={(event) => onSeats(event.target.value)}
        >
          <option value="any">{t("any")}</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
          <option value="7">7+</option>
          <option value="9">9+</option>
        </Select>
      </div>
      <div>
        <label
          htmlFor={`${id}-fuel`}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50"
        >
          {t("fuel")}
        </label>
        <Select
          id={`${id}-fuel`}
          value={fuel}
          onChange={(event) => onFuel(event.target.value)}
        >
          <option value="any">{t("any")}</option>
          <option value="petrol">{t("petrol")}</option>
          <option value="diesel">{t("diesel")}</option>
          <option value="hybrid">{t("hybrid")}</option>
          <option value="electric">{t("electric")}</option>
        </Select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          {t("priceRange")}
        </label>
        <div className="flex gap-2">
          <Input
            id={`${id}-min`}
            type="number"
            inputMode="numeric"
            value={minPrice}
            onChange={(event) => onMinPrice(event.target.value)}
            placeholder={t("min")}
          />
          <Input
            id={`${id}-max`}
            type="number"
            inputMode="numeric"
            value={maxPrice}
            onChange={(event) => onMaxPrice(event.target.value)}
            placeholder={t("max")}
          />
        </div>
      </div>
    </div>
  );
}
