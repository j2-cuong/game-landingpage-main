import type { ArticleItem, NewsItem } from "../types";
import newsArticles from "../newsArticles.json";

// All articles data
export const ARTICLES_DATA: ArticleItem[] = newsArticles as ArticleItem[];

// Get article by slug
export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return ARTICLES_DATA.find((article) => article.slug === slug);
}

// Get all articles for homepage
export function getHomepageArticles(): ArticleItem[] {
  return ARTICLES_DATA.filter((article) => article.showOnHomepage !== false);
}

// Get news data (simplified for lists)
export function getNewsData(): NewsItem[] {
  return ARTICLES_DATA.filter((article) => article.showOnHomepage !== false).map(
    ({ id, category, title, date, isHot, isNew, author }) => ({
      id,
      category,
      title,
      date,
      isHot,
      isNew,
      author,
    })
  );
}

// Get articles by category
export function getArticlesByCategory(category: string): ArticleItem[] {
  return ARTICLES_DATA.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}

// Get article slugs for static generation
export function getAllArticleSlugs(): string[] {
  return ARTICLES_DATA.filter((article) => article.slug).map((article) => article.slug!);
}
