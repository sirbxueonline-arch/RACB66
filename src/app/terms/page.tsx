import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service - Prime Rent A Car",
  description:
    "Read the Prime Rent A Car terms of service covering bookings, payments, and rental responsibilities.",
});

export default function TermsPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-black/60">
            Last updated: January 1, 2026
          </p>
          <div className="prose prose-neutral mt-8 max-w-none">
            <p>
              These Terms of Service govern your use of rent66.az and any
              bookings or rentals made with Prime Rent A Car. By accessing or
              using the site, you agree to these terms.
            </p>

            <h2>Services</h2>
            <p>
              Prime Rent A Car provides vehicle rental services in Azerbaijan.
              Availability, pricing, and vehicle details are shown on the site
              and may change at any time.
            </p>

            <h2>Eligibility</h2>
            <p>
              You must be legally able to enter a contract, hold a valid driving
              license, and meet minimum age requirements for the vehicle class
              you select.
            </p>

            <h2>Bookings and payments</h2>
            <ul>
              <li>
                Reservations are subject to confirmation and vehicle
                availability.
              </li>
              <li>
                Prices include the items shown at checkout. Additional fees may
                apply for extras or changes to your booking.
              </li>
              <li>
                Payments, deposits, and refunds follow the terms disclosed
                during booking and in your rental agreement.
              </li>
            </ul>

            <h2>Use of vehicles</h2>
            <ul>
              <li>
                Vehicles must be used lawfully and only by authorized drivers
                listed on the rental agreement.
              </li>
              <li>
                You are responsible for traffic violations, fines, tolls, and
                damages during the rental period.
              </li>
              <li>
                Smoking, off-road use, and subleasing are prohibited unless
                explicitly approved.
              </li>
            </ul>

            <h2>Insurance and liability</h2>
            <p>
              Insurance coverage varies by plan and is described during
              checkout. You remain responsible for any uncovered loss, damage,
              or third-party claims.
            </p>

            <h2>Cancellations and changes</h2>
            <p>
              Cancellation and modification terms depend on the booking details
              and will be shared at the time of reservation.
            </p>

            <h2>Site use</h2>
            <p>
              You agree not to misuse the site, attempt unauthorized access, or
              interfere with its security or availability.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may update these terms from time to time. The latest version
              will be posted on this page.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:info@rent66.az">info@rent66.az</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
