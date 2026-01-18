export interface QuickAction {
    id: string;
    label: string;
    sub: string;
    iconName: 'download' | 'mobile' | 'register' | 'topup';
    gradient: string;
    background: string;
    href: string;
}

export interface BannerItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
}

export interface NewsItem {
    id: string;
    category: string;
    title: string;
    date: string;
    isHot?: boolean;
}

export interface ArticleItem extends NewsItem {
    slug?: string;
    showOnHomepage?: boolean;
    cover?: string;
    summary?: string;
    createdAt?: string;
    body?: string;
}

import newsArticles from './newsArticles.json';

export interface ActivityItem {
    id: string;
    title: string;
    subtitle: string;
    status: string;
    statusColor: string;
    imageColor: string;
    dateRange: string;
    image?: string;
    type: 'ongoing' | 'longterm';
    showOnHomepage?: boolean;
}

export interface ServerInfo {
    name: string;
    openTime: string;
    description: string;
    perks: string[];
    bannerImage?: string;
    mainTitle?: string;
    topSubtitle?: string;
    bottomSubtitle?: string;
    detailedPerks?: string[];
}


import newsConfig from './newsConfig.json';
import quickActionsData from './quickActions.json';
import bannersData from './banners.json';
import activitiesData from './activities.json';
import newServerData from './newServer.json';

export const QUICK_ACTIONS: QuickAction[] = quickActionsData as QuickAction[];
export const BANNERS: BannerItem[] = bannersData as BannerItem[];
export const NEWS_TABS = newsConfig.tabs;
export const ARTICLES_DATA: ArticleItem[] = newsArticles;

export function getArticleBySlug(slug: string): ArticleItem | undefined {
    return ARTICLES_DATA.find(article => article.slug === slug);
}

export const NEWS_DATA: NewsItem[] = ARTICLES_DATA
    .filter(article => article.showOnHomepage !== false)
    .map(({ id, category, title, date, isHot }) => ({
        id,
        category,
        title,
        date,
        isHot,
    }));

export const ACTIVITIES_ONGOING: ActivityItem[] = (activitiesData as ActivityItem[]).filter(a => a.type === 'ongoing');
export const ACTIVITIES_LONGTERM: ActivityItem[] = (activitiesData as ActivityItem[]).filter(a => a.type === 'longterm');
export const ACTIVITIES: ActivityItem[] = activitiesData as ActivityItem[];
export const NEW_SERVER: ServerInfo = newServerData as ServerInfo;

