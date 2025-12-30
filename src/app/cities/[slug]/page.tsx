import { notFound } from "next/navigation";
import { destinationsData, getLocalizedText, carsData } from "@/lib/data";
import { defaultLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import CityContent from "@/components/sections/CityContent";

export function generateStaticParams() {
  return destinationsData.map((city) => ({ slug: city.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const city = destinationsData.find((item) => item.slug === slug);
  return buildMetadata({
    title: city
      ? `${getLocalizedText(city.name, defaultLocale)} - City guide`
      : "City guide",
    description: city
      ? getLocalizedText(city.description, defaultLocale)
      : "Routes and recommendations.",
  });
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = destinationsData.find((item) => item.slug === slug);
  if (!city) {
    notFound();
  }
  const recommended = carsData.slice(0, 3);

  return <CityContent city={city} recommended={recommended} />;
}
