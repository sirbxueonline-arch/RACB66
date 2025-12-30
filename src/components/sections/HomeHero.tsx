"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/sections/SearchBar";
import Reveal from "@/components/ui/Reveal";

export default function HomeHero() {
  const t = useTranslations("home.hero");

  return (
    <section className="hero-glow noise-bg text-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-14 md:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Reveal>
              <Badge className="bg-white/10 text-white">{t("badge")}</Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-4xl leading-tight md:text-5xl">
                {t("title")}{" "}
                <span className="text-brand-yellow">{t("titleAccent")}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base text-white/70 md:text-lg">
                {t("subtitle")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/cars">
                  <Button variant="primary">{t("ctaPrimary")}</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/30 text-white">
                    {t("ctaSecondary")}
                  </Button>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.25em] text-white/60">
                <span>{t("trust1")}</span>
                <span>{t("trust2")}</span>
                <span>{t("trust3")}</span>
              </div>
            </Reveal>
          </div>
          <div className="relative">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4">
                <Image
                  src="/images/hero-baku.jpg"
                  alt={t("imageAltCity")}
                  width={640}
                  height={480}
                  className="h-full w-full rounded-2xl object-cover"
                  priority
                />
                <div className="absolute -bottom-10 -left-10 hidden h-36 w-36 rounded-full bg-brand-yellow/30 blur-3xl md:block" />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="absolute -bottom-8 -right-4 hidden w-56 rounded-3xl border border-white/10 bg-black/70 p-4 md:block">
                <Image
                  src="/images/hero-car.jpg"
                  alt={t("imageAltCar")}
                  width={320}
                  height={200}
                  className="rounded-2xl object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.25} className="mt-12">
          <SearchBar />
        </Reveal>
      </div>
    </section>
  );
}
