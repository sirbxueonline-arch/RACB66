import { buildMetadata } from "@/lib/seo";
import AboutContent from "@/components/sections/AboutContent";

export const metadata = buildMetadata();

export default function AboutPage() {
  return <AboutContent />;
}
