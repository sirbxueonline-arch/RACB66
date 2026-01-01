import { notFound } from "next/navigation";
import { destinationsData, carsData } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import CityContent from "@/components/sections/CityContent";

export function generateStaticParams() {
  return destinationsData.map((city) => ({ slug: city.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata() {
  return buildMetadata();
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
