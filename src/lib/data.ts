import cars from "@/data/cars.json";
import promos from "@/data/promos.json";
import faqs from "@/data/faqs.json";
import destinations from "@/data/destinations.json";
import reviews from "@/data/reviews.json";
import services from "@/data/services.json";
import deliveryFees from "@/data/delivery-fees.json";
import type { Locale } from "@/i18n/routing";

export type LocalizedString = {
  az: string;
  en: string;
  ru: string;
};

export type Car = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  dailyPrice: number;
  rating: number;
  seats: number;
  luggage: number;
  transmission: "automatic" | "manual";
  fuelType: "petrol" | "diesel" | "hybrid" | "electric";
  year: number;
  engine: string;
  fuelEconomy: string;
  availability: "available" | "limited" | "unavailable";
  images: string[];
  description: LocalizedString;
  highlights: LocalizedString[];
};

export type Promo = {
  id: string;
  code: string;
  title: LocalizedString;
  description: LocalizedString;
  badge: LocalizedString;
};

export type Faq = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
};

export type Destination = {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  highlight: LocalizedString;
  attractions?: LocalizedString[];
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  carSlug?: string;
  date: string;
  text: LocalizedString;
};

export type Service = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  priceRange: LocalizedString;
  icon: string;
};

export type DeliveryFee = {
  id: string;
  location: LocalizedString;
  fee: number;
};

export const carsData = cars as Car[];
export const promosData = promos as Promo[];
export const faqsData = faqs as Faq[];
export const destinationsData = destinations as Destination[];
export const reviewsData = reviews as Review[];
export const servicesData = services as Service[];
export const deliveryFeesData = deliveryFees as DeliveryFee[];

export function getLocalizedText(value: LocalizedString, locale: Locale) {
  return value[locale] || value.az;
}

export function mapLocationToLocale(value: string, locale: Locale) {
  const match = deliveryFeesData.find(
    (fee) =>
      fee.location.az === value ||
      fee.location.en === value ||
      fee.location.ru === value
  );
  return match ? getLocalizedText(match.location, locale) : value;
}
