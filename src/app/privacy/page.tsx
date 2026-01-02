import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy - Prime Rent A Car",
  description:
    "Learn how Prime Rent A Car collects, uses, and protects personal data on rent66.az.",
});

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-black/60">
            Last updated: January 1, 2026
          </p>
          <div className="prose prose-neutral mt-8 max-w-none">
            <p>
              This Privacy Policy explains how Prime Rent A Car collects, uses,
              and protects information when you visit rent66.az or contact us.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                Contact details such as name, email, phone number, and booking
                preferences.
              </li>
              <li>
                Reservation details including dates, pickup and drop-off
                locations, and selected vehicle class.
              </li>
              <li>
                Technical data such as IP address, browser type, device
                information, and site usage analytics.
              </li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>To process bookings, confirmations, and customer support.</li>
              <li>
                To improve site performance, services, and customer experience.
              </li>
              <li>To comply with legal obligations and prevent fraud.</li>
            </ul>

            <h2>Sharing information</h2>
            <p>
              We share data only with service providers who help us operate the
              business (such as payment processing or analytics) and only to the
              extent needed. We do not sell personal data.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              We may use cookies and similar technologies to remember
              preferences and understand site usage. You can manage cookie
              settings in your browser.
            </p>

            <h2>Data retention</h2>
            <p>
              We retain data only as long as necessary for the purposes
              described or as required by law.
            </p>

            <h2>Your choices</h2>
            <p>
              You can request access, correction, or deletion of your personal
              data by contacting us.
            </p>

            <h2>Security</h2>
            <p>
              We use reasonable safeguards to protect personal data. No system
              is 100 percent secure, so please use caution when sharing
              sensitive information.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy questions, email{" "}
              <a href="mailto:info@rent66.az">info@rent66.az</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
