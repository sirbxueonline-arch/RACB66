"use client";

import { useLocale, useTranslations } from "next-intl";
import type { PricingResult } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

const promoKeyMap: Record<string, string> = {
  "promo-baku66": "promoBaku66",
  "promo-weekend": "promoWeekend",
  "promo-longstay": "promoLongstay",
  "promo-airport": "promoAirport",
  "promo-vip": "promoVip",
};

export default function PricingBreakdown({
  result,
  collapsible = false,
  className,
}: {
  result: PricingResult;
  collapsible?: boolean;
  className?: string;
}) {
  const t = useTranslations("pricing");
  const locale = useLocale();

  const content = (
    <div className="space-y-2 text-sm text-black/70">
      {result.lines.map((line) => {
        let label = line.label;
        if (line.id === "base") {
          const days = line.meta?.days ?? result.days;
          label = t("base", { days });
        } else if (line.id === "weekend") {
          label = t("weekend");
        } else if (line.id === "delivery") {
          label = t("delivery");

        } else if (line.id === "extras") {
          label = t("extras");
        } else if (line.id.startsWith("promo")) {
          const key = promoKeyMap[line.id];
          label = key ? t(key) : line.label;
        }

        return (
          <div key={line.id} className="flex items-center justify-between gap-4">
            <span>{label}</span>
            <span
              className={cn(
                "font-medium",
                line.type === "discount" ? "text-green-600" : "text-black"
              )}
            >
              {line.type === "discount" ? "-" : ""}
              {formatCurrency(line.amount, locale as never)}
            </span>
          </div>
        );
      })}
      <div className="flex items-center justify-between border-t border-black/10 pt-3 text-base font-semibold text-black">
        <span>{t("total")}</span>
        <span>{formatCurrency(result.total, locale as never)}</span>
      </div>
    </div>
  );

  if (!collapsible) {
    return <div className={className}>{content}</div>;
  }

  return (
    <details className={cn("rounded-2xl border border-black/10 p-4", className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-black">
        {t("viewBreakdown")}
        <span aria-hidden="true" className="text-black/40">
          +
        </span>
      </summary>
      <div className="pt-3">{content}</div>
    </details>
  );
}
