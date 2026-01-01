import CorporateContent from "@/components/sections/CorporateContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata();

export default function CorporatePage() {
  return <CorporateContent />;
}
