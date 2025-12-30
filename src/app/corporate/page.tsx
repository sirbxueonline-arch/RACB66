import CorporateContent from "@/components/sections/CorporateContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Corporate rentals - Rent A Car Baku 66",
  description: "Corporate and long-term rental solutions with tailored support.",
});

export default function CorporatePage() {
  return <CorporateContent />;
}
