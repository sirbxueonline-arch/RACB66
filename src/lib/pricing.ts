import { z } from "zod";
import type { Car } from "@/lib/data";
import { deliveryFeesData } from "@/lib/data";

export const bookingInputSchema = z.object({
  carId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  pickupLocation: z.string(),
  dropoffLocation: z.string(),
  dropoffLocation: z.string(),
  extras: z.object({
    gps: z.boolean(),
    childSeat: z.boolean(),
    additionalDriver: z.boolean(),
  }),
  promoCode: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingInputSchema>;

export type PricingLine = {
  id: string;
  label: string;
  amount: number;
  type: "add" | "discount";
  meta?: Record<string, number | string>;
};

export type PricingResult = {
  days: number;
  lines: PricingLine[];
  subtotal: number;
  total: number;
  weekendDays: number;
};



const extrasRates = {
  gps: 5,
  childSeat: 4,
  additionalDriver: 12,
};

function daysBetween(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  if (Number.isNaN(diff) || diff <= 0) return 1;
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function countWeekendDays(start: string, days: number) {
  const startDate = new Date(start);
  if (Number.isNaN(startDate.getTime())) return 0;
  let weekend = 0;
  for (let i = 0; i < days; i += 1) {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + i);
    const day = current.getDay();
    if (day === 0 || day === 6) weekend += 1;
  }
  return weekend;
}

function getDeliveryFee(location: string) {
  return 0;
}

function applyPromo(
  code: string | undefined,
  car: Car,
  days: number,
  baseTotal: number,
  weekendSurcharge: number,
  deliveryTotal: number
): PricingLine | null {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();
  if (normalized === "BAKU66") {
    return {
      id: "promo-baku66",
      label: "BAKU66 promo",
      amount: Math.round(baseTotal * 0.1),
      type: "discount",
    };
  }
  if (normalized === "WEEKEND66") {
    return {
      id: "promo-weekend",
      label: "Weekend surcharge waived",
      amount: weekendSurcharge,
      type: "discount",
    };
  }
  if (normalized === "LONGSTAY" && days >= 7) {
    return {
      id: "promo-longstay",
      label: "Long stay bonus day",
      amount: car.dailyPrice,
      type: "discount",
    };
  }
  if (normalized === "AIRPORT5") {
    return {
      id: "promo-airport",
      label: "Airport delivery credit",
      amount: Math.min(5, deliveryTotal),
      type: "discount",
    };
  }
  if (normalized === "VIP15" && car.category === "premium") {
    return {
      id: "promo-vip",
      label: "VIP15 premium savings",
      amount: Math.round(baseTotal * 0.15),
      type: "discount",
    };
  }
  return null;
}

export function calculatePricing(car: Car, input: BookingInput): PricingResult {
  const days = daysBetween(input.startDate, input.endDate);
  const baseTotal = car.dailyPrice * days;
  const weekendDays = countWeekendDays(input.startDate, days);
  const weekendSurcharge =
    weekendDays > 0 ? Math.round(baseTotal * 0.12) : 0;
  const pickupFee = getDeliveryFee(input.pickupLocation);
  const dropoffFee = getDeliveryFee(input.dropoffLocation);
  const deliveryTotal = pickupFee + dropoffFee;

  const extrasFee =
    (input.extras.gps ? extrasRates.gps * days : 0) +
    (input.extras.childSeat ? extrasRates.childSeat * days : 0) +
    (input.extras.additionalDriver ? extrasRates.additionalDriver * days : 0);

  const lines: PricingLine[] = [
    {
      id: "base",
      label: `Daily rate x ${days}`,
      amount: baseTotal,
      type: "add",
      meta: { days },
    },
  ];

  if (weekendSurcharge > 0) {
    lines.push({
      id: "weekend",
      label: "Weekend surcharge",
      amount: weekendSurcharge,
      type: "add",
    });
  }

  if (deliveryTotal > 0) {
    lines.push({
      id: "delivery",
      label: "Delivery & return",
      amount: deliveryTotal,
      type: "add",
    });
  }



  if (extrasFee > 0) {
    lines.push({
      id: "extras",
      label: "Optional extras",
      amount: extrasFee,
      type: "add",
    });
  }

  const promoLine = applyPromo(
    input.promoCode,
    car,
    days,
    baseTotal,
    weekendSurcharge,
    deliveryTotal
  );
  if (promoLine) {
    lines.push(promoLine);
  }

  const subtotal = lines
    .filter((line) => line.type === "add")
    .reduce((sum, line) => sum + line.amount, 0);
  const discounts = lines
    .filter((line) => line.type === "discount")
    .reduce((sum, line) => sum + line.amount, 0);
  const total = Math.max(0, subtotal - discounts);

  return {
    days,
    lines,
    subtotal,
    total,
    weekendDays,
  };
}
