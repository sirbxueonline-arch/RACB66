"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";

export default function ThanksPage() {
  const t = useTranslations("thanks");

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-black">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm text-black/70">{t("subtitle")}</p>
        <div className="mt-6 flex justify-center">
          <Link href="/">
            <Button>{t("backHome")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
