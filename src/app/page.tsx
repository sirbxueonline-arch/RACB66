import HomeHero from "@/components/sections/HomeHero";
import Promotions from "@/components/sections/Promotions";
import Destinations from "@/components/sections/Destinations";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import LatestBlog from "@/components/sections/LatestBlog";
import WhyChoose from "@/components/sections/WhyChoose";
import { buildMetadata, buildOrganizationJsonLd } from "@/lib/seo";
import type { BlogFrontmatter } from "@/lib/blog";
import { getPostFrontmatter } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";

export const metadata = buildMetadata({
  title: "Rent A Car Baku 66 - Premium car rental",
  description: "Premium car rental in Baku with transparent pricing and curated fleet.",
});

export default function HomePage() {
  const orgJsonLd = buildOrganizationJsonLd();
  const latestPostsByLocale = Object.fromEntries(
    locales.map((locale) => [locale, getPostFrontmatter(locale)])
  ) as Record<Locale, BlogFrontmatter[]>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HomeHero />
      <Promotions />
      <WhyChoose />
      <Destinations />
      <Testimonials />
      <FAQ />
      <LatestBlog postsByLocale={latestPostsByLocale} />
    </>
  );
}
