"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">{t("brand")}</p>
          <p className="mt-3 text-sm text-white/70">{t("tagline")}</p>
          <div className="mt-6 space-y-2 text-sm text-white/70">
            <p>{t("phone")}: +994 997 90 00 66</p>
            <p>{t("whatsapp")}: +994 997 90 00 66</p>
            <p>{t("email")}: info@rent66.az</p>
            <p>{t("address")}: {t("addressValue")}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
            {t("company")}
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <Link href="/about" className="block hover:text-white">
              {t("about")}
            </Link>
            <Link href="/services" className="block hover:text-white">
              {t("services")}
            </Link>
            <Link href="/corporate" className="block hover:text-white">
              {t("corporate")}
            </Link>
            <Link href="/blog" className="block hover:text-white">
              {t("blog")}
            </Link>
            <Link href="/contact" className="block hover:text-white">
              {t("contact")}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
            {t("legal")}
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <Link href="/terms" className="block hover:text-white">
              {t("terms")}
            </Link>
            <Link href="/privacy" className="block hover:text-white">
              {t("privacy")}
            </Link>
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-white/70">
            {t("social")}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/rentacarbaku66/"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              <Image
                src="/icons/facebook.jpg"
                alt=""
                width={16}
                height={16}
                className="rounded-full"
              />
              {t("facebook")}
            </a>
            <a
              href="https://www.instagram.com/rentacarbaku66.az/"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              <Image
                src="/icons/instagram.jpg"
                alt=""
                width={16}
                height={16}
                className="rounded-full"
              />
              {t("instagram")}
            </a>
            <a
              href="https://t.me/rentacarbaku66az"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              <Image
                src="/icons/telegram.jpg"
                alt=""
                width={16}
                height={16}
                className="rounded-full"
              />
              {t("telegram")}
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B994997900066&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              <Image
                src="/icons/whatsapp.jpg"
                alt=""
                width={16}
                height={16}
                className="rounded-full"
              />
              {t("whatsapp")}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        {t("copyright")}
      </div>
    </footer>
  );
}
