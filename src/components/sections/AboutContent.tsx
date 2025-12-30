"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";

export default function AboutContent() {
  const t = useTranslations("about");

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">
            {t("title")}
          </h1>
          <p className="mt-3 text-sm text-black/70">{t("story")}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[t("fleet"), t("support"), t("transparent")].map((item) => (
            <Reveal key={item}>
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
                <p className="text-sm font-semibold text-black">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-black">
                {t("missionTitle")}
              </h2>
              <p className="mt-3 text-sm text-black/70">{t("missionText")}</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-black">
                {t("valuesTitle")}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                <li>{t("value1")}</li>
                <li>{t("value2")}</li>
                <li>{t("value3")}</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
