import type { Metadata } from "next";
import { Inter } from "next/font/google";
import I18nProvider from "@/components/providers/I18nProvider";
import AppShell from "@/components/layout/AppShell";
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_KEYWORDS,
  DEFAULT_META_TITLE,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const metadata: Metadata = {
  title: DEFAULT_META_TITLE,
  description: DEFAULT_META_DESCRIPTION,
  keywords: DEFAULT_META_KEYWORDS,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <I18nProvider>
          <AppShell>{children}</AppShell>
        </I18nProvider>
      </body>
    </html>
  );
}
