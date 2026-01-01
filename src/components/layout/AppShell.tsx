"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContacts from "@/components/layout/FloatingContacts";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/ui/PageTransition";
import ToastProvider from "@/components/ui/ToastProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations("layout");

  return (
    <ToastProvider>
      <div className="min-h-screen bg-surface text-black" suppressHydrationWarning>
        <a
          href="#content"
          className="focus-ring absolute left-4 top-4 z-[100] -translate-y-20 rounded-full bg-brand-yellow px-4 py-2 text-sm font-semibold text-black transition focus:translate-y-0"
        >
          {t("skip")}
        </a>
        <Header />
        <ScrollProgress />
        <main id="content" className="min-h-[70vh]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingContacts />
      </div>
    </ToastProvider>
  );
}
