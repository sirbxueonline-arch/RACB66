import { notFound } from "next/navigation";
import { carsData, reviewsData } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import CarDetailContent from "@/components/sections/CarDetailContent";

export function generateStaticParams() {
  return carsData.map((car) => ({ slug: car.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const car = carsData.find((item) => item.slug === slug);
  return buildMetadata({
    title: car ? `${car.name} - Car details` : "Car details",
    description: car ? car.name : "Vehicle specifications and pricing.",
  });
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = carsData.find((item) => item.slug === slug);
  if (!car) {
    notFound();
  }
  const related = carsData
    .filter((item) => item.category === car.category && item.slug !== car.slug)
    .slice(0, 3);
  const carReviews = reviewsData.filter((review) => review.carSlug === car.slug);

  const reviews = carReviews.length ? carReviews : reviewsData.slice(0, 3);

  return <CarDetailContent car={car} related={related} reviews={reviews} />;
}
