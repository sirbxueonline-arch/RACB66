"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { calculatePricing } from "@/lib/pricing";
import type { Car } from "@/lib/data";
import { deliveryFeesData, getLocalizedText, mapLocationToLocale } from "@/lib/data";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import PricingBreakdown from "@/components/ui/PricingBreakdown";
import Button from "@/components/ui/Button";

export default function CarDetailPricing({ car }: { car: Car }) {
  const t = useTranslations("carDetail.pricing");
  const locale = useLocale();
  const id = useId();
  const locations = deliveryFeesData.map((fee) =>
    getLocalizedText(fee.location, locale as never)
  );
  const fallbackLocation = locations[0] ?? t("defaultLocation");
  const [pickupLocation, setPickupLocation] = useState(fallbackLocation);
  const [dropoffLocation, setDropoffLocation] = useState(fallbackLocation);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [extras, setExtras] = useState({
    gps: false,
    childSeat: false,
    additionalDriver: false,
  });

  useEffect(() => {
    setPickupLocation((prev) => mapLocationToLocale(prev, locale as never));
    setDropoffLocation((prev) => mapLocationToLocale(prev, locale as never));
  }, [locale]);

  useEffect(() => {
    if (startDate && endDate) return;
    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + 3);
    setStartDate((prev) => prev || start.toISOString().slice(0, 16));
    setEndDate((prev) => prev || end.toISOString().slice(0, 16));
  }, [startDate, endDate]);

  const result = useMemo(
    () =>
      calculatePricing(car, {
        carId: car.id,
        startDate,
        endDate,
        pickupLocation,
        dropoffLocation,
        dropoffLocation,
        extras,
        promoCode,
      }),
    [car, dropoffLocation, endDate, extras, pickupLocation, promoCode, startDate]
  );

  const bookingParams = new URLSearchParams({
    car: car.slug,
    pickupLocation,
    dropoffLocation,
    pickupDate: startDate,
    dropoffDate: endDate,
    promoCode,
    gps: extras.gps ? "1" : "0",
    childSeat: extras.childSeat ? "1" : "0",
    additionalDriver: extras.additionalDriver ? "1" : "0",
  }).toString();

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-black">{t("title")}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${id}-pickup`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("pickup")}
          </label>
          <Select
            id={`${id}-pickup`}
            value={pickupLocation}
            onChange={(event) => setPickupLocation(event.target.value)}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label
            htmlFor={`${id}-dropoff`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("dropoff")}
          </label>
          <Select
            id={`${id}-dropoff`}
            value={dropoffLocation}
            onChange={(event) => setDropoffLocation(event.target.value)}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label
            htmlFor={`${id}-start`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("startDate")}
          </label>
          <Input
            id={`${id}-start`}
            type="datetime-local"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor={`${id}-end`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("endDate")}
          </label>
          <Input
            id={`${id}-end`}
            type="datetime-local"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor={`${id}-promo`}
            className="text-xs font-semibold uppercase tracking-wide text-black/50"
          >
            {t("promo")}
          </label>
          <Input
            id={`${id}-promo`}
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder="BAKU66"
          />
        </div>
      <div className="mt-4 space-y-2 text-sm text-black/70">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={extras.gps}
            onChange={(event) =>
              setExtras((prev) => ({ ...prev, gps: event.target.checked }))
            }
          />
          {t("extraGps")}
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={extras.childSeat}
            onChange={(event) =>
              setExtras((prev) => ({
                ...prev,
                childSeat: event.target.checked,
              }))
            }
          />
          {t("extraChildSeat")}
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={extras.additionalDriver}
            onChange={(event) =>
              setExtras((prev) => ({
                ...prev,
                additionalDriver: event.target.checked,
              }))
            }
          />
          {t("extraDriver")}
        </label>
      </div>
      <div className="mt-6">
        <PricingBreakdown result={result} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={`/booking?${bookingParams}`}>
          <Button>{t("order")}</Button>
        </Link>
        <Button variant="outline">{t("askAgent")}</Button>
      </div>
    </div>
  );
}
