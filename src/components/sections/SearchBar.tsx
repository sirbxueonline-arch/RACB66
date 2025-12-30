"use client";

import { useEffect, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { deliveryFeesData, getLocalizedText, mapLocationToLocale } from "@/lib/data";

const categories = [
  "economy",
  "business",
  "premium",
  "suv",
  "minivan",
  "transport",
  "transfer",
];

export default function SearchBar({ className }: { className?: string }) {
  const t = useTranslations("home.search");
  const tCategories = useTranslations("categories");
  const router = useRouter();
  const locale = useLocale();
  const id = useId();
  const pickupPlaceholder = t("pickupPlaceholder");
  const dropoffPlaceholder = t("dropoffPlaceholder");
  const defaultLocation =
    deliveryFeesData[0] && getLocalizedText(deliveryFeesData[0].location, locale as never);
  const [pickupLocation, setPickupLocation] = useState(
    defaultLocation || pickupPlaceholder
  );
  const [dropoffLocation, setDropoffLocation] = useState(
    defaultLocation || dropoffPlaceholder
  );
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [category, setCategory] = useState("economy");

  useEffect(() => {
    setPickupLocation((prev) => mapLocationToLocale(prev, locale as never));
    setDropoffLocation((prev) => mapLocationToLocale(prev, locale as never));
  }, [locale]);

  useEffect(() => {
    if (pickupDate && dropoffDate) return;
    const pickup = new Date();
    pickup.setHours(pickup.getHours() + 1);
    const dropoff = new Date(pickup);
    dropoff.setDate(dropoff.getDate() + 3);
    setPickupDate((prev) => prev || pickup.toISOString().slice(0, 16));
    setDropoffDate((prev) => prev || dropoff.toISOString().slice(0, 16));
  }, [pickupDate, dropoffDate]);

  return (
    <form
      method="get"
      action="/booking"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams({
          pickupLocation,
          dropoffLocation,
          pickupDate,
          dropoffDate,
          category,
        });
        router.push(`/booking?${params.toString()}`);
      }}
      className={cn(
        "glass-panel grid gap-4 rounded-3xl p-6 md:grid-cols-2 xl:grid-cols-6",
        className
      )}
    >
      <div className="space-y-2 xl:col-span-1">
        <label htmlFor={`${id}-pickup`} className="text-xs font-semibold">
          {t("pickup")}
        </label>
        <Input
          id={`${id}-pickup`}
          name="pickupLocation"
          value={pickupLocation}
          onChange={(event) => setPickupLocation(event.target.value)}
          placeholder={pickupPlaceholder}
          aria-label={t("pickup")}
        />
      </div>
      <div className="space-y-2 xl:col-span-1">
        <label htmlFor={`${id}-dropoff`} className="text-xs font-semibold">
          {t("dropoff")}
        </label>
        <Input
          id={`${id}-dropoff`}
          name="dropoffLocation"
          value={dropoffLocation}
          onChange={(event) => setDropoffLocation(event.target.value)}
          placeholder={dropoffPlaceholder}
          aria-label={t("dropoff")}
        />
      </div>
      <div className="space-y-2 xl:col-span-1">
        <label htmlFor={`${id}-pickup-date`} className="text-xs font-semibold">
          {t("pickupDate")}
        </label>
        <Input
          id={`${id}-pickup-date`}
          type="datetime-local"
          name="pickupDate"
          value={pickupDate}
          onChange={(event) => setPickupDate(event.target.value)}
          aria-label={t("pickupDate")}
        />
      </div>
      <div className="space-y-2 xl:col-span-1">
        <label htmlFor={`${id}-dropoff-date`} className="text-xs font-semibold">
          {t("dropoffDate")}
        </label>
        <Input
          id={`${id}-dropoff-date`}
          type="datetime-local"
          name="dropoffDate"
          value={dropoffDate}
          onChange={(event) => setDropoffDate(event.target.value)}
          aria-label={t("dropoffDate")}
        />
      </div>
      <div className="space-y-2 xl:col-span-1">
        <label htmlFor={`${id}-category`} className="text-xs font-semibold">
          {t("category")}
        </label>
        <Select
          id={`${id}-category`}
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {tCategories(cat)}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex items-end xl:col-span-1">
        <Button type="submit" className="w-full">
          {t("submit")}
        </Button>
      </div>
    </form>
  );
}
