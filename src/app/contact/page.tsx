import { buildMetadata } from "@/lib/seo";
import ContactContent from "@/components/sections/ContactContent";

export const metadata = buildMetadata();

export default function ContactPage() {
  return <ContactContent />;
}

