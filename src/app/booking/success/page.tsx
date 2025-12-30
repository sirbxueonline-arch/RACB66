import { Suspense } from "react";
import BookingSuccess from "@/components/sections/BookingSuccess";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Booking confirmed - Rent A Car Baku 66",
  description: "Your booking request is confirmed.",
});

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="px-6 py-20 text-center text-sm text-black/60">
          Loading...
        </div>
      }
    >
      <BookingSuccess />
    </Suspense>
  );
}
