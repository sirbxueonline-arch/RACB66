"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { BlogFrontmatter } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import { defaultLocale } from "@/i18n/routing";
import Reveal from "@/components/ui/Reveal";

type PaginatedPosts = {
  posts: BlogFrontmatter[];
  currentPage: number;
  totalPages: number;
};

export default function BlogIndex({
  pagesByLocale,
}: {
  pagesByLocale: Record<Locale, PaginatedPosts>;
}) {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;
  const page = pagesByLocale[locale] ?? pagesByLocale[defaultLocale];

  if (!page) {
    return null;
  }

  const { posts, currentPage, totalPages } = page;

  return (
    <section className="py-14">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-black">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-black/60">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-soft"
              >
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={420}
                  height={280}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                    {post.categories[0] ?? t("categoryFallback")}
                  </p>
                  <h2 className="mt-3 text-lg font-semibold text-black">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-black/70">
                    {post.excerpt}
                  </p>
                  <p className="mt-auto pt-4 text-xs font-medium text-black/50">
                    {t("readTime", { minutes: post.readingMinutes })}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between text-sm text-black/60">
          <p>
            {t("page")} {currentPage} / {totalPages}
          </p>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Link
                key={index}
                href={index === 0 ? "/blog" : `/blog/page/${index + 1}`}
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  currentPage === index + 1
                    ? "bg-brand-yellow text-black"
                    : "border border-black/10 text-black/60"
                }`}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
