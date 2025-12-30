"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-black">{t("title")}</h1>
        <p className="mt-2 text-sm text-black/60">{t("subtitle")}</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-black"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
