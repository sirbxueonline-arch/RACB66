import { buildMetadata } from "@/lib/seo";
import AboutContent from "@/components/sections/AboutContent";

export const metadata = buildMetadata({
  title: "About - Prime Rent A Car",
  description: "Company story, values, and premium fleet highlights.",
});

export default function AboutPage() {
  return <AboutContent />;
}
