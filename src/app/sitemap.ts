import type { MetadataRoute } from "next";
import { carsData, destinationsData } from "@/lib/data";
import { getAllSlugs } from "@/lib/blog";

const baseUrl = "https://rentacarbaku66.az";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/cars",
    "/services",
    "/blog",
    "/about",
    "/contact",
    "/booking",
  ];

  const items: MetadataRoute.Sitemap = [];

  staticRoutes.forEach((route) => {
    items.push({
      url: `${baseUrl}${route || "/"}`,
      lastModified: new Date(),
    });
  });

  carsData.forEach((car) => {
    items.push({
      url: `${baseUrl}/cars/${car.slug}`,
      lastModified: new Date(),
    });
  });

  destinationsData.forEach((city) => {
    items.push({
      url: `${baseUrl}/cities/${city.slug}`,
      lastModified: new Date(),
    });
  });

  getAllSlugs().forEach((slug) => {
    items.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
    });
  });

  return items;
}
