import { buildMetadata } from "@/lib/seo";
import ServicesContent from "@/components/sections/ServicesContent";

export const metadata = buildMetadata({
  title: "Services - Prime Rent A Car",
  description: "Airport transfers, chauffeurs, and curated tour packages.",
});

export default function ServicesPage() {
  return <ServicesContent />;
}
