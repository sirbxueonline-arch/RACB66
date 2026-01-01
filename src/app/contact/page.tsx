import { buildMetadata } from "@/lib/seo";
import ContactContent from "@/components/sections/ContactContent";

export const metadata = buildMetadata({
  title: "Contact - Prime Rent A Car",
  description: "Phone, email, and contact form for premium rental service.",
});

export default function ContactPage() {
  return <ContactContent />;
}

