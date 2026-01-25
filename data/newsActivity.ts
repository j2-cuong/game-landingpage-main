// Re-export types from centralized location
export type {
  QuickAction,
  BannerItem,
  NewsItem,
  ArticleItem,
  ActivityItem,
  ServerInfo,
} from "./types";

// Re-export article services
export { getArticleBySlug, ARTICLES_DATA, getNewsData, getHomepageArticles } from "./services/articles";

// Import JSON data
import newsConfig from "./newsConfig.json";
import quickActionsData from "./quickActions.json";
import bannersData from "./banners.json";
import activitiesData from "./activities.json";
import newServerData from "./newServer.json";

// Import types for casting
import type { QuickAction, BannerItem, ActivityItem, ServerInfo, NewsItem } from "./types";
import { ARTICLES_DATA } from "./services/articles";

// Exports
export const QUICK_ACTIONS: QuickAction[] = quickActionsData as QuickAction[];
export const BANNERS: BannerItem[] = bannersData as BannerItem[];
export const NEWS_TABS = newsConfig.tabs;

export const NEWS_DATA = ARTICLES_DATA
  .filter((article) => article.showOnHomepage !== false)
  .map(({ id, category, title, date, isHot, isNew, author, slug }) => ({
    id,
    category,
    title,
    date,
    isHot,
    isNew,
    author,
    slug,
  }));

export const ACTIVITIES_ONGOING: ActivityItem[] = (activitiesData as ActivityItem[]).filter(
  (a) => a.type === "ongoing"
);
export const ACTIVITIES_LONGTERM: ActivityItem[] = (activitiesData as ActivityItem[]).filter(
  (a) => a.type === "longterm"
);
export const ACTIVITIES: ActivityItem[] = activitiesData as ActivityItem[];
export const NEW_SERVER: ServerInfo = newServerData as ServerInfo;
