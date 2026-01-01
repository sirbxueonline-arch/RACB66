"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { formatDateTime } from "@/lib/format";
import { mapLocationToLocale } from "@/lib/data";
import Button from "@/components/ui/Button";

type Confirmation = {
  reference: string;
  carName: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  total: number;
};

export default function BookingSuccess() {
  const t = useTranslations("bookingSuccess");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [data, setData] = useState<Confirmation | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("prime-rent-booking-confirmation");
    setData(stored ? JSON.parse(stored) : null);
  }, []);

  const ref = searchParams.get("ref") ?? data?.reference ?? "RC66-0000";

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-black/60">{t("subtitle")}</p>

          <div className="mt-6 rounded-2xl border border-black/10 bg-surface p-4">
            <p className="text-sm font-semibold text-black">
              {t("reference")} {ref}
            </p>
            {data && (
              <div className="mt-3 space-y-1 text-sm text-black/70">
                <p>{t("car", { car: data.carName })}</p>
                <p>
                  {t("locations", {
                    pickup: mapLocationToLocale(data.pickupLocation, locale as never),
                    dropoff: mapLocationToLocale(data.dropoffLocation, locale as never),
                  })}
                </p>
                <p>
                  {t("dates", {
                    start: formatDateTime(data.pickupDate, locale as never),
                    end: formatDateTime(data.dropoffDate, locale as never),
                  })}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cars">
              <Button>{t("browse")}</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">{t("contact")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
