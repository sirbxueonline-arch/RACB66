"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FloatingContacts() {
  const t = useTranslations("contact");
  const actions = [
    {
      href: "https://t.me/rentacarbaku66az",
      label: t("telegram"),
      icon: "/icons/telegram.jpg",
    },
    {
      href:
        "https://api.whatsapp.com/send/?phone=%2B994997900066&text&type=phone_number&app_absent=0",
      label: t("whatsapp"),
      icon: "/icons/whatsapp.jpg",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {actions.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className="focus-ring flex h-12 w-12 items-center justify-center rounded-full bg-black text-brand-yellow shadow-soft transition hover:-translate-y-0.5"
        >
          <Image
            src={icon}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-contain"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}
