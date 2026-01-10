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

export async function generateMetadata() {
  return buildMetadata();
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = carsData.find((item) => item.slug === slug);
  
  if (!car) {
    notFound();
  }

  // Find other variants of the same car (same name)
  const variants = carsData.filter((item) => item.name === car.name);

  // Still show related cars from same category (excluding current and variants)
  const related = carsData
    .filter((item) => item.category === car.category && item.name !== car.name)
    .slice(0, 3);
    
  const carReviews = reviewsData.filter((review) => review.carSlug === car.slug);
  const reviews = carReviews.length ? carReviews : reviewsData.slice(0, 3);

  return <CarDetailContent car={car} variants={variants} related={related} reviews={reviews} />;
}
