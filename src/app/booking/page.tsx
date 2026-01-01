import { Suspense } from "react";
import BookingFlow from "@/components/sections/BookingFlow";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata();

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="px-6 py-20 text-center text-sm text-black/60">
          Loading...
        </div>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
