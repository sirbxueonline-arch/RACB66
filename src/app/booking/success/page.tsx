import BookingSuccess from "@/components/sections/BookingSuccess";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Booking confirmed - Rent A Car Baku 66",
  description: "Your booking request is confirmed.",
});

export default function BookingSuccessPage() {
  return <BookingSuccess />;
}
