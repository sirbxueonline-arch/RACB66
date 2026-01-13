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
    { href: "/corporate", label: t("corporate") },
    { href: "/cities/gabala", label: t("cities") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="text-black">
          <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            Prime<span className="text-brand-yellow">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 text-xs font-medium text-black/70 lg:flex lg:flex-nowrap xl:gap-4 xl:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring whitespace-nowrap rounded-full px-2 py-1 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex lg:flex-nowrap">
          <div className="shrink-0">
            <LanguageSwitcher />
          </div>
          <Link
            href="/booking"
            className="focus-ring inline-flex items-center whitespace-nowrap rounded-full bg-brand-yellow px-5 py-2 text-sm font-semibold text-black shadow-soft transition hover:-translate-y-0.5"
          >
            {t("bookNow")}
          </Link>
        </div>

        <div className="flex flex-nowrap items-center gap-2 lg:hidden">
          <a
            href="https://api.whatsapp.com/send/?phone=%2B994997900066&text&type=phone_number&app_absent=0"
            className="focus-ring flex items-center gap-1.5 rounded-full bg-black/5 px-2 py-1.5 transition hover:bg-black/10 sm:px-3"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/icons/whatsapp.jpg"
              alt="WhatsApp"
              width={20}
              height={20}
              className="h-5 w-5 rounded-full object-contain"
            />
            <span className="text-[10px] font-semibold text-black">
              +994 99 790 00 66
            </span>
          </a>
          <LanguageSwitcher />
          <MobileNav
            navItems={navItems}
            ctaLabel={t("bookNow")}
            menuLabel={t("menu")}
            closeLabel={t("close")}
            navigationLabel={t("navigation")}
          />
        </div>
      </div>
    </header>
  );
}
