"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function WhyChoose() {
  const t = useTranslations("home.whyChoose");

  const steps = [
    {
      title: t("steps.one.title"),
      text: t("steps.one.text"),
    },
    {
      title: t("steps.two.title"),
      text: t("steps.two.text"),
    },
    {
      title: t("steps.three.title"),
      text: t("steps.three.text"),
    },
    {
      title: t("steps.four.title"),
      text: t("steps.four.text"),
    },
  ];

  const guarantees = [
    {
      title: t("guarantees.one.title"),
      text: t("guarantees.one.text"),
    },
    {
      title: t("guarantees.two.title"),
      text: t("guarantees.two.text"),
    },
    {
      title: t("guarantees.three.title"),
      text: t("guarantees.three.text"),
    },
  ];

  return (
    <section className="bg-[#fbf8f1] py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-semibold text-black">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm text-black/60">{t("subtitle")}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href="/booking">
                <Button>{t("cta")}</Button>
              </Link>
            </Reveal>
          </div>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={0.05 * index}>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-sm font-semibold text-black">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-black/60">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {guarantees.map((item, index) => (
            <Reveal key={item.title} delay={0.05 * index}>
              <div className="h-full rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-black">{item.title}</p>
                <p className="mt-2 text-sm text-black/60">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
