import type { Locale } from "@/i18n/routing";
import { getPaginatedPosts, getPostFrontmatter } from "@/lib/blog";
import BlogIndex from "@/components/sections/BlogIndex";
import { defaultLocale, locales } from "@/i18n/routing";

const POSTS_PER_PAGE = 6;

export function generateStaticParams() {
  const totalPages = Math.ceil(
    getPostFrontmatter(defaultLocale).length / POSTS_PER_PAGE
  );
  if (totalPages <= 1) return [];
  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: `${index + 2}`,
  }));
}

export default function BlogPaginatedPage({
  params,
}: {
  params: { page: string };
}) {
  const pageNumber = Number(params.page);
  const pagesByLocale = Object.fromEntries(
    locales.map((locale) => [
      locale,
      getPaginatedPosts(locale, pageNumber, POSTS_PER_PAGE),
    ])
  ) as Record<Locale, ReturnType<typeof getPaginatedPosts>>;

  return <BlogIndex pagesByLocale={pagesByLocale} />;
}
