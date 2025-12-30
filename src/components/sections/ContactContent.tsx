"use client";

import { useTranslations } from "next-intl";
import ContactForm from "@/components/sections/ContactForm";
import Reveal from "@/components/ui/Reveal";

export default function ContactContent() {
  const t = useTranslations("contact");

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm text-black/70">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-black">
                {t("details")}
              </h2>
              <div className="mt-4 space-y-3 text-sm text-black/70">
                <p>{t("phone")}: +994 (99) 790 00 66</p>
                <p>{t("phone")}: +994 (70) 510 00 66</p>
                <p>{t("whatsapp")}: +994 (70) 510 00 66</p>
                <p>{t("telegram")}: @rentacarbaku66az</p>
                <p>{t("instagram")}: @rentacarbaku66.az</p>
                <p>{t("facebook")}: rentacarbaku66</p>
                <p>{t("email")}: info@rent66.az</p>
                <p>{t("address")}: {t("addressValue")}</p>
                <p>{t("hours")}: {t("hoursValue")}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B994705100066&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/70"
                >
                  {t("whatsapp")}
                </a>
                <a
                  href="https://t.me/rentacarbaku66az"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/70"
                >
                  {t("telegram")}
                </a>
                <a
                  href="https://www.facebook.com/rentacarbaku66/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/70"
                >
                  {t("facebook")}
                </a>
                <a
                  href="https://www.instagram.com/rentacarbaku66.az/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/70"
                >
                  {t("instagram")}
                </a>
                <a
                  href="mailto:info@rent66.az"
                  className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black/70"
                >
                  {t("email")}
                </a>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
                <iframe
                  title={t("mapTitle")}
                  src="https://maps.google.com/maps?q=Baku&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-56 w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-black">
                {t("formTitle")}
              </h2>
              <p className="mt-2 text-sm text-black/60">{t("formSubtitle")}</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
