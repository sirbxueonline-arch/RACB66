import type { Locale } from "@/i18n/routing";
import { getPaginatedPosts } from "@/lib/blog";
import BlogIndex from "@/components/sections/BlogIndex";
import { buildMetadata } from "@/lib/seo";
import { locales } from "@/i18n/routing";

const POSTS_PER_PAGE = 6;

export const metadata = buildMetadata({
  title: "Blog - Rent A Car Baku 66",
  description: "Travel stories, routes, and rental tips in Baku.",
});

export default function BlogPage() {
  const pagesByLocale = Object.fromEntries(
    locales.map((locale) => [locale, getPaginatedPosts(locale, 1, POSTS_PER_PAGE)])
  ) as Record<Locale, ReturnType<typeof getPaginatedPosts>>;

  return <BlogIndex pagesByLocale={pagesByLocale} />;
}
