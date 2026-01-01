import CompareFleet from "@/components/sections/CompareFleet";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compare fleet - Prime Rent A Car",
  description: "Compare cars side-by-side to find the right match.",
});

export default function ComparePage() {
  return <CompareFleet />;
}
