"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import type { BlogFrontmatter } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import { defaultLocale } from "@/i18n/routing";
import { mdxComponents } from "@/lib/mdx";
import { formatDate } from "@/lib/format";

type PostPayload = {
  frontmatter: BlogFrontmatter;
  source: MDXRemoteSerializeResult;
};

export default function BlogDetailClient({
  posts,
}: {
  posts: Record<Locale, PostPayload | null>;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("blogDetail");
  const [mounted, setMounted] = useState(false);
  const activePost = posts[locale] ?? posts[defaultLocale];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!activePost) {
    return null;
  }

  const { frontmatter, source } = activePost;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    datePublished: frontmatter.date,
    author: { "@type": "Person", name: frontmatter.author },
    image: frontmatter.cover,
    description: frontmatter.excerpt,
  };

  return (
    <section className="py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
          {frontmatter.categories.join(" / ")}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-black">
          {frontmatter.title}
        </h1>
        <p className="mt-3 text-sm text-black/60">
          {t("meta", {
            author: frontmatter.author,
            date: formatDate(frontmatter.date, locale as never),
            minutes: frontmatter.readingMinutes,
          })}
        </p>
        <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-soft">
          <Image
            src={frontmatter.cover}
            alt={frontmatter.title}
            width={960}
            height={560}
            className="h-[360px] w-full object-cover"
            priority
          />
        </div>
        <article className="prose prose-neutral mt-10 max-w-none">
          {mounted ? (
            <MDXRemote {...source} components={mdxComponents} />
          ) : (
            <p className="text-sm text-black/60">{t("loading")}</p>
          )}
        </article>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-black/60">
            {t("share")}
          </span>
          <a
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/70"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              frontmatter.title
            )}`}
          >
            {t("shareTwitter")}
          </a>
          <a
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/70"
            href={`https://www.facebook.com/sharer/sharer.php?u=https://rentacarbaku66.az`}
          >
            {t("shareFacebook")}
          </a>
          <a
            className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black/70"
            href={`mailto:?subject=${encodeURIComponent(frontmatter.title)}`}
          >
            {t("shareEmail")}
          </a>
        </div>
        {process.env.NEXT_PUBLIC_COMMENTS_ENABLED === "true" && (
          <div className="mt-12 rounded-3xl border border-black/10 bg-white p-6 shadow-soft">
            <p className="text-sm text-black/60">{t("comments")}</p>
            <div className="mt-4">
              <div id="comments" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
