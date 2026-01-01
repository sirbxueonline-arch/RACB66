import CarsListing from "@/components/sections/CarsListing";
import { buildMetadata, buildCarListJsonLd } from "@/lib/seo";
import { carsData } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Car fleet - Prime Rent A Car",
  description: "Explore economy, business, SUV, and premium car options.",
});

export default function CarsPage() {
  const items = carsData.map((car) => ({
    name: car.name,
    url: `/cars/${car.slug}`,
  }));
  const jsonLd = buildCarListJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarsListing />
    </>
  );
}
