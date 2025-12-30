import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { getAllSlugs, getPostSource } from "@/lib/blog";
import type { BlogFrontmatter } from "@/lib/blog";
import type { Locale } from "@/i18n/routing";
import { defaultLocale, locales } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import BlogDetailClient from "@/components/sections/BlogDetailClient";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostSource(defaultLocale, params.slug);
  if (!post) {
    return buildMetadata({
      title: "Blog post - Rent A Car Baku 66",
      description: "Travel stories and rental insights.",
    });
  }
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image: post.frontmatter.cover,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  type PostPayload = {
    frontmatter: BlogFrontmatter;
    source: MDXRemoteSerializeResult;
  };

  const entries = await Promise.all(
    locales.map(async (locale) => {
      const post = getPostSource(locale, params.slug);
      if (!post) {
        return [locale, null] as const;
      }
      const source = await serialize(post.content);
      return [locale, { frontmatter: post.frontmatter, source }] as const;
    })
  );

  const posts = Object.fromEntries(entries) as Record<Locale, PostPayload | null>;

  if (!Object.values(posts).some(Boolean)) {
    notFound();
  }

  return <BlogDetailClient posts={posts} />;
}
