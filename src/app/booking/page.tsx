import BookingFlow from "@/components/sections/BookingFlow";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Booking - Rent A Car Baku 66",
  description: "Confirm your booking details and pricing.",
});

export default function BookingPage() {
  return <BookingFlow />;
}
