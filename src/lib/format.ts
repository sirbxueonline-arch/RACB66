import type { Locale } from "@/i18n/routing";

const MONTHS_SHORT: Record<Locale, string[]> = {
  az: [
    "yan",
    "fev",
    "mar",
    "apr",
    "may",
    "iyn",
    "iyl",
    "avq",
    "sen",
    "okt",
    "noy",
    "dek",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  ru: [
    "\u044f\u043d\u0432",
    "\u0444\u0435\u0432",
    "\u043c\u0430\u0440",
    "\u0430\u043f\u0440",
    "\u043c\u0430\u0439",
    "\u0438\u044e\u043d",
    "\u0438\u044e\u043b",
    "\u0430\u0432\u0433",
    "\u0441\u0435\u043d",
    "\u043e\u043a\u0442",
    "\u043d\u043e\u044f",
    "\u0434\u0435\u043a",
  ],
};

function parseDateParts(value: string) {
  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/
  );
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4] ?? 0);
  const minute = Number(match[5] ?? 0);
  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    month < 1 ||
    month > 12
  ) {
    return null;
  }
  return { year, month, day, hour, minute };
}

export function formatCurrency(
  value: number,
  locale: Locale,
  currency: string = "AZN"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(value: string, locale: Locale) {
  const parts = parseDateParts(value);
  if (!parts) return value;
  const month = MONTHS_SHORT[locale]?.[parts.month - 1] ?? MONTHS_SHORT.az[parts.month - 1];
  return `${parts.day} ${month} ${parts.year}`;
}

export function formatDateTime(value: string, locale: Locale) {
  const parts = parseDateParts(value);
  if (!parts) return value;
  const month = MONTHS_SHORT[locale]?.[parts.month - 1] ?? MONTHS_SHORT.az[parts.month - 1];
  const hour = String(parts.hour).padStart(2, "0");
  const minute = String(parts.minute).padStart(2, "0");
  return `${parts.day} ${month} ${parts.year}, ${hour}:${minute}`;
}
