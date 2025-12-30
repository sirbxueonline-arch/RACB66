import { buildMetadata } from "@/lib/seo";
import ServicesContent from "@/components/sections/ServicesContent";

export const metadata = buildMetadata({
  title: "Services - Rent A Car Baku 66",
  description: "Airport transfers, chauffeurs, and curated tour packages.",
});

export default function ServicesPage() {
  return <ServicesContent />;
}
