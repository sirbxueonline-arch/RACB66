"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { BlogFrontmatter } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import { defaultLocale } from "@/i18n/routing";
import Reveal from "@/components/ui/Reveal";

export default function LatestBlog({
  postsByLocale,
}: {
  postsByLocale: Record<Locale, BlogFrontmatter[]>;
}) {
  const t = useTranslations("home.blog");
  const locale = useLocale() as Locale;
  const posts = (postsByLocale[locale] ?? postsByLocale[defaultLocale] ?? []).slice(0, 3);

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-black">
                {t("title")}
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-black/60 hover:text-black"
            >
              {t("cta")}
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-3xl border border-black/10 bg-white shadow-soft"
              >
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={420}
                  height={280}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
                    {post.categories[0] ?? t("news")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-black">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-black/70">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs font-medium text-black/50">
                    {t("readTime", { minutes: post.readingMinutes })}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
