import { buildMetadata } from "@/lib/seo";
import ServicesContent from "@/components/sections/ServicesContent";

export const metadata = buildMetadata();

export default function ServicesPage() {
  return <ServicesContent />;
}
