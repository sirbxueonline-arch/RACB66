import { buildMetadata } from "@/lib/seo";
import AboutContent from "@/components/sections/AboutContent";

export const metadata = buildMetadata({
  title: "About - Rent A Car Baku 66",
  description: "Company story, values, and premium fleet highlights.",
});

export default function AboutPage() {
  return <AboutContent />;
}
