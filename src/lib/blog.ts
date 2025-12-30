import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/i18n/routing";

export type BlogFrontmatter = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  categories: string[];
  cover: string;
  locale: Locale;
  readingMinutes: number;
};

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

function getPostFile(slug: string, locale: Locale) {
  return path.join(POSTS_DIR, `${slug}.${locale}.mdx`);
}

function getAllFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));
}

export function getAllSlugs() {
  const files = getAllFiles();
  const slugs = new Set<string>();
  files.forEach((file) => {
    const [slug] = file.split(".");
    slugs.add(slug);
  });
  return Array.from(slugs);
}

export function getPostFrontmatter(locale: Locale) {
  const files = getAllFiles().filter((file) => file.endsWith(`.${locale}.mdx`));
  const posts = files.map((file) => {
    const slug = file.replace(`.${locale}.mdx`, "");
    const source = fs.readFileSync(getPostFile(slug, locale), "utf8");
    const { data, content } = matter(source);
    const stats = readingTime(content);
    return {
      slug,
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      author: data.author as string,
      categories: (data.categories as string[]) ?? [],
      cover: (data.cover as string) ?? "/images/blog/cover-01.jpg",
      locale,
      readingMinutes: Math.max(1, Math.round(stats.minutes)),
    } satisfies BlogFrontmatter;
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPaginatedPosts(
  locale: Locale,
  page: number,
  perPage: number
) {
  const posts = getPostFrontmatter(locale);
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  return {
    posts: posts.slice(start, end),
    totalPages,
    currentPage,
  };
}

export function getPostSource(locale: Locale, slug: string) {
  const filePath = getPostFile(slug, locale);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const stats = readingTime(content);
  return {
    frontmatter: {
      slug,
      title: data.title as string,
      excerpt: data.excerpt as string,
      date: data.date as string,
      author: data.author as string,
      categories: (data.categories as string[]) ?? [],
      cover: (data.cover as string) ?? "/images/blog/cover-01.jpg",
      locale,
      readingMinutes: Math.max(1, Math.round(stats.minutes)),
    } satisfies BlogFrontmatter,
    content,
  };
}
