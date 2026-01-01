import CorporateContent from "@/components/sections/CorporateContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Corporate rentals - Prime Rent A Car",
  description: "Corporate and long-term rental solutions with tailored support.",
});

export default function CorporatePage() {
  return <CorporateContent />;
}
