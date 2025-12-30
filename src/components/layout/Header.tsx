"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import MobileNav from "@/components/layout/MobileNav";

export default function Header() {
  const t = useTranslations("nav");
  const navItems = [
    { href: "/cars", label: t("cars") },
    { href: "/services", label: t("services") },
    { href: "/cities/gabala", label: t("cities") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-black"
        >
          <Image
            src="/images/logo.png"
            alt="Rent A Car Baku 66"
            width={44}
            height={44}
            className="rounded-full border border-black/10 bg-white p-1"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg">Rent A Car</span>
            <span className="text-xs uppercase tracking-[0.3em] text-black/60">
              Baku 66
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-black/70 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-2 py-1 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/booking"
            className="focus-ring inline-flex items-center rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-black shadow-soft transition hover:-translate-y-0.5"
          >
            {t("bookNow")}
          </Link>
        </div>

        <MobileNav
          navItems={navItems}
          ctaLabel={t("bookNow")}
          menuLabel={t("menu")}
          closeLabel={t("close")}
          navigationLabel={t("navigation")}
        />
      </div>
    </header>
  );
}
