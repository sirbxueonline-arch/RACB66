import type { Metadata } from "next";

const siteUrl = "https://rentacarbaku66.az";

export const DEFAULT_META_TITLE =
  "Prime Rent A Car Baku | Best Car Rental in Azerbaijan";
export const DEFAULT_META_DESCRIPTION =
  "Premium, affordable and trusted Rent a Car service in Baku, Azerbaijan. 24/7 support, airport delivery, SUVs, economy, business and premium cars. Book now.";
export const DEFAULT_META_KEYWORDS =
  "rent a car baku, rent a car azerbaijan, car rental baku, baku car hire, rent suv baku, premium rent a car baku";

export function buildMetadata({
  title = DEFAULT_META_TITLE,
  description = DEFAULT_META_DESCRIPTION,
  keywords = DEFAULT_META_KEYWORDS,
  image = "/images/og-default.jpg",
}: {
  title?: string;
  description?: string;
  keywords?: string | string[];
  image?: string;
} = {}): Metadata {
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function buildCarListJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Prime Rent A Car",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    sameAs: [
      "https://www.instagram.com/",
      "https://www.facebook.com/",
      "https://wa.me/994000000000",
    ],
  };
}
