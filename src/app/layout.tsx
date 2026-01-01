import type { Metadata } from "next";
import { Inter } from "next/font/google";
import I18nProvider from "@/components/providers/I18nProvider";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Prime Rent A Car",
  description:
    "Prime Rent A Car offers modern rentals in Baku with transparent pricing and professional support.",
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
