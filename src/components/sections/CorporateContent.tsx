"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import CorporateInquiryForm from "@/components/sections/CorporateInquiryForm";

export default function CorporateContent() {
  const t = useTranslations("corporate");

  const benefits = [
    t("benefits.one"),
    t("benefits.two"),
    t("benefits.three"),
    t("benefits.four"),
  ];

  const packages = [
    {
      title: t("packages.standard.title"),
      text: t("packages.standard.text"),
      range: t("packages.standard.range"),
    },
    {
      title: t("packages.plus.title"),
      text: t("packages.plus.text"),
      range: t("packages.plus.range"),
    },
    {
      title: t("packages.enterprise.title"),
      text: t("packages.enterprise.text"),
      range: t("packages.enterprise.range"),
    },
  ];

  return (
    <section className="py-14">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-5">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-3xl font-semibold text-black">
                {t("title")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm text-black/60">{t("subtitle")}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid gap-3 sm:grid-cols-2">
                {benefits.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <Link href="/cars">
                  <Button variant="outline">{t("ctaFleet")}</Button>
                </Link>
                <Link href="/booking">
                  <Button>{t("ctaBooking")}</Button>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold text-black">
                {t("form.title")}
              </p>
              <p className="mt-2 text-sm text-black/60">{t("form.subtitle")}</p>
              <div className="mt-6">
                <CorporateInquiryForm />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <Reveal>
            <h2 className="text-xl font-semibold text-black">
              {t("packagesTitle")}
            </h2>
            <p className="mt-2 text-sm text-black/60">{t("packagesSubtitle")}</p>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.title} delay={0.05 * index}>
                <div className="h-full rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
                    {pkg.range}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-black">
                    {pkg.title}
                  </p>
                  <p className="mt-2 text-sm text-black/60">{pkg.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
