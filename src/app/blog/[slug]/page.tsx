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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostSource(defaultLocale, slug);
  if (!post) {
    return buildMetadata();
  }
  return buildMetadata({
    image: post.frontmatter.cover,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  type PostPayload = {
    frontmatter: BlogFrontmatter;
    source: MDXRemoteSerializeResult;
  };

  const entries = await Promise.all(
    locales.map(async (locale) => {
      const post = getPostSource(locale, slug);
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
