import CompareFleet from "@/components/sections/CompareFleet";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata();

export default function ComparePage() {
  return <CompareFleet />;
}
